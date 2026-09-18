import express from 'express';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { retrieveRelevantChunks } from './server/retriever';
import { generateGroundedAnswer } from './server/services/geminiLlm';
import { transcribeAudio, synthesizeSpeech } from './server/services/sarvam';
import { COOPERATIVE_KNOWLEDGE_CHUNKS } from './server/knowledgeBase';

dotenv.config();

const app = express();
const PORT = 3000;

// Multer memory storage for audio upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// In-memory query analytics
const queryStats = {
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
    }
  ]
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Cooperative Sahayak' });
});

// =================================================================
// 1. SPEECH-TO-TEXT ENDPOINT
// =================================================================
app.post('/api/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    const language = (req.body.language || req.body.language_code || 'en-IN') as string;
    let audioBuffer: Buffer | null = null;
    let mimetype = 'audio/webm';
    let filename = 'recording.webm';

    if (req.file) {
      audioBuffer = req.file.buffer;
      mimetype = req.file.mimetype;
      filename = req.file.originalname || filename;
    } else if (req.body.audioBase64) {
      const base64Data = req.body.audioBase64.replace(/^data:audio\/\w+;base64,/, '');
      audioBuffer = Buffer.from(base64Data, 'base64');
    }

    if (!audioBuffer) {
      return res.status(400).json({
        success: false,
        error: 'No audio data received. Please provide an audio file or base64 audio.'
      });
    }

    const sttResult = await transcribeAudio(audioBuffer, mimetype, language, filename);

    res.json(sttResult);
  } catch (err: any) {
    console.error('Error in /api/speech-to-text:', err);
    res.status(500).json({
      success: false,
      error: 'Voice processing failed. Please try again.'
    });
  }
});

// =================================================================
// 2. RAG SEARCH & GROUNDED QUERY ENDPOINT
// =================================================================
app.post('/api/query', async (req, res) => {
  try {
    const { query, language = 'en-IN' } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Query string is required.'
      });
    }

    // 1. Retrieve relevant verified knowledge chunks
    const retrieval = retrieveRelevantChunks(query.trim(), language, 4);

    // 2. Pass retrieved context to LLM for grounded answer generation
    const llmResult = await generateGroundedAnswer({
      query: query.trim(),
      language,
      chunks: retrieval.chunks
    });

    // 3. Update query analytics
    queryStats.totalQueries += 1;
    const langKey = (language in queryStats.queriesByLanguage) ? (language as keyof typeof queryStats.queriesByLanguage) : 'en-IN';
    queryStats.queriesByLanguage[langKey] = (queryStats.queriesByLanguage[langKey] || 0) + 1;

    const primaryCategory = retrieval.chunks[0]?.category || 'General';
    if (primaryCategory in queryStats.categories) {
      queryStats.categories[primaryCategory as keyof typeof queryStats.categories] += 1;
    }

    queryStats.recentQueries.unshift({
      id: `q_${Date.now()}`,
      query: query.trim().slice(0, 100),
      language,
      category: primaryCategory,
      time: 'Just now',
      intent: retrieval.detectedIntent
    });
    if (queryStats.recentQueries.length > 8) {
      queryStats.recentQueries.pop();
    }

    res.json({
      success: true,
      query: query.trim(),
      language,
      detectedIntent: retrieval.detectedIntent,
      sources: retrieval.sources,
      answer: llmResult.answer,
      groundedInChunks: llmResult.groundedInChunks
    });
  } catch (err: any) {
    console.error('Error in /api/query:', err);
    res.status(500).json({
      success: false,
      error: 'Query processing failed. Please try again.'
    });
  }
});

// =================================================================
// 3. TEXT-TO-SPEECH ENDPOINT
// =================================================================
app.post('/api/text-to-speech', async (req, res) => {
  try {
    const { text, language = 'en-IN' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Text string is required for speech synthesis.'
      });
    }

    const ttsResult = await synthesizeSpeech(text, language);
    res.json(ttsResult);
  } catch (err: any) {
    console.error('Error in /api/text-to-speech:', err);
    res.status(500).json({
      success: false,
      error: 'Speech synthesis failed.'
    });
  }
});

// =================================================================
// 4. SCHEMES & SERVICES CATALOG
// =================================================================
app.get('/api/schemes', (req, res) => {
  const categoryFilter = req.query.category as string | undefined;

  let schemes = COOPERATIVE_KNOWLEDGE_CHUNKS;
  if (categoryFilter && categoryFilter !== 'All') {
    schemes = schemes.filter(c => c.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  res.json({
    success: true,
    total: schemes.length,
    schemes
  });
});

app.get('/api/schemes/:id', (req, res) => {
  const scheme = COOPERATIVE_KNOWLEDGE_CHUNKS.find(c => c.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, error: 'Scheme not found' });
  }
  res.json({ success: true, scheme });
});

// =================================================================
// 5. STATS & ANALYTICS ENDPOINT
// =================================================================
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: queryStats
  });
});

// =================================================================
// 6. GRIEVANCE ASSISTANCE ENDPOINT
// =================================================================
app.post('/api/grievance', (req, res) => {
  const { societyName, issueType, description, language = 'en-IN' } = req.body;

  let portalUrl = 'https://pgportal.gov.in';
  let level = 'District Assistant Registrar of Cooperative Societies (ARCS)';

  if (issueType === 'multi_state') {
    portalUrl = 'https://crcs.gov.in';
    level = 'Central Registrar of Cooperative Societies (CRCS)';
  } else if (issueType === 'crop_insurance') {
    level = 'District Level Grievance Committee (DLGC) headed by District Collector';
  } else if (issueType === 'cooperative_bank') {
    portalUrl = 'https://cms.rbi.org.in';
    level = 'Reserve Bank Integrated Ombudsman (Toll-free 14448)';
  }

  res.json({
    success: true,
    guidance: {
      step1: 'Submit a formal written representation to the society secretary with proof/receipts.',
      step2: `If unresolved within 15-30 days, escalate to: ${level}.`,
      step3: `You can also register your complaint online at: ${portalUrl}.`,
      checklist: [
        'Membership Number / Passbook Copy',
        'Date & details of transaction or refusal',
        'Aadhaar copy for identity verification',
        'Copy of previous written letter to society'
      ]
    }
  });
});

// =================================================================
// 7. VITE OR STATIC ASSET SERVING
// =================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cooperative Sahayak server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
