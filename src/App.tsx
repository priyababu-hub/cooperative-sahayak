import React, { useState, useEffect } from 'react';
import { LanguageCode } from './types';
import { Header } from './components/Header';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { HomePage } from './pages/HomePage';
import { AssistantPage } from './pages/AssistantPage';
import { SchemesPage } from './pages/SchemesPage';
import { GrievancePage } from './pages/GrievancePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { Landmark, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('cooperative_sahayak_lang');
    return (saved as LanguageCode) || 'ta-IN'; // Default to Tamil as primary demonstration
  });

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Save selected language to localStorage
  const handleSelectLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('cooperative_sahayak_lang', lang);
  };

  // Keyboard shortcut listener for global IVR keys '1', '2', '3'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === '1') {
        handleSelectLanguage('ta-IN');
      } else if (e.key === '2') {
        handleSelectLanguage('en-IN');
      } else if (e.key === '3') {
        handleSelectLanguage('hi-IN');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans antialiased text-stone-900 selection:bg-amber-200 selection:text-emerald-950">
      {/* Header */}
      <Header
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            currentLanguage={currentLanguage}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'assistant' && (
          <AssistantPage
            currentLanguage={currentLanguage}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'schemes' && (
          <SchemesPage currentLanguage={currentLanguage} />
        )}

        {currentPage === 'grievance' && (
          <GrievancePage currentLanguage={currentLanguage} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage currentLanguage={currentLanguage} />
        )}

        {currentPage === 'about' && (
          <AboutPage currentLanguage={currentLanguage} />
        )}

        {currentPage === 'admin' && (
          <AdminPage currentLanguage={currentLanguage} />
        )}
      </main>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Accessible Footer */}
      <footer id="app-footer" className="bg-emerald-950 text-emerald-100 border-t border-emerald-800/80 pt-10 pb-12 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-base">
                CS
              </div>
              <span className="font-bold text-white text-sm">Cooperative Sahayak</span>
            </div>
            <p className="text-emerald-300/80 leading-relaxed">
              "Your Voice. Your Language. Your Rights." Multilingual voice guidance for farmers, PACS members, and cooperative society stakeholders across India.
            </p>
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>सहकार से समृद्धि (Sahakar Se Samriddhi)</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Direct Helplines</h4>
            <ul className="space-y-1.5 text-emerald-300/90">
              <li>• PMFBY Crop Insurance: <strong className="text-white font-mono">14447</strong> (72-hr rule)</li>
              <li>• Banking Ombudsman: <strong className="text-white font-mono">14448</strong></li>
              <li>• National Cyber Crime: <strong className="text-white font-mono">1930</strong></li>
              <li>• Kisan Call Centre: <strong className="text-white font-mono">1800-180-1551</strong></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Official Portals</h4>
            <ul className="space-y-1.5 text-emerald-300/90">
              <li><a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">PMFBY Portal (pmfby.gov.in)</a></li>
              <li><a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">CPGRAMS Redressal (pgportal.gov.in)</a></li>
              <li><a href="https://cooperatives.gov.in" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">Ministry of Cooperation (cooperatives.gov.in)</a></li>
              <li><a href="https://crcs.gov.in" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">Central Registrar Portal (crcs.gov.in)</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Language Switcher (IVR)</h4>
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => handleSelectLanguage('ta-IN')}
                className={`px-3 py-1.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentLanguage === 'ta-IN' ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                }`}
              >
                <span>1 → தமிழ் (Tamil)</span>
                <span className="text-[10px] font-mono">[Key 1]</span>
              </button>

              <button 
                onClick={() => handleSelectLanguage('en-IN')}
                className={`px-3 py-1.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentLanguage === 'en-IN' ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                }`}
              >
                <span>2 → English (Indian)</span>
                <span className="text-[10px] font-mono">[Key 2]</span>
              </button>

              <button 
                onClick={() => handleSelectLanguage('hi-IN')}
                className={`px-3 py-1.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentLanguage === 'hi-IN' ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                }`}
              >
                <span>3 → हिन्दी (Hindi)</span>
                <span className="text-[10px] font-mono">[Key 3]</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900 flex flex-wrap items-center justify-between text-xs text-emerald-400 gap-2">
          <p>© 2026 Cooperative Sahayak. Powered by Sarvam AI & Grounded Cooperative RAG.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Hallucination Policy • Official Ministry Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
