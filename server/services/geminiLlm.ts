import { GoogleGenAI } from '@google/genai';
import { KnowledgeChunk } from '../knowledgeBase';

interface GenerateAnswerParams {
  query: string;
  language: string; // 'ta-IN' | 'en-IN' | 'hi-IN'
  chunks: KnowledgeChunk[];
}

export interface GeneratedAnswerResponse {
  answer: string;
  language: string;
  groundedInChunks: string[];
}

export async function generateGroundedAnswer({
  query,
  language,
  chunks
}: GenerateAnswerParams): Promise<GeneratedAnswerResponse> {
  const contextText = chunks
    .map((c, i) => `[Document ${i + 1} - ${c.title} (${c.source})]\n${c.content}`)
    .join('\n\n');

  const languageName = language === 'ta-IN' ? 'Tamil (தமிழ்)' : language === 'hi-IN' ? 'Hindi (हिन्दी)' : 'English';

  const systemInstruction = `You are "Cooperative Sahayak", a multilingual cooperative and government-service assistance assistant.
Your mission is to provide clear, simple, trustworthy, and actionable guidance to cooperative society members, farmers, and rural citizens.

CRITICAL RULES:
1. Answer ONLY using the verified information provided in the RETRIEVED KNOWLEDGE CONTEXT below.
2. DO NOT invent facts, benefits, deadlines, fees, documents, or government schemes.
3. DO NOT guarantee eligibility or compensation. Use phrases like "may be eligible", "eligibility depends on State/UT notifications", "as per guidelines".
4. If the retrieved knowledge does not have enough verified information, state honestly:
   - In Tamil: "இந்தக் கேள்விக்கு துல்லியமான அதிகாரப்பூர்வ தகவல் தற்போதைய தரவுத்தளத்தில் போதிய அளவு இல்லை. தயவுசெய்து உங்கள் வட்டார கூட்டுறவு சங்கத்தையோ அல்லது வேளாண்மை உதவி அலுவலரையோ தொடர்பு கொள்ளவும்."
   - In Hindi: "इस प्रश्न के लिए हमारे पास पर्याप्त सत्यापित जानकारी उपलब्ध नहीं है। कृपया अपने निकटतम पैक्स या कृषि कार्यालय से संपर्क करें।"
   - In English: "I don't have enough verified information to answer this accurately. Please check with your local Cooperative Society / PACS or Agriculture Department office."
5. ALWAYS respond in the user's selected language: ${languageName}.
6. Structure the response simply and clearly:
   - Relevant scheme or service
   - Why it helps
   - Who may be eligible
   - What the user should do next (e.g. 72-hour notice, Crop Insurance App, call 14447, visit PACS)
   - Where to apply / contact
   - Important conditions / caveats

RETRIEVED KNOWLEDGE CONTEXT:
${contextText}
`;

  const userPrompt = `User Question: "${query}"
Selected Language: ${languageName} (${language})

Please provide a helpful, clear, and reassuring answer in ${languageName} strictly based on the retrieved context.`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const apiCall = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for grounded accuracy
        }
      });

      // Timeout after 6 seconds to prevent hanging
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
      );

      const response = await Promise.race([apiCall, timeout]);

      const answerText = response.text?.trim();
      if (answerText) {
        return {
          answer: answerText,
          language,
          groundedInChunks: chunks.map(c => c.id)
        };
      }
    } catch (err) {
      console.warn('Gemini API call skipped or timed out, falling back to deterministic grounded response:', err);
    }
  }

  // Deterministic grounded response fallback if Gemini API is unavailable or missing key
  return getDeterministicGroundedResponse(query, language, chunks);
}

