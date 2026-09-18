import React from 'react';
import { SchemeItem } from '../types';
import { X, CheckCircle2, FileText, MapPin, AlertTriangle, ShieldCheck, ExternalLink, Calendar } from 'lucide-react';

interface SchemeDetailsModalProps {
  scheme: SchemeItem | null;
  onClose: () => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({ scheme, onClose }) => {
  if (!scheme) return null;

  // Derive structured data from the verified content
  const isPMFBY = scheme.title.toLowerCase().includes('pmfby') || scheme.title.toLowerCase().includes('crop insurance');
  const isPACS = scheme.category === 'PACS Services';
  const isKCC = scheme.title.toLowerCase().includes('kcc') || scheme.title.toLowerCase().includes('credit card');
  const isGrievance = scheme.category === 'Grievance Redressal';

  return (
    <div 
      id="scheme-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="scheme-modal-content"
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {scheme.category}
              </span>
              <span className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                Verified: {scheme.lastVerified}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
              {scheme.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 8 Standard Sections */}
        <div className="mt-6 space-y-6 text-sm text-stone-700">
          {/* 1. Purpose */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              1. Purpose
            </h3>
            <p className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 leading-relaxed text-stone-800">
              {scheme.content}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2. Who may be eligible */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                2. Who May Be Eligible
              </h3>
              <ul className="text-xs space-y-1.5 text-stone-700">
                {isPMFBY ? (
                  <>
                    <li>• Farmers (loanee, non-loanee, tenant farmers, sharecroppers)</li>
                    <li>• Growing notified crops in officially notified areas for the current season</li>
                    <li>• Must have completed sowing certificate/land cultivation records</li>
                  </>
                ) : isPACS ? (
                  <>
                    <li>• Resident individuals residing within the operational jurisdiction of the PACS</li>
                    <li>• Farmers, rural artisans, and agricultural laborers</li>
                    <li>• Qualifying under society model by-laws</li>
                  </>
                ) : isKCC ? (
                  <>
                    <li>• All farmers, individual/joint borrowers, tenant farmers, oral lessees</li>
                    <li>• Self-Help Groups (SHGs) or Joint Liability Groups (JLGs)</li>
                    <li>• Animal husbandry, dairy, and fisheries farmers</li>
                  </>
                ) : (
                  <>
                    <li>• Cooperative society members with valid membership</li>
                    <li>• Citizens affected by cooperative society decisions or services</li>
                  </>
                )}
              </ul>
            </div>

            {/* 3. Benefits */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                3. Key Benefits
              </h3>
              <ul className="text-xs space-y-1.5 text-stone-700">
                {isPMFBY ? (
                  <>
                    <li>• Direct claim settlement for unseasonal rain, flood, inundation</li>
                    <li>• Subsidized farmer premium: 2% Kharif, 1.5% Rabi, 5% Commercial</li>
                    <li>• Payout credited directly into Aadhaar-seeded bank account</li>
                  </>
                ) : isPACS ? (
                  <>
                    <li>• Access to subsidized fertilizers (Nano Urea, DAP) and certified seeds</li>
                    <li>• Over 300+ Common Service Centre (CSC) digital services locally</li>
                    <li>• Doorstep cash withdrawals via Micro-ATMs / AePS</li>
                  </>
                ) : isKCC ? (
                  <>
                    <li>• Effective 4% interest rate upon prompt repayment (3% PRI incentive)</li>
                    <li>• RuPay Kisan debit card for ATM cash and POS purchases</li>
                    <li>• Flexible credit limit with 10% annual escalation</li>
                  </>
                ) : (
                  <>
                    <li>• Democratic governance rights ('One Member One Vote')</li>
                    <li>• Impartial dispute resolution through Registrar / Tribunals</li>
                    <li>• Protected deposits up to ₹5,00,000 under DICGC</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* 4. Required Documents & 5. Where to Apply */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-stone-700" />
                4. Required Documents
              </h3>
              <ul className="text-xs space-y-1 text-stone-600">
                <li>• Aadhaar Card (mandatory ID)</li>
                <li>• Land Records (Patta / Chitta / RoR / Khasra-Khatauni)</li>
                <li>• Sowing Certificate or Crop Declaration</li>
                <li>• Bank Account Passbook (Aadhaar linked)</li>
                <li>• Tenancy/Lease agreement if cultivating leased land</li>
              </ul>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                5. Where & How to Apply
              </h3>
              <ul className="text-xs space-y-1 text-stone-600">
                <li>• <strong>Primary Channel:</strong> Nearest Village PACS office</li>
                <li>• <strong>Bank Branch:</strong> District Central Cooperative Bank or Commercial Bank</li>
                <li>• <strong>Digital:</strong> Common Service Centre (CSC) in your panchayat</li>
                <li>• <strong>Online:</strong> National Portal ({isPMFBY ? 'pmfby.gov.in' : 'cooperatives.gov.in'})</li>
              </ul>
            </div>
          </div>

          {/* 6. Important Conditions */}
          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 text-rose-950">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              6. Important Conditions & Timeframes
            </h3>
            <p className="text-xs leading-relaxed">
              {isPMFBY 
                ? "For localized calamities (heavy rain, inundation, hailstorm), you MUST report crop loss within 72 hours via the Crop Insurance App or toll-free helpline 14447. Failure to report within 72 hours may jeopardize localized assessment."
                : "All benefits depend on formal enrollment before state-specified cut-off dates. Ensure all land records and bank accounts have active Aadhaar seeding."}
            </p>
          </div>

          {/* 7. Source & Verification */}
          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
            <span>
              <strong>Official Source:</strong> {scheme.source}
            </span>
            <span className="font-mono">
              Last Verified: {scheme.lastVerified}
            </span>
          </div>
        </div>

        {/* Close button */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
