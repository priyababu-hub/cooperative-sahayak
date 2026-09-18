import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { 
  AlertOctagon, CheckCircle2, FileText, PhoneCall, ExternalLink, 
  HelpCircle, ShieldAlert, ArrowRight, Building, Clock 
} from 'lucide-react';

interface GrievancePageProps {
  currentLanguage: LanguageCode;
}

export const GrievancePage: React.FC<GrievancePageProps> = ({ currentLanguage }) => {
  const [selectedType, setSelectedType] = useState<string>('pacs');
  const [showPath, setShowPath] = useState(false);

  const grievanceTypes = [
    {
      id: 'pacs',
      title: 'PACS / Primary Village Society',
      desc: 'Refusal of membership, fertilizer distribution irregularities, loan sanction delays',
      authority: 'District Assistant Registrar of Cooperative Societies (ARCS/DRCS)',
      timeline: '15 - 30 days',
      helpline: 'State RCS Citizen Helpline'
    },
    {
      id: 'crop_insurance',
      title: 'PMFBY Crop Insurance Claim Dispute',
      desc: 'Claim rejection, delayed insurance settlement for heavy rain, incorrect area notification',
      authority: 'District Level Grievance Committee (DLGC) headed by District Collector / DM',
      timeline: '15 days',
      helpline: 'National Crop Insurance Helpline: 14447'
    },
    {
      id: 'coop_bank',
      title: 'Cooperative Bank / Banking Deficiency',
      desc: 'ATM transaction failure, unauthorized deductions, excessive interest charges',
      authority: 'Reserve Bank of India Integrated Ombudsman (RB-IOS)',
      timeline: '30 days resolution',
      helpline: 'RBI Toll-free: 14448 | cms.rbi.org.in'
    },
    {
      id: 'multi_state',
      title: 'Multi-State Cooperative Society',
      desc: 'Non-refund of deposits, delayed maturity, management fraud across state borders',
      authority: 'Central Registrar of Cooperative Societies (CRCS), New Delhi',
      timeline: '30 - 45 days',
      helpline: 'CRCS Portal: crcs.gov.in'
    }
  ];

  const currentTypeData = grievanceTypes.find(t => t.id === selectedType) || grievanceTypes[0];

  return (
    <div id="grievance-page" className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Official Redressal Pathways</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Cooperative Grievance Redressal Assistant
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Learn where and how to legally file a complaint against a PACS, cooperative bank, crop insurance company, or society management.
          </p>
        </div>

        {/* Step 1: Select Type */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200 mb-8">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">1</span>
            Select Where Your Problem Occurred
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {grievanceTypes.map((type) => (
              <div
                key={type.id}
                role="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  selectedType === type.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-stone-200 hover:border-emerald-300 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-stone-900">{type.title}</h3>
                  {selectedType === type.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-snug">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Resolution Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200 mb-8">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">2</span>
            Official Resolution Hierarchy for: {currentTypeData.title}
          </h2>

          <div className="relative border-l-2 border-emerald-300 ml-4 space-y-6 pb-2">
            {/* Level 1 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-sm" />
              <h3 className="text-xs font-bold text-emerald-800 uppercase">Stage 1: Internal Representation</h3>
              <p className="font-bold text-stone-900 text-sm mt-0.5">
                Submit a written complaint to the Society Secretary or Bank Branch Manager
              </p>
              <p className="text-xs text-stone-600 mt-1">
                Always submit in duplicate and obtain an acknowledged, signed, and stamped copy. Clearly state your membership/account number and attach supporting receipts.
              </p>
            </div>

            {/* Level 2 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
              <h3 className="text-xs font-bold text-amber-700 uppercase">Stage 2: Statutory Escalation ({currentTypeData.timeline})</h3>
              <p className="font-bold text-stone-900 text-sm mt-0.5">
                Escalate to: {currentTypeData.authority}
              </p>
              <p className="text-xs text-stone-600 mt-1">
                If the society fails to respond or redress your grievance within 15-30 days, submit a formal petition to the district regulatory officer with the acknowledged Stage 1 receipt.
              </p>
            </div>

            {/* Level 3 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow-sm" />
              <h3 className="text-xs font-bold text-purple-700 uppercase">Stage 3: National Centralized Redressal</h3>
              <p className="font-bold text-stone-900 text-sm mt-0.5">
                File Online on CPGRAMS (Centralized Public Grievance Portal)
              </p>
              <p className="text-xs text-stone-600 mt-1">
                Citizens can lodge online grievances 24x7 at <strong>pgportal.gov.in</strong> under the Ministry of Cooperation. By law, grievances must be attended to with written resolution and right of appeal.
              </p>
            </div>
          </div>

          {/* Helpline Callout */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-semibold uppercase">Official Direct Helpline</p>
                <p className="text-sm font-bold text-white">{currentTypeData.helpline}</p>
              </div>
            </div>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors"
            >
              <span>Open CPGRAMS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Step 3: Required Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">3</span>
            Documents & Information Checklist to Keep Ready
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
            <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Full Name, Aadhaar Number, and Village / Taluk / District</span>
            </div>
            <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <Building className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Exact Name and Registration Number of the PACS / Cooperative Society</span>
            </div>
            <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Membership Number, Passbook Copy, or Loan Sanction Letter</span>
            </div>
            <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Chronological summary of dates, payments, and earlier written communications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
