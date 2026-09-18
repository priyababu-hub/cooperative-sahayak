import React, { useState, useRef } from 'react';
import { LanguageCode, AssistantStep, QueryResponseData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { VoiceButton } from '../components/VoiceButton';
import { AnswerCard } from '../components/AnswerCard';
import { 
  Send, Sparkles, AlertCircle, CheckCircle2, 
  HelpCircle, RefreshCw, Volume2, Globe, MessageSquare 
} from 'lucide-react';

interface AssistantPageProps {
  currentLanguage: LanguageCode;
  onOpenLanguageModal: () => void;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({
  currentLanguage,
  onOpenLanguageModal,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [step, setStep] = useState<AssistantStep>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResponseData | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Stages checklist tracking
  const [stages, setStages] = useState({
    languageSelected: true,
    voiceCaptured: false,
    sttDone: false,
    ragSearched: false,
    answerGenerated: false,
    audioReady: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start Voice Recording
  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('BROWSER_UNSUPPORTED');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all audio tracks to release microphone icon
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setStep('recording');
      setStages(prev => ({ ...prev, voiceCaptured: true }));
    } catch (err: any) {
      console.warn('Microphone access failed:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage("Please allow microphone access in your browser settings to use voice assistance.");
      } else {
        // Fallback for environments without physical mic: trigger quick demo prompt
        setErrorMessage("Microphone not available on this device. You can click any sample question below or type your question.");
      }
      setIsRecording(false);
      setStep('idle');
    }
  };

  // Stop Voice Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStep('transcribing');
    }
  };

  // Process Recorded Audio via Sarvam STT
  const processAudio = async (audioBlob: Blob) => {
    setStep('transcribing');
    setStages(prev => ({ ...prev, voiceCaptured: true }));

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice_recording.webm');
      formData.append('language', currentLanguage);

      const sttRes = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      const sttData = await sttRes.json();

      if (sttData.success && sttData.transcript) {
        const text = sttData.transcript.trim();
        setTranscript(text);
        setInputText(text);
        setStages(prev => ({ ...prev, sttDone: true }));

        // Proceed to RAG query & Answer generation
        await executeQuery(text);
      } else {
        throw new Error(sttData.error || "No speech detected. Please try speaking again.");
      }
    } catch (err: any) {
      console.error('Audio processing error:', err);
      setErrorMessage(err.message || "We couldn't hear your question clearly. Please try again.");
      setStep('error');
    }
  };

  // Execute RAG Query & LLM Generation
  const executeQuery = async (queryText: string) => {
    if (!queryText || queryText.trim().length === 0) return;

    setStep('searching');
    setErrorMessage(null);
    setQueryResult(null);
    setAudioBase64(undefined);

    try {
      // 1. RAG Search and LLM Grounding
      setStages(prev => ({ ...prev, ragSearched: true }));
      setStep('answering');

      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText.trim(),
          language: currentLanguage,
        }),
      });

      const data: QueryResponseData = await response.json();

      if (!data.success) {
        throw new Error(data.error || "We couldn't find relevant information. Please try another question.");
      }

      setQueryResult(data);
      setStages(prev => ({ ...prev, answerGenerated: true }));

      // 2. Synthesize Speech via Sarvam TTS
      try {
        const ttsRes = await fetch('/api/text-to-speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: data.answer,
            language: currentLanguage,
          }),
        });

        const ttsData = await ttsRes.json();
        if (ttsData.success && ttsData.audioBase64) {
          setAudioBase64(ttsData.audioBase64);
        }
        setStages(prev => ({ ...prev, audioReady: true }));
      } catch (ttsErr) {
        console.warn('TTS fetch failed, falling back to browser speech synthesis:', ttsErr);
        setStages(prev => ({ ...prev, audioReady: true }));
      }

      setStep('ready');
    } catch (err: any) {
      console.error('Query execution error:', err);
      setErrorMessage(err.message || "We couldn't process your question right now. Please try again.");
      setStep('error');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setTranscript(inputText.trim());
    setStages({
      languageSelected: true,
      voiceCaptured: true,
      sttDone: true,
      ragSearched: false,
      answerGenerated: false,
      audioReady: false,
    });
    executeQuery(inputText.trim());
  };

  const handleDemoClick = (q: string) => {
    setInputText(q);
    setTranscript(q);
    setStages({
      languageSelected: true,
      voiceCaptured: true,
      sttDone: true,
      ragSearched: false,
      answerGenerated: false,
      audioReady: false,
    });
    executeQuery(q);
  };

  const handleReset = () => {
    setStep('idle');
    setTranscript('');
    setInputText('');
    setQueryResult(null);
    setAudioBase64(undefined);
    setErrorMessage(null);
    setStages({
      languageSelected: true,
      voiceCaptured: false,
      sttDone: false,
      ragSearched: false,
      answerGenerated: false,
      audioReady: false,
    });
  };

  return (
    <div id="assistant-page" className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200 text-center relative overflow-hidden">
          {/* Language indicator pill */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-semibold border border-emerald-200 mb-3">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {currentLanguage === 'ta-IN' ? 'தமிழ் (Tamil)' : currentLanguage === 'hi-IN' ? 'हिन्दी (Hindi)' : 'English (Indian)'}
            </span>
            <button
              onClick={onOpenLanguageModal}
              className="text-amber-700 hover:text-amber-900 font-bold underline ml-1"
            >
              Change
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {t.askQuestionPrompt}
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-lg mx-auto leading-relaxed">
            Speak about PMFBY crop loss, heavy rain assistance, PACS membership, seed subsidies, or cooperative disputes.
          </p>

          {/* Central Large 110px+ Microphone Button */}
          <VoiceButton
            step={step}
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />

          {/* Error notification banner */}
          {errorMessage && (
            <div className="mt-4 p-3.5 bg-red-50 text-red-900 rounded-2xl border border-red-200 text-xs flex items-center justify-center gap-2 max-w-md mx-auto animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Real-time Progress Stages (Section 15) */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] text-stone-500">
            <span className={`flex items-center gap-1 font-medium ${stages.languageSelected ? 'text-emerald-700' : 'text-stone-400'}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Language selected</span>
            </span>
            <span className="text-stone-300">•</span>

            <span className={`flex items-center gap-1 font-medium ${stages.voiceCaptured ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${stages.voiceCaptured ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Voice captured</span>
            </span>
            <span className="text-stone-300">•</span>

            <span className={`flex items-center gap-1 font-medium ${stages.sttDone ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${stages.sttDone ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Sarvam STT</span>
            </span>
            <span className="text-stone-300">•</span>

            <span className={`flex items-center gap-1 font-medium ${stages.ragSearched ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${stages.ragSearched ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>ChromaDB RAG</span>
            </span>
            <span className="text-stone-300">•</span>

            <span className={`flex items-center gap-1 font-medium ${stages.answerGenerated ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${stages.answerGenerated ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Grounded Answer</span>
            </span>
            <span className="text-stone-300">•</span>

            <span className={`flex items-center gap-1 font-medium ${stages.audioReady ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${stages.audioReady ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Audio Ready</span>
            </span>
          </div>
        </div>

        {/* Quick Demo Questions Bar (Section 29 Demo Scenarios) */}
        <div className="mt-5 bg-stone-100/80 rounded-2xl p-4 border border-stone-200">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {t.quickQuestionsTitle}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">Click to test instantly</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {t.quickDemoQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDemoClick(q)}
                className="bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-xl px-3 py-2 text-xs font-medium text-left transition-all shadow-sm active:scale-98"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Box (Section 16) */}
        {transcript && (
          <div id="transcript-display-box" className="mt-6 bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-200 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.youSaid}
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1"
                title="Clear and ask new question"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-semibold text-stone-900 leading-relaxed">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Generated Grounded Answer Card */}
        {queryResult && (
          <AnswerCard
            data={queryResult}
            language={currentLanguage}
            audioBase64={audioBase64}
          />
        )}

        {/* Optional Text Fallback Input (Section 16) */}
        <div className="mt-8 bg-white rounded-3xl p-4 sm:p-5 shadow-md border border-stone-200">
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <input
              id="assistant-text-fallback-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeYourQuestionPlaceholder}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            <button
              id="assistant-text-submit-btn"
              type="submit"
              disabled={!inputText.trim() || step === 'transcribing' || step === 'searching' || step === 'answering'}
              className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendQuestion}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
