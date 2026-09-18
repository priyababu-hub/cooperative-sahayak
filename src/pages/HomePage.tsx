import React from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Mic, ArrowRight, ShieldCheck, Sparkles, Building2, Sprout, 
  HelpCircle, PhoneCall, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface HomePageProps {
  currentLanguage: LanguageCode;
  onNavigate: (page: string) => void;
  onOpenLanguageModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLanguage,
  onNavigate,
  onOpenLanguageModal,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div id="home-page" className="min-h-screen bg-stone-50 text-stone-900 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white pt-10 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative background rings */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 bg-emerald-950/70 border border-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Ministry of Cooperation Verified Assistance • தமிழ் • English • हिन्दी</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {t.heroHeading}
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                {t.heroSubheading}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-start-voice-btn"
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-95"
                >
                  <Mic className="w-5 h-5 text-emerald-900 fill-emerald-900 animate-bounce" />
                  <span>{t.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-900" />
                </button>

                <button
                  id="hero-explore-schemes-btn"
                  type="button"
                  onClick={() => onNavigate('schemes')}
                  className="bg-emerald-950/80 hover:bg-emerald-950 text-emerald-100 hover:text-white font-bold px-5 py-3.5 rounded-2xl text-sm sm:text-base border border-emerald-700 transition-colors"
                >
                  {t.heroSecondaryCta}
                </button>
              </div>

              {/* Language Switch Quick Pill */}
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-200">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>IVR Dialpad Shortcuts: Press 1 for தமிழ், 2 for English, 3 for हिन्दी</span>
                <button 
                  onClick={onOpenLanguageModal}
                  className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Right Visual: Process Flow Diagram */}
            <div className="lg:col-span-5">
              <div className="bg-emerald-950/70 border border-emerald-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    How Sahayak Works
                  </span>
                  <span className="text-[11px] text-emerald-300 bg-emerald-900 px-2 py-0.5 rounded">
                    Voice-First AI
                  </span>
                </div>

                {/* 4 Step Visual Indicators */}
                <div className="mt-5 space-y-3">
                  {[
                    {
                      icon: "🎤",
                      step: "1",
                      title: "Voice Input (குரல் பதிவு)",
                      desc: "Speak naturally in Tamil, English, or Hindi via phone or browser"
                    },
                    {
                      icon: "🧠",
                      step: "2",
                      title: "Sarvam Speech-to-Text",
                      desc: "Saaras v4 translates audio to accurate text in milliseconds"
                    },
                    {
                      icon: "📚",
                      step: "3",
                      title: "Verified Cooperative RAG",
                      desc: "Searches 58 official policy & scheme chunks (PMFBY, PACS, Laws)"
                    },
                    {
                      icon: "💡",
                      step: "4",
                      title: "Grounded Spoken Guidance",
                      desc: "Listen to the answer in your own language with Sarvam TTS"
                    }
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-emerald-900/60 p-3 rounded-2xl border border-emerald-800">
                      <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-lg shrink-0">
                        {s.icon}
                      </div>
                      <div>
                        <h2 className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{s.title}</span>
                        </h2>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-tight">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-800 text-center">
                  <button
                    onClick={() => onNavigate('assistant')}
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Try a Voice Question Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'pmfby',
              title: 'PMFBY Crop Loss',
              tamil: 'பயிர் காப்பீடு',
              desc: 'Heavy rain, flood damage & mandatory 72-hour notification protocol.',
              icon: Sprout,
              color: 'text-emerald-700 bg-emerald-100',
              query: 'கனமழையால் எனது பயிர்கள் சேதமடைந்துவிட்டன. எனக்கு அரசு உதவி கிடைக்குமா?'
            },
            {
              id: 'pacs',
              title: 'PACS Services',
              tamil: 'தொடக்க வேளாண் சங்கம்',
              desc: 'Multipurpose transformation, fertilizers, seeds, and CSC e-services.',
              icon: Building2,
              color: 'text-amber-700 bg-amber-100',
              query: 'What services are available at my local PACS under model bye-laws?'
            },
            {
              id: 'grievance',
              title: 'Grievance Redressal',
              tamil: 'குறைதீர்ப்பு வழிகாட்டுதல்',
              desc: 'Steps to resolve society disputes via ARCS/DRCS and CPGRAMS.',
              icon: HelpCircle,
              color: 'text-blue-700 bg-blue-100',
              query: 'Where can I file a complaint against my cooperative society?'
            },
            {
              id: 'banking',
              title: 'Cooperative Banking',
              tamil: 'வங்கி & கேசிசி கடன்',
              desc: 'KCC 4% interest subvention, RuPay cards & DICGC ₹5 lakh protection.',
              icon: ShieldCheck,
              color: 'text-purple-700 bg-purple-100',
              query: 'How does the Kisan Credit Card (KCC) 4% effective interest rate work?'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                onClick={() => onNavigate('assistant')}
                className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                      GUIDANCE
                    </span>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-800 mb-1.5">
                    {item.tamil}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                  <span>Ask This Question</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Demonstration Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Rural-First Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-3 leading-snug">
              Designed for limited digital literacy and basic smartphones.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
              No complex menus or complicated legal jargon. Simply tap the microphone, ask your question in your mother tongue, and listen to the verified answer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-2xl mb-1 font-bold text-emerald-800">1</div>
                <h4 className="font-bold text-stone-900 text-xs">Choose Language</h4>
                <p className="text-[11px] text-stone-600 mt-0.5">Tamil, English, or Hindi with one tap.</p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-2xl mb-1 font-bold text-emerald-800">2</div>
                <h4 className="font-bold text-stone-900 text-xs">Tap & Speak</h4>
                <p className="text-[11px] text-stone-600 mt-0.5">Explain your crop or society issue naturally.</p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-2xl mb-1 font-bold text-emerald-800">3</div>
                <h4 className="font-bold text-stone-900 text-xs">Hear Your Rights</h4>
                <p className="text-[11px] text-stone-600 mt-0.5">Clear audio answer with official contact channels.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('assistant')}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-6 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Open Voice Assistant</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('schemes')}
                className="text-stone-700 hover:text-emerald-800 font-bold text-sm underline underline-offset-4"
              >
                Browse All 58 Schemes & Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
