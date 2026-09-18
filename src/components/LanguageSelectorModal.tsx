import React, { useEffect } from 'react';
import { LanguageCode } from '../types';
import { Check, X, PhoneCall, Globe } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  // Keyboard shortcut listener for 1, 2, 3
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') {
        onSelectLanguage('ta-IN');
        onClose();
      } else if (e.key === '2') {
        onSelectLanguage('en-IN');
        onClose();
      } else if (e.key === '3') {
        onSelectLanguage('hi-IN');
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onSelectLanguage, onClose]);

  if (!isOpen) return null;

  const languages: {
    code: LanguageCode;
    number: string;
    nativeName: string;
    englishName: string;
    subtext: string;
    ivrPhrase: string;
    badgeColor: string;
  }[] = [
    {
      code: 'ta-IN',
      number: '1',
      nativeName: 'தமிழ்',
      englishName: 'Tamil',
      subtext: 'விவசாயிகள் மற்றும் கூட்டுறவு உறுப்பினர்களுக்கான தமிழ் குரல் உதவி',
      ivrPhrase: 'தமிழுக்கு 1 அழுத்தவும் / Press 1 for Tamil',
      badgeColor: 'bg-emerald-700 text-white'
    },
    {
      code: 'en-IN',
      number: '2',
      nativeName: 'English',
      englishName: 'English (Indian)',
      subtext: 'Multilingual voice assistance for cooperative laws, PMFBY, and schemes',
      ivrPhrase: 'Press 2 for English',
      badgeColor: 'bg-blue-700 text-white'
    },
    {
      code: 'hi-IN',
      number: '3',
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
      subtext: 'सहकारी समितियों, पैक्स एवं कृषकों के लिए प्रामाणिक आवाज सहायता',
      ivrPhrase: 'हिन्दी के लिए 3 दबाएं / Press 3 for Hindi',
      badgeColor: 'bg-amber-700 text-white'
    },
  ];

  return (
    <div 
      id="language-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="language-modal-content"
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Choose Your Language / மொழியைத் தேர்ந்தெடுக்கவும் / भाषा चुनें
              </h2>
              <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>IVR & Web Assisted • Click a card or press the digit on your keyboard</span>
              </p>
            </div>
          </div>
          <button
            id="close-language-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Large Language Cards */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <div
                key={lang.code}
                id={`language-option-${lang.code}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Large Dialpad Digit */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200 border border-stone-300 flex flex-col items-center justify-center shadow-inner group-hover:bg-emerald-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-mono">
                      {lang.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      KEY
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-bold text-stone-900">
                        {lang.nativeName}
                      </span>
                      <span className="text-sm font-semibold text-stone-500">
                        ({lang.englishName})
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 mt-1 max-w-md">
                      {lang.subtext}
                    </p>
                    <p className="text-xs font-semibold text-amber-700 mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {lang.ivrPhrase}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2.5 py-1 rounded border border-stone-200">
                    Press [{lang.number}]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
          <span>Target Users: Farmers, PACS Members, Rural Citizens, Cooperative Employees</span>
          <button
            onClick={onClose}
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2"
          >
            Continue with {currentLanguage === 'ta-IN' ? 'தமிழ்' : currentLanguage === 'hi-IN' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};