function getDeterministicGroundedResponse(query: string, language: string, chunks: KnowledgeChunk[]): GeneratedAnswerResponse {
  const queryLower = query.toLowerCase();
  const isCropDamage = queryLower.includes('rain') || queryLower.includes('மழை') || queryLower.includes('बारिश') || queryLower.includes('damage') || queryLower.includes('பயிர்') || queryLower.includes('फसल');
  const isGrievance = queryLower.includes('grievance') || queryLower.includes('complaint') || queryLower.includes('புகார்') || queryLower.includes('शिकायत') || queryLower.includes('problem');
  const isPacs = queryLower.includes('pacs') || queryLower.includes('பாக்ஸ்') || queryLower.includes('पैक्स') || queryLower.includes('service') || queryLower.includes('சேவை');

  if (language === 'ta-IN') {
    if (isCropDamage) {
      return {
        answer: `**பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY):**

1. **பொருத்தமான திட்டம்:** கனமழை மற்றும் வெள்ளத்தால் பயிர்கள் சேதமடைந்தால் PMFBY திட்டம் உங்களுக்கு நிதி பாதுகாப்பு அளிக்கலாம்.
2. **இது எவ்வாறு உதவும்:** உள்ளூர் இயற்கை சீற்றங்கள் (கனமழை, நீரில் மூழ்குதல்) மற்றும் அறுவடைக்கு பிந்தைய சேதங்களுக்கு மதிப்பீடு செய்யப்பட்டு இழப்பீடு வழங்கப்படும்.
3. **முக்கியமான 72 மணி நேர விதி:** கனமழை அல்லது பயிர் சேதம் ஏற்பட்ட **72 மணி நேரத்திற்குள் (3 நாட்களுக்குள்)** பயிர் காப்பீட்டுச் செயலி (Crop Insurance App), கட்டணமில்லா உதவி எண் **14447**, அல்லது உங்கள் வட்டார தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் (PACS) / வங்கியில் புகார் பதிவு செய்ய வேண்டும்.
4. **தேவையான ஆவணங்கள்:** ஆதார் அட்டை, நில உரிமை ஆவணம் (பட்டா/சிட்டா), விதைப்பு சான்றிதழ், மற்றும் ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்.
5. **முக்கிய குறிப்பு:** உங்கள் பயிரும் நிலப்பரப்பும் இந்த பருவத்திற்கு மாநில அரசால் அறிவிக்கப்பட்டிருக்க (Notified Area & Crop) வேண்டும்.`,
        language: 'ta-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    } else if (isGrievance) {
      return {
        answer: `**கூட்டுறவு சங்க குறைதீர்ப்பு வழிகாட்டுதல்:**

1. **பொருத்தமான வழிமுறை:** உங்கள் தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் (PACS) அல்லது கூட்டுறவு அமைப்பில் குறைபாடுகள் இருப்பின், நீங்கள் முதலில் சங்க தலைவர் அல்லது செயலாளருக்கு எழுத்துப்பூர்வ மனு அளிக்கலாம்.
2. **அடுத்த கட்டம்:** தீர்வு கிடைக்கவில்லை என்றால், மாவட்ட கூட்டுறவு சங்கங்களின் துணைப் பதிவாளர் (ARCS / DRCS) அலுவலகத்தில் மனு அளிக்கலாம்.
3. **மத்திய குறைதீர்ப்பு:** இணையதளம் மூலம் CPGRAMS (pgportal.gov.in) வாயிலாக மத்திய கூட்டுறவு அமைச்சகத்திற்கு 24 மணி நேரமும் ஆன்லைனில் புகார் அளிக்கலாம் (30 நாட்களுக்குள் தீர்வுக்கான காலக்கெடு).
4. **தேவையான விவரங்கள்:** உங்கள் பெயர், உறுப்பினர் எண், சங்கத்தின் பெயர் மற்றும் பிரச்சனையின் தெளிவான விவரங்கள்.`,
        language: 'ta-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    } else {
      const topChunk = chunks[0];
      return {
        answer: `**${topChunk.title}:**

${topChunk.content}

**அடுத்த நடவடிக்கை:** மேலும் விவரங்களை அறிய உங்கள் அருகிலுள்ள தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் (PACS) அல்லது வட்டார வேளாண்மை அலுவலகத்தை அணுகவும்.`,
        language: 'ta-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    }
  } else if (language === 'hi-IN') {
    if (isCropDamage) {
      return {
        answer: `**प्रधानमंत्री फसल बीमा योजना (PMFBY):**

1. **संबंधित योजना:** भारी बारिश और जलभराव के कारण फसल खराब होने पर प्रधानमंत्री फसल बीमा योजना (PMFBY) के तहत सहायता मिल सकती है।
2. **यह कैसे मदद करती है:** भारी बारिश, ओलावृष्टि और बाढ़ जैसी स्थानीय आपदाओं में फसल नुकसान का व्यक्तिगत स्तर पर आंकलन किया जाता है।
3. **सबसे महत्वपूर्ण 72 घंटे का नियम:** नुकसान होने के **72 घंटे के भीतर** किसान ऐप (Crop Insurance App), टोल फ्री नंबर **14447** या अपने नजदीकी बैंक शाखा / प्राथमिक कृषि साख समिति (पैक्स - PACS) में सूचना देना अनिवार्य है।
4. **आवश्यक दस्तावेज:** आधार कार्ड, जमीन की नकल/खसरा-खतौनी, बुवाई प्रमाण पत्र और बैंक पासबुक।
5. **महत्वपूर्ण शर्त:** फसल और क्षेत्र उस मौसम के लिए राज्य सरकार द्वारा अधिसूचित (Notified) होना आवश्यक है।`,
        language: 'hi-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    } else if (isGrievance) {
      return {
        answer: `**सहकारी समिति शिकायत निवारण प्रक्रिया:**

1. **निवारण व्यवस्था:** यदि पैक्स (PACS) या सहकारी समिति से जुड़ी कोई समस्या है, तो सर्वप्रथम समिति सचिव या प्रबंध समिति को लिखित आवेदन दें।
2. **उच्च स्तर पर अपील:** समाधान न होने पर जिले के सहायक निबंधक/उप निबंधक सहकारी समितियां (ARCS/DRCS) के समक्ष शिकायत प्रस्तुत करें।
3. **ऑनलाइन माध्यम:** केंद्र सरकार के सीपीजीआरएएमएस (CPGRAMS - pgportal.gov.in) पोर्टल पर 24 घंटे ऑनलाइन शिकायत दर्ज की जा सकती है, जहां 30 दिनों में निवारण का प्रावधान है।
4. **साथ रखें:** सदस्यता संख्या, समिति का नाम और संबंधित रसीद या दस्तावेज।`,
        language: 'hi-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    } else {
      const topChunk = chunks[0];
      return {
        answer: `**${topChunk.title}:**

${topChunk.content}

**आगे क्या करें:** विस्तृत जानकारी एवं सहायता के लिए अपने स्थानीय पैक्स (PACS) अथवा जिला सहकारी बैंक से संपर्क करें।`,
        language: 'hi-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    }
  } else {
    // English
    if (isCropDamage) {
      return {
        answer: `**Pradhan Mantri Fasal Bima Yojana (PMFBY):**

1. **Relevant Scheme:** PMFBY provides financial protection for crop loss caused by unseasonal heavy rain, flood, or inundation.
2. **Why it may help:** It covers localized calamities and standing crop submersion through localized assessment and claim payouts.
3. **Mandatory 72-Hour Rule:** You must report the crop loss within **72 hours (3 days)** of occurrence via the Crop Insurance App (Farmer App), the national toll-free helpline **14447**, or directly at your local Bank/PACS.
4. **Who may be eligible:** Farmers (both loanee and non-loanee, tenant farmers, and sharecroppers) cultivating notified crops in officially notified areas for the current season.
5. **Required Documents:** Aadhaar card, Land records (RoR/Patta/Khasra), Sowing certificate/declaration, and active Bank account passbook copy.
6. **Important Condition:** Final claim eligibility depends on whether your specific crop and area are notified by your State/UT Government for the season.`,
        language: 'en-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    } else {
      const topChunk = chunks[0];
      return {
        answer: `**${topChunk.title}:**

${topChunk.content}

**Recommended Action:** Visit your local Primary Agricultural Credit Society (PACS) or District Central Cooperative Bank for assistance and enrollment details.`,
        language: 'en-IN',
        groundedInChunks: chunks.map(c => c.id)
      };
    }
  }
}
