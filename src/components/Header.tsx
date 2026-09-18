import React from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Mic, Landmark, Globe, Check } from 'lucide-react';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenLanguageModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onSelectLanguage,
  currentPage,
  onNavigate,
  onOpenLanguageModal
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const languages: { code: LanguageCode; label: string; key: string }[] = [
    { code: 'ta-IN', label: 'தமிழ்', key: '1' },
    { code: 'en-IN', label: 'English', key: '2' },
    { code: 'hi-IN', label: 'हिन्दी', key: '3' },
  ];

  return (
    <header id="app-header" className="bg-emerald-900 text-white shadow-md sticky top-0 z-40 border-b border-emerald-800">
      {/* Top emergency and helpline strip */}
      <div className="bg-emerald-950/80 px-4 py-1 text-xs text-emerald-200 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Landmark className="w-3.5 h-3.5" />
              सहकार से समृद्धि • Sahakar Se Samriddhi
            </span>
            <span className="hidden sm:inline text-emerald-400">|</span>
            <span className="hidden sm:inline">Ministry of Cooperation Verified Knowledge Service</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>PMFBY Helpline: <strong className="text-white font-mono">14447</strong></span>
            <span>•</span>
            <span>Banking Ombudsman: <strong className="text-white font-mono">14448</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Title */}
        <div 
          id="logo-brand"
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xl shadow-md border border-amber-300 group-hover:scale-105 transition-transform">
            CS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-800/90 text-emerald-200 text-[10px] uppercase font-semibold px-2 py-0.5 rounded border border-emerald-700">
                Official RAG
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav id="main-navigation" className="hidden lg:flex items-center gap-1">
          {[
            { id: 'home', label: t.navHome },
            { id: 'assistant', label: t.navAssistant, highlight: true },
            { id: 'schemes', label: t.navSchemes },
            { id: 'grievance', label: t.navGrievance },
            { id: 'how-it-works', label: t.navHowItWorks },
            { id: 'about', label: t.navAbout },
            { id: 'admin', label: t.navAdmin }
          ].map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-amber-400 text-emerald-950 font-semibold shadow-sm'
                  : item.highlight
                  ? 'bg-emerald-800 text-white hover:bg-emerald-700 border border-emerald-600'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Selector and Voice CTA */}
        <div className="flex items-center gap-2">
          {/* Quick Language Selector */}
          <div className="bg-emerald-950/70 p-1 rounded-xl border border-emerald-700/80 flex items-center gap-1">
            {languages.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onSelectLanguage(lang.code)}
                  title={`Select ${lang.label} (Press ${lang.key})`}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-400 text-emerald-950 shadow-sm scale-102'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800'
                  }`}
                >
                  <span className="opacity-70 text-[10px] font-mono">[{lang.key}]</span>
                  <span>{lang.label}</span>
                  {isActive && <Check className="w-3 h-3 text-emerald-950 stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Change Language Button for mobile/details */}
          <button
            id="choose-language-modal-trigger"
            onClick={onOpenLanguageModal}
            className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Open Language Selection Dialog"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Languages</span>
          </button>

          {/* Direct CTA */}
          <button
            id="header-start-voice-cta"
            onClick={() => onNavigate('assistant')}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-3.5 py-1.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 text-emerald-900 fill-emerald-900 animate-pulse" />
            <span className="hidden sm:inline">Voice Assistant</span>
            <span className="sm:hidden">Voice</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden border-t border-emerald-800/80 bg-emerald-950/90 px-4 py-2 flex items-center justify-between overflow-x-auto gap-2">
        {[
          { id: 'home', label: t.navHome },
          { id: 'assistant', label: t.navAssistant },
          { id: 'schemes', label: t.navSchemes },
          { id: 'grievance', label: t.navGrievance },
          { id: 'how-it-works', label: t.navHowItWorks },
          { id: 'admin', label: t.navAdmin }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-medium ${
              currentPage === item.id
                ? 'bg-amber-400 text-emerald-950 font-bold'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
