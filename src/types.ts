export type LanguageCode = 'ta-IN' | 'en-IN' | 'hi-IN';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  shortcut: string;
  description: string;
  flag: string;
}

export interface SchemeItem {
  id: string;
  category: string;
  title: string;
  content: string;
  source: string;
  lastVerified: string;
  keywords: string[];
}

export interface QueryResponseData {
  success: boolean;
  query: string;
  language: LanguageCode;
  detectedIntent: string;
  sources: { title: string; source: string; category: string }[];
  answer: string;
  groundedInChunks?: string[];
  error?: string;
}

export interface QueryStats {
  totalQueries: number;
  queriesByLanguage: Record<string, number>;
  categories: Record<string, number>;
  recentQueries: {
    id: string;
    query: string;
    language: string;
    category: string;
    time: string;
    intent: string;
  }[];
}

export type AssistantStep =
  | 'idle'
  | 'recording'
  | 'transcribing'
  | 'searching'
  | 'answering'
  | 'ready'
  | 'error';
