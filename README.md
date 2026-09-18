# Cooperative Sahayak (सहकारी सहायक / கூட்டுறவு சகாயக்)
> *"Your Voice. Your Language. Your Rights."*

A multilingual voice-based AI cooperative assistance web application built for cooperative society members, farmers, rural citizens, PACS members, and rural entrepreneurs across India.

Supported Languages:
1. **Tamil (தமிழ் - `ta-IN`)**
2. **English (`en-IN`)**
3. **Hindi (हिन्दी - `hi-IN`)**

---

## 1. Key Features

- **Voice-First Rural Interface**: Large 100px+ microphone button, audio recording, real-time stage progress indicators.
- **Sarvam AI Speech-to-Text**: High-precision Indian language audio transcription for Tamil, English, and Hindi.
- **RAG Knowledge Engine**: 58 verified chunks covering PMFBY crop insurance, PACS multipurpose transformation, cooperative by-laws, KCC loan subvention, grievance redressal portals, and Ministry of Cooperation schemes.
- **Relevance Scoring & Reranking**: Intelligently prioritizes PMFBY and flood/rain protocols for crop damage queries, and suppresses unrelated life insurance or general schemes.
- **Grounded LLM Generation**: Backed by Google Gemini API (`gemini-3.8-flash`) with strict anti-hallucination guardrails and same-language responses.
- **Sarvam AI Text-to-Speech**: Audio playback in the user's selected language with play, pause, replay, and volume controls.
- **Button-Phone / IVR Visual Concept**: "Press 1 for Tamil, Press 2 for English, Press 3 for Hindi" for accessibility.
- **Schemes & Services Directory**: 8 structured categories with detailed eligibility, required documents, and where to apply.
- **Grievance Redressal Assistant**: Guided step-by-step resolution pathways (Society Secretary → District ARCS/DRCS → CPGRAMS / CRCS / Banking Ombudsman).
- **Admin Query Analytics**: Live query monitoring, language distribution metrics, and top requested categories.

---

## 2. System Architecture

```
User Voice Input (Microphone)
      ↓
Sarvam AI Speech-to-Text (saaras:v4)
      ↓
Tamil / English / Hindi Transcript
      ↓
RAG Retriever (Intent Classification + Keyword/Vector Matching)
      ↓
Cooperative Knowledge Base (58 Verified Chunks)
      ↓
Reranked Top Candidates
      ↓
Google Gemini LLM (gemini-3.8-flash with Strict Grounding)
      ↓
Same-Language Structured Answer
      ↓
Sarvam AI Text-to-Speech (bulbul:v1)
      ↓
Audio Playback & Accessible Text Display
```

---

## 3. Environment Variables

Create a `.env` file in the project root:

```bash
# Gemini API Key (for grounded LLM answers)
GEMINI_API_KEY=your_gemini_api_key_here

# Sarvam AI API Key (for Speech-to-Text and Text-to-Speech)
SARVAM_API_KEY=your_sarvam_api_key_here

# Application URL
APP_URL=http://localhost:3000
```

---

## 4. How to Start the Application

### Full-Stack Express + React Development Server
```bash
# Install dependencies
npm install

# Start full-stack server on port 3000
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

---

## 5. Python RAG Backend Setup (Alternative Standalone)

If running the Python ChromaDB backend separately:

```bash
cd cooperative_assistant

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Ingest knowledge into ChromaDB
python ingest.py

# Run RAG test suite
python test_rag.py

# Start FastAPI server
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

---

## 6. Testing Demonstration Scenarios

### Scenario A: Tamil (தமிழ்)
1. Select **1 → தமிழ்** on the language screen (or press key `1`).
2. Click the microphone button and speak:
   > *"கனமழையால் எனது பயிர்கள் சேதமடைந்துவிட்டன. எனக்கு அரசு உதவி கிடைக்குமா?"*
3. The system converts speech to Tamil text via Sarvam STT.
4. RAG retrieves PMFBY guidelines and localized flood/rain provisions.
5. Gemini generates a structured response in Tamil emphasizing:
   - PMFBY coverage
   - Mandatory **72-hour notice** requirement
   - Helpline **14447** & Crop Insurance App
   - Contacting nearest PACS or Bank
6. Audio plays automatically or via the "Play Answer" button.

### Scenario B: English
1. Select **2 → English** (or press key `2`).
2. Click the microphone and ask:
   > *"My crop was damaged because of heavy rain. What government scheme can help me?"*
3. Transcript displays immediately.
4. Verified PMFBY advice is returned in English with required documents and next steps.

### Scenario C: Hindi (हिन्दी)
1. Select **3 → हिन्दी** (or press key `3`).
2. Click the microphone and ask:
   > *"भारी बारिश के कारण मेरी फसल खराब हो गई है। क्या मुझे सरकारी सहायता मिल सकती है?"*
3. Response is generated in Hindi with 72-hour notification protocol and PACS contact guidance.

---

## 7. Knowledge Base Chunks & Adding New Records

The knowledge base contains 58 verified chunks in `server/knowledgeBase.ts` and `src/data/cooperativeKnowledge.ts`.

To add a new verified scheme:
```typescript
{
  id: "chunk_59",
  category: "Agriculture",
  title: "New Scheme Name",
  content: "Verified scheme details...",
  source: "Official Ministry Notification",
  lastVerified: "2026",
  keywords: ["scheme", "tamil keyword", "hindi keyword"]
}
```

---

## 8. Safety & Compliance Rules

- **Zero Hallucination**: Answers are strictly grounded in verified facts.
- **No Unwarranted Promises**: Uses phrases like *"may be eligible"* and *"subject to State/UT seasonal notification"*.
- **Direct Redressal Channels**: Provides real toll-free numbers (14447 for Crop Insurance, 14448 for Banking Ombudsman, 1930 for Cyber Crime).
