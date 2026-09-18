import React, { useState } from 'react';
import { LanguageCode, QueryResponseData } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { Check, Copy, BookOpen, ShieldCheck, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface AnswerCardProps {
  data: QueryResponseData;
  language: LanguageCode;
  audioBase64?: string;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  data,
  language,
  audioBase64,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert answer lines with simple formatting
  const formatAnswer = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-2" />;

      // Handle bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const isListItem = line.trim().match(/^(\d+\.|\*|-)/);

      return (
        <p key={idx} className={`text-stone-800 leading-relaxed text-sm sm:text-base ${isListItem ? 'pl-2 py-0.5' : 'py-1'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-stone-950">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div id="grounded-answer-card" className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-stone-200 mt-6 transition-all animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Grounded Guidance
            </span>
            <span className="text-sm font-semibold text-stone-700">
              {data.detectedIntent === 'CROP_DAMAGE_INSURANCE'
                ? 'PMFBY & Crop Assistance'
                : data.detectedIntent === 'GRIEVANCE_COMPLAINT'
                ? 'Grievance Redressal Guidance'
                : data.detectedIntent === 'PACS_SERVICES'
                ? 'PACS & Cooperative Services'
                : 'Verified Cooperative Information'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1.5 transition-colors"
            title="Copy answer text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Body */}
      <div className="py-4 space-y-1">
        {formatAnswer(data.answer)}
      </div>

      {/* Integrated Voice Audio Player */}
      <div className="my-4">
        <AudioPlayer
          textToSpeak={data.answer}
          language={language}
          audioBase64={audioBase64}
          autoPlay={true}
        />
      </div>

      {/* Verified Safety Disclaimer */}
      <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/80 flex items-start gap-2.5 mt-4 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-normal">
          <strong>Official Note:</strong> This answer is strictly grounded in verified Ministry of Cooperation and PMFBY operational guidelines. Crop insurance eligibility, cut-off dates, and compensation depend on your specific State/UT seasonal notification and crop cutting records. Please contact your local PACS or bank for local verification.
        </p>
      </div>

      {/* Sources & Citations Toggle */}
      {data.sources && data.sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="flex items-center justify-between w-full text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors py-1"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Sources & Knowledge Chunks ({data.sources.length})</span>
            </span>
            {showSources ? (
              <ChevronUp className="w-4 h-4 text-stone-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {showSources && (
            <div className="mt-2 space-y-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl border border-stone-200">
              {data.sources.map((src, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 pb-1.5 border-b border-stone-200 last:border-0 last:pb-0">
                  <div>
                    <span className="font-semibold text-stone-800 block">{src.title}</span>
                    <span className="text-[11px] text-stone-500">{src.source}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                    {src.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
