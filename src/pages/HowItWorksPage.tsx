import React from 'react';
import { LanguageCode } from '../types';
import { Mic, Cpu, Database, Volume2, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

interface HowItWorksPageProps {
  currentLanguage: LanguageCode;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ currentLanguage }) => {
  return (
    <div id="how-it-works-page" className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & RAG Transparency</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            How Cooperative Sahayak Operates
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            A transparent overview of the 4-stage multilingual voice pipeline and zero-hallucination policy.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Step 1</span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                Sarvam AI Speech-to-Text (Saaras v4)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                When a user speaks in Tamil (ta-IN), English (en-IN), or Hindi (hi-IN), audio is captured through the browser Web Audio API and transmitted securely to Sarvam AI's Indian language Speech-to-Text model. The model accommodates regional dialects and rural terminology with high accuracy.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Step 2</span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                Cooperative RAG Retriever & Intent Reranker
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                The transcribed text is analyzed for intent. Queries mentioning crop damage, heavy rain, or inundation automatically prioritize PMFBY localized calamity guidelines (chunks 1–5), while demoting unrelated schemes like life insurance (PMJJBY) or general grievance protocols unless explicitly requested.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Step 3</span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                Google Gemini Grounded LLM Generation
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                The top ranked verified chunks are passed to Google Gemini (gemini-3.8-flash) along with strict guardrails. The model is forbidden from inventing schemes, deadlines, or benefits. It generates a clear, actionable response in the user's selected language.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Step 4</span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                Sarvam AI Text-to-Speech (Bulbul v1)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                The generated answer text is converted into human-sounding speech using Sarvam's Bulbul voice engine. Users can play, pause, adjust volume, or replay the explanation on demand.
              </p>
            </div>
          </div>
        </div>

        {/* Safety & Compliance Checklist */}
        <div className="mt-8 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Safety & Data Privacy Guarantees
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>All API keys remain securely hidden in the backend server.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Voice recordings are not stored permanently after transcription.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Answers never promise guaranteed money or eligibility.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Directs citizens to official portals (pmfby.gov.in, pgportal.gov.in).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
