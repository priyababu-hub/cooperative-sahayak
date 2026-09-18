import React from 'react';
import { SchemeItem } from '../types';
import { ArrowRight, BookmarkCheck, Calendar, Building2 } from 'lucide-react';

interface SchemeCardProps {
  scheme: SchemeItem;
  onSelect: (scheme: SchemeItem) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onSelect }) => {
  return (
    <div 
      id={`scheme-card-${scheme.id}`}
      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            {scheme.category}
          </span>
          <span className="text-[11px] text-stone-500 flex items-center gap-1 font-mono">
            <Calendar className="w-3 h-3" />
            {scheme.lastVerified}
          </span>
        </div>

        <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-800 transition-colors mb-2">
          {scheme.title}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
          {scheme.content}
        </p>
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
        <span className="text-[11px] text-stone-500 flex items-center gap-1 truncate max-w-[180px]">
          <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="truncate">{scheme.source.split(',')[0]}</span>
        </span>

        <button
          type="button"
          onClick={() => onSelect(scheme)}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
