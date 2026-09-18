import React, { useState, useEffect } from 'react';
import { QueryStats, LanguageCode } from '../types';
import { 
  BarChart3, Users, MessageSquare, Globe2, Activity, 
  TrendingUp, ShieldCheck, RefreshCw, CheckCircle2 
} from 'lucide-react';

interface AdminPageProps {
  currentLanguage: LanguageCode;
}

export const AdminPage: React.FC<AdminPageProps> = ({ currentLanguage }) => {
  const [stats, setStats] = useState<QueryStats>({
    totalQueries: 142,
    queriesByLanguage: {
      'ta-IN': 68,
      'en-IN': 44,
      'hi-IN': 30
    },
    categories: {
      'Agriculture': 58,
      'Cooperative Services': 34,
      'PACS Services': 28,
      'Financial Literacy': 12,
      'Grievance Redressal': 10
    },
    recentQueries: [
      {
        id: 'q_1',
        query: 'கனமழையால் எனது பயிர்கள் சேதமடைந்துவிட்டன. எனக்கு அரசு உதவி கிடைக்குமா?',
        language: 'ta-IN',
        category: 'Agriculture',
        time: '10 mins ago',
        intent: 'CROP_DAMAGE_INSURANCE'
      },
      {
        id: 'q_2',
        query: 'What is the procedure to become an active member of PACS?',
        language: 'en-IN',
        category: 'PACS Services',
        time: '25 mins ago',
        intent: 'MEMBERSHIP_LAWS'
      },
      {
        id: 'q_3',
        query: 'भारी बारिश के कारण मेरी फसल खराब हो गई है। क्या मुझे सरकारी सहायता मिल सकती है?',
        language: 'hi-IN',
        category: 'Agriculture',
        time: '42 mins ago',
        intent: 'CROP_DAMAGE_INSURANCE'
      },
      {
        id: 'q_4',
        query: 'How does the KCC 4% effective interest rate work for crop loans?',
        language: 'en-IN',
        category: 'Financial Literacy',
        time: '1 hr ago',
        intent: 'FINANCIAL_BANKING'
      }
    ]
  });

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live stats, using current cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const total = stats.totalQueries || 1;
  const tamilCount = stats.queriesByLanguage['ta-IN'] || 0;
  const englishCount = stats.queriesByLanguage['en-IN'] || 0;
  const hindiCount = stats.queriesByLanguage['hi-IN'] || 0;

  return (
    <div id="admin-dashboard-page" className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 text-stone-900 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Cooperative Assistance Analytics</span>
            </div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              Platform Query Dashboard
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              Live metrics across Tamil, English, and Hindi assistance channels.
            </p>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-700' : ''}`} />
            <span>Refresh Metrics</span>
          </button>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Queries</span>
              <MessageSquare className="w-5 h-5 text-emerald-700" />
            </div>
            <p className="text-3xl font-black text-stone-900">{stats.totalQueries}</p>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Voice & text interactions
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Tamil Queries</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">1 → தமிழ்</span>
            </div>
            <p className="text-3xl font-black text-stone-900">{tamilCount}</p>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {Math.round((tamilCount / total) * 100)}% of total traffic
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">English Queries</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">2 → English</span>
            </div>
            <p className="text-3xl font-black text-stone-900">{englishCount}</p>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {Math.round((englishCount / total) * 100)}% of total traffic
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Hindi Queries</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">3 → हिन्दी</span>
            </div>
            <p className="text-3xl font-black text-stone-900">{hindiCount}</p>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {Math.round((hindiCount / total) * 100)}% of total traffic
            </span>
          </div>
        </div>

        {/* Breakdown: Languages & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Language Distribution Progress Bars */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-700" />
              Language Breakdown
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-800">Tamil (தமிழ் - ta-IN)</span>
                  <span className="text-emerald-800 font-bold">{tamilCount} ({Math.round((tamilCount / total) * 100)}%)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(tamilCount / total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-800">English (en-IN)</span>
                  <span className="text-blue-800 font-bold">{englishCount} ({Math.round((englishCount / total) * 100)}%)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(englishCount / total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-800">Hindi (हिन्दी - hi-IN)</span>
                  <span className="text-amber-800 font-bold">{hindiCount} ({Math.round((hindiCount / total) * 100)}%)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(hindiCount / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              Most Requested Knowledge Categories
            </h2>

            <div className="space-y-3">
              {Object.entries(stats.categories).map(([catName, count]) => {
                const pct = Math.round((count / (stats.totalQueries || 1)) * 100);
                return (
                  <div key={catName} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
                    <div>
                      <p className="text-xs font-bold text-stone-900">{catName}</p>
                      <span className="text-[11px] text-stone-500">Grounded in verified chunks</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-emerald-800">{count}</span>
                      <span className="text-[10px] text-stone-400 block">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Recent Queries Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-700" />
            Recent Citizen Inquiries (Live Session Stream)
          </h2>

          <div className="divide-y divide-stone-100">
            {stats.recentQueries.map((q) => (
              <div key={q.id} className="py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="max-w-xl">
                  <p className="text-xs sm:text-sm font-semibold text-stone-900">
                    "{q.query}"
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded">
                      {q.language}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{q.category}</span>
                    <span>•</span>
                    <span>Intent: {q.intent}</span>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-stone-400">
                  {q.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
