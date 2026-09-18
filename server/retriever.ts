import { COOPERATIVE_KNOWLEDGE_CHUNKS, KnowledgeChunk } from './knowledgeBase';

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedTerms: string[];
}

export interface SearchResponse {
  query: string;
  language: string;
  detectedIntent: string;
  chunks: KnowledgeChunk[];
  sources: { title: string; source: string; category: string }[];
}

// Multilingual intent detector dictionary
const INTENT_PATTERNS = {
  CROP_DAMAGE_INSURANCE: [
    "rain", "heavy rain", "flood", "damage", "crop", "crops", "insurance", "pmfby", "inundation", "calamity",
    "மழை", "கனமழை", "பயிர்", "பயிர்கள்", "சேதம்", "காப்பீடு", "வெள்ளம்", "அரசு உதவி", "பாதிப்பு", "நஷ்டம்",
    "बारिश", "भारी बारिश", "फसल", "नुकसान", "खराब", "बीमा", "बाढ़", "मुआवजा", "सहायता"
  ],
  GRIEVANCE_COMPLAINT: [
    "grievance", "complaint", "problem", "dispute", "fraud", "registrar", "rcs", "cpgrams", "tribunal", "corruption",
    "புகார்", "பிரச்சனை", "மோசடி", "தீர்ப்பு", "மனு", "குறைதீர்ப்பு", "பதிவாளர்",
    "शिकायत", "समस्या", "विवाद", "धोखाधड़ी", "लोकपाल", "पंजीयक", "निवारण"
  ],
  PACS_SERVICES: [
    "pacs", "csc", "fertilizer", "seed", "urea", "godown", "storage", "service centre",
    "பாக்ஸ்", "உரம்", "விதை", "கிடங்கு", "பொது சேவை", "இ-சேவை",
    "पैक्स", "खाद", "उर्वरक", "बीज", "गोदाम", "सीएससी", "भंडारण"
  ],
  MEMBERSHIP_LAWS: [
    "member", "membership", "voting", "election", "by-law", "bye-law", "board", "director", "expulsion",
    "உறுப்பினர்", "வாக்கு", "தேர்தல்", "துணை விதி", "நிர்வாகம்", "நீக்கம்",
    "सदस्य", "सदस्यता", "मतदान", "चुनाव", "उप-नियम", "प्रबंध समिति", "निष्कासन"
  ],
  FINANCIAL_BANKING: [
    "kcc", "kisan credit card", "loan", "interest", "subvention", "deposit", "4%", "dicgc", "bank", "rupay",
    "கடன்", "வட்டி", "கிசான் கிரெடிட் கார்டு", "வைப்பு நிதி", "வங்கி", "மானியம்",
    "ऋण", "लोन", "ब्याज", "केसीसी", "जमा", "बचत", "बैंक"
  ]
};

export function retrieveRelevantChunks(query: string, language: string = 'en-IN', topK: number = 4): SearchResponse {
  const queryLower = query.toLowerCase().trim();
  const tokens = queryLower.split(/[\s,?.!;:()"-]+/).filter(t => t.length > 1);

  // Detect dominant intent
  let detectedIntent = "GENERAL_COOPERATIVE";
  let maxIntentHits = 0;

  for (const [intentName, keywords] of Object.entries(INTENT_PATTERNS)) {
    let hits = 0;
    for (const kw of keywords) {
      if (queryLower.includes(kw.toLowerCase())) {
        hits += 3;
      }
    }
    if (hits > maxIntentHits) {
      maxIntentHits = hits;
      detectedIntent = intentName;
    }
  }

  // Score each chunk
  const scoredChunks: RetrievalResult[] = COOPERATIVE_KNOWLEDGE_CHUNKS.map(chunk => {
    let score = 0;
    const matchedTerms: string[] = [];

    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();
    const keywordsLower = chunk.keywords.map(k => k.toLowerCase());

    // 1. Keyword list match
    for (const kw of keywordsLower) {
      if (queryLower.includes(kw)) {
        score += 8;
        matchedTerms.push(kw);
      }
    }

    // 2. Token match in title and content
    for (const token of tokens) {
      if (titleLower.includes(token)) {
        score += 5;
        matchedTerms.push(token);
      } else if (contentLower.includes(token)) {
        score += 2;
        matchedTerms.push(token);
      }
    }

    // 3. Category & Intent Alignment / Boosting
    if (detectedIntent === "CROP_DAMAGE_INSURANCE") {
      if (chunk.id === "chunk_1" || chunk.id === "chunk_2" || chunk.id === "chunk_3" || chunk.id === "chunk_5") {
        score += 15; // Strongly prioritize PMFBY and heavy rain inundation
      }
      if (chunk.category === "Insurance" && chunk.id === "chunk_56") {
        // PMJJBY is life insurance, penalize for crop damage query
        score -= 20;
      }
      if (chunk.category === "Grievance Redressal" && !queryLower.includes("complaint") && !queryLower.includes("புகார்") && !queryLower.includes("शिकायत")) {
        score -= 10;
      }
    } else if (detectedIntent === "GRIEVANCE_COMPLAINT") {
      if (chunk.category === "Grievance Redressal") {
        score += 12;
      }
      if (chunk.id === "chunk_28" || chunk.id === "chunk_30") {
        score += 8;
      }
    } else if (detectedIntent === "PACS_SERVICES") {
      if (chunk.category === "PACS Services") {
        score += 12;
      }
    } else if (detectedIntent === "MEMBERSHIP_LAWS") {
      if (chunk.category === "Laws & By-laws") {
        score += 12;
      }
    } else if (detectedIntent === "FINANCIAL_BANKING") {
      if (chunk.category === "Financial Literacy") {
        score += 12;
      }
    }

    return { chunk, score, matchedTerms };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top K chunks with positive scores, or at least top 2 if score is very low
  let selected = scoredChunks.filter(sc => sc.score > 2).slice(0, topK);
  if (selected.length === 0) {
    selected = scoredChunks.slice(0, 2);
  }

  const chunks = selected.map(s => s.chunk);
  const sources = chunks.map(c => ({
    title: c.title,
    source: c.source,
    category: c.category
  }));

  return {
    query,
    language,
    detectedIntent,
    chunks,
    sources
  };
}
