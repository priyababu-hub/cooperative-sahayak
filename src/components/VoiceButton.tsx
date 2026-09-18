import React from 'react';
import { Mic, Square, Loader2, Sparkles, Database } from 'lucide-react';
import { AssistantStep } from '../types';

interface VoiceButtonProps {
  step: AssistantStep;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  step,
  isRecording,
  onStartRecording,
  onStopRecording,
  disabled = false,
}) => {
  let label = "Tap to Speak";
  let sublabel = "Click to speak in your language";
  let buttonBg = "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/30";
  let pulseRing = false;

  if (step === 'recording' || isRecording) {
    label = "Listening...";
    sublabel = "Tap again when finished speaking";
    buttonBg = "bg-red-600 hover:bg-red-700 text-white shadow-red-700/40";
    pulseRing = true;
  } else if (step === 'transcribing') {
    label = "Understanding your question...";
    sublabel = "Sarvam Speech-to-Text processing";
    buttonBg = "bg-amber-600 text-white shadow-amber-600/30";
  } else if (step === 'searching') {
    label = "Finding relevant information...";
    sublabel = "Searching 58 verified RAG chunks";
    buttonBg = "bg-blue-600 text-white shadow-blue-600/30";
  } else if (step === 'answering') {
    label = "Preparing your answer...";
    sublabel = "Grounded cooperative guidance";
    buttonBg = "bg-purple-600 text-white shadow-purple-600/30";
  } else if (step === 'ready') {
    label = "Tap to Ask Another";
    sublabel = "Ready for your next question";
    buttonBg = "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/30";
  }

  const handleClick = () => {
    if (disabled) return;
    if (isRecording || step === 'recording') {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className="relative flex items-center justify-center">
        {/* Animated outer pulsing rings when recording */}
        {pulseRing && (
          <>
            <div className="absolute w-44 h-44 rounded-full bg-red-400/20 animate-ping pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full bg-red-400/30 animate-pulse pointer-events-none" />
          </>
        )}

        {/* Large 110px+ Button */}
        <button
          id="main-voice-mic-button"
          aria-label={label}
          type="button"
          onClick={handleClick}
          disabled={disabled || step === 'transcribing' || step === 'searching' || step === 'answering'}
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 shadow-xl select-none ${buttonBg} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isRecording || step === 'recording' ? (
            <Square className="w-10 h-10 sm:w-12 sm:h-12 fill-white stroke-white animate-pulse" />
          ) : step === 'transcribing' ? (
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-white" />
          ) : step === 'searching' ? (
            <Database className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce text-white" />
          ) : step === 'answering' ? (
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-white" />
          ) : (
            <Mic className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          )}
        </button>
      </div>

      {/* Primary and Secondary State Labels */}
      <div className="mt-4 text-center">
        <p id="voice-button-status-label" className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
          {label}
        </p>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          {sublabel}
        </p>
      </div>
    </div>
  );
};
