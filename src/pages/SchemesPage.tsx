import React, { useState, useEffect } from 'react';
import { SchemeItem, LanguageCode } from '../types';
import { COOPERATIVE_KNOWLEDGE_CHUNKS } from '../data/cooperativeKnowledge';
import { SchemeCard } from '../components/SchemeCard';
import { SchemeDetailsModal } from '../components/SchemeDetailsModal';
import { Search, Filter, BookOpen, Layers } from 'lucide-react';

interface SchemesPageProps {
  currentLanguage: LanguageCode;
}

const CATEGORIES = [
  'All',
  'Agriculture',
  'PACS Services',
  'Cooperative Services',
  'Laws & By-laws',
  'Grievance Redressal',
  'Financial Literacy',
  'Insurance',
  'Government Schemes'
];

export const SchemesPage: React.FC<SchemesPageProps> = ({ currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);

  const filteredSchemes = COOPERATIVE_KNOWLEDGE_CHUNKS.filter(scheme => {
    const matchesCat = selectedCategory === 'All' || scheme.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;

    const matchesQuery = 
      scheme.title.toLowerCase().includes(query) ||
      scheme.content.toLowerCase().includes(query) ||
      scheme.keywords.some(k => k.toLowerCase().includes(query));

    return matchesCat && matchesQuery;
  });

  return (
    <div id="schemes-page" className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Knowledge Base (58 Chunks)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Cooperative Schemes & Services Directory
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Browse verified policy information on PMFBY crop insurance, PACS multipurpose transformation, banking subventions, member rights, and dispute redressal.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-200 mb-8 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="schemes-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, crop, fertilizer, KCC, rule, or keyword (English, Tamil, Hindi)..."
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-12 pr-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm scale-102'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <span className="flex items-center gap-1 font-semibold text-stone-700">
            <Layers className="w-4 h-4 text-emerald-700" />
            Showing {filteredSchemes.length} of {COOPERATIVE_KNOWLEDGE_CHUNKS.length} verified records
          </span>
          {selectedCategory !== 'All' && (
            <span className="bg-stone-200/80 px-2 py-0.5 rounded text-[11px]">
              Filtered by: {selectedCategory}
            </span>
          )}
        </div>

        {/* Schemes Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSelect={(s) => setSelectedScheme(s)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="text-stone-500 text-sm font-semibold">
              No verified schemes matched your search query "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs font-bold text-emerald-800 hover:underline"
            >
              Reset search filters
            </button>
          </div>
        )}

        {/* Details Modal */}
        <SchemeDetailsModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      </div>
    </div>
  );
};
