import React from 'react';
import { LanguageCode } from '../types';
import { Landmark, HeartHandshake, ShieldCheck, Award, Target, Users } from 'lucide-react';

interface AboutPageProps {
  currentLanguage: LanguageCode;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLanguage }) => {
  return (
    <div id="about-page" className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>Sahakar Se Samriddhi</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            About Cooperative Sahayak
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Bridging the information divide for India's 30+ crore cooperative members and farmers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6 text-sm text-stone-700 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-700" />
              Our Core Purpose
            </h2>
            <p>
              In rural and semi-urban India, millions of farmers and citizens rely on Primary Agricultural Credit Societies (PACS), district cooperative banks, and agricultural federations for their livelihoods. However, essential information regarding crop loss compensation, 72-hour reporting deadlines, seed subsidies, and grievance redressal often remains locked in lengthy government circulars or inaccessible English-language portals.
            </p>
            <p className="mt-2">
              <strong>Cooperative Sahayak</strong> was created to give every citizen a direct voice-first interface. By combining Sarvam AI's Indian language speech models with verified RAG knowledge, members can speak naturally in Tamil, English, or Hindi and receive grounded, accurate guidance in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 text-emerald-800">
                <Users className="w-4 h-4" />
                Who We Serve
              </h3>
              <p className="text-xs text-stone-600">
                Smallholder farmers, tenant farmers, women's self-help groups (SHGs), PACS secretaries, cooperative board members, and rural citizens seeking welfare schemes.
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 text-amber-800">
                <ShieldCheck className="w-4 h-4" />
                Authenticity & Trust
              </h3>
              <p className="text-xs text-stone-600">
                All answers are grounded in 58 verified chunks derived from Ministry of Cooperation operational guidelines, PMFBY rules, and RBI banking ombudsman frameworks.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <h2 className="text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              The Ministry of Cooperation Vision
            </h2>
            <p>
              Under the vision of <em>"Sahakar Se Samriddhi"</em> (Prosperity through Cooperation), the cooperative movement is undergoing historic modernization: computerizing 63,000+ PACS, implementing Model Bye-laws for multipurpose diversification, building the National Cooperative Database, and founding world-scale cooperative export and seed societies. Cooperative Sahayak ensures this progress is accessible to every grassroots member.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
