import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';

interface AudioPlayerProps {
  textToSpeak: string;
  language: LanguageCode;
  audioBase64?: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  language,
  audioBase64,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize browser speech synthesis if available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Cleanup on unmount or text change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [textToSpeak]);

  // Handle audioBase64 setup if provided
  useEffect(() => {
    if (audioBase64) {
      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      audio.volume = isMuted ? 0 : volume;

      audio.onended = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audioRef.current = audio;

      if (autoPlay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [audioBase64, autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (audioBase64 && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn('Audio playback error:', err);
          fallbackWebSpeech();
        });
      } else {
        fallbackWebSpeech();
      }
    }
  };

  const fallbackWebSpeech = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    // Clean plain text without markdown asterisks
    const cleanText = textToSpeak.replace(/[#*`_\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language
    if (language === 'ta-IN') {
      utterance.lang = 'ta-IN';
    } else if (language === 'hi-IN') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = 0.95; // Slightly slower for clarity in rural listening

    utterance.onstart = () => {
      setIsPlaying(true);
      setProgress(10);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handleReplay = () => {
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      fallbackWebSpeech();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);

    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  return (
    <div id="audio-player-container" className="bg-emerald-950 text-white rounded-2xl p-4 shadow-lg border border-emerald-800 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {audioBase64 ? 'Sarvam AI Voice Response' : 'Cooperative Audio Player'}
            </p>
            <p className="text-[11px] text-emerald-200">
              {language === 'ta-IN' ? 'தமிழ் குரல் வழிகாட்டல்' : language === 'hi-IN' ? 'हिन्दी आवाज उत्तर' : 'Clear Spoken Guidance'}
            </p>
          </div>
        </div>

        {audioBase64 && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Sarvam Bulbul TTS
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-emerald-900 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-amber-400 h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            id="audio-play-pause-btn"
            type="button"
            onClick={togglePlay}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md"
            aria-label={isPlaying ? 'Pause voice answer' : 'Play voice answer'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-emerald-950" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-emerald-950" />
                <span>Play Answer</span>
              </>
            )}
          </button>

          <button
            id="audio-replay-btn"
            type="button"
            onClick={handleReplay}
            className="p-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
            title="Replay from start"
            aria-label="Replay audio from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="text-emerald-300 hover:text-white"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            id="audio-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 accent-amber-400 h-1 bg-emerald-800 rounded cursor-pointer"
            aria-label="Adjust audio volume"
          />
        </div>
      </div>
    </div>
  );
};
