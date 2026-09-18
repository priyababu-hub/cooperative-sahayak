import { LanguageCode } from '../types';

export interface TranslationStrings {
  appTitle: string;
  tagline: string;
  navHome: string;
  navAssistant: string;
  navSchemes: string;
  navGrievance: string;
  navHowItWorks: string;
  navAbout: string;
  navAdmin: string;
  selectLanguageTitle: string;
  selectLanguageSubtitle: string;
  heroHeading: string;
  heroSubheading: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  askQuestionPrompt: string;
  tapToSpeak: string;
  listening: string;
  processingSTT: string;
  searchingKnowledge: string;
  generatingAnswer: string;
  answerReady: string;
  youSaid: string;
  assistantAnswer: string;
  playAnswer: string;
  pauseAnswer: string;
  replayAnswer: string;
  volume: string;
  typeYourQuestionPlaceholder: string;
  sendQuestion: string;
  sourcesAndCitations: string;
  disclaimer: string;
  pressKey1: string;
  pressKey2: string;
  pressKey3: string;
  quickQuestionsTitle: string;
  statusSelected: string;
  statusCaptured: string;
  statusTranscribed: string;
  statusSearched: string;
  statusAnswered: string;
  statusAudioReady: string;
  quickDemoQuestions: string[];
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  'ta-IN': {
    appTitle: 'கூட்டுறவு சகாயக்',
    tagline: 'உங்கள் குரல். உங்கள் மொழி. உங்கள் உரிமைகள்.',
    navHome: 'முகப்பு',
    navAssistant: 'குரல் வழிகாட்டி',
    navSchemes: 'திட்டங்கள் & சேவைகள்',
    navGrievance: 'குறைதீர்ப்பு',
    navHowItWorks: 'செயல்படும் முறை',
    navAbout: 'எங்களைப் பற்றி',
    navAdmin: 'நிர்வாக புள்ளிவிவரங்கள்',
    selectLanguageTitle: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    selectLanguageSubtitle: 'எளிய வழிகாட்டலுக்கு தேவையான மொழியை தேர்வு செய்யவும் (விசைப்பலகையில் 1, 2 அல்லது 3 அழுத்தலாம்)',
    heroHeading: 'அரசு மற்றும் கூட்டுறவு சேவைகள், இப்போது உங்கள் தாய்மொழியில்.',
    heroSubheading: 'தமிழ், ஆங்கிலம் அல்லது இந்தியில் உங்கள் கேள்வியை கேளுங்கள். இயல்பாக பேசி எளிய, நம்பகமான வழிகாட்டுதலைப் பெறுங்கள்.',
    heroPrimaryCta: 'குரல் வழிகாட்டலைத் தொடங்குங்கள்',
    heroSecondaryCta: 'திட்டங்களை ஆராயுங்கள்',
    askQuestionPrompt: 'நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?',
    tapToSpeak: 'பேச அழுத்தவும்',
    listening: 'கேட்கிறது... தயவுசெய்து பேசவும்',
    processingSTT: 'உங்கள் குரலை உரையாக மாற்றுகிறது (Sarvam STT)...',
    searchingKnowledge: 'கூட்டுறவு தரவுத்தளத்தில் தேடுகிறது (RAG)...',
    generatingAnswer: 'பொருத்தமான வழிகாட்டலை உருவாக்குகிறது...',
    answerReady: 'பதில் தயாராக உள்ளது',
    youSaid: 'நீங்கள் கேட்டது:',
    assistantAnswer: 'கூட்டுறவு சகாயக் பதில்:',
    playAnswer: 'பதிலைக் கேட்கவும்',
    pauseAnswer: 'நிறுத்தவும்',
    replayAnswer: 'மீண்டும் கேட்கவும்',
    volume: 'ஒலி அளவு',
    typeYourQuestionPlaceholder: 'அல்லது உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...',
    sendQuestion: 'கேள்',
    sourcesAndCitations: 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ ஆதாரங்கள்',
    disclaimer: 'குறிப்பு: இந்த வழிகாட்டல் அரசு வழிகாட்டு நெறிமுறைகளின் அடிப்படையிலானது. தகுதி உங்கள் மாநில பருவ அறிவிப்பைப் பொறுத்தது.',
    pressKey1: 'தமிழுக்கு 1-ஐ அழுத்தவும்',
    pressKey2: 'Press 2 for English',
    pressKey3: 'हिन्दी के लिए 3 दबाएं',
    quickQuestionsTitle: 'மாதிரி கேள்விகள் (கிளிக் செய்து கேட்கலாம்):',
    statusSelected: 'மொழி தேர்ந்தெடுக்கப்பட்டது (தமிழ்)',
    statusCaptured: 'குரல் பதிவு செய்யப்பட்டது',
    statusTranscribed: 'குரல் உரையாக மாற்றப்பட்டது (Sarvam STT)',
    statusSearched: 'கூட்டுறவு தகவல் களஞ்சியத்தில் தேடப்பட்டது',
    statusAnswered: 'பதில் உருவாக்கப்பட்டது',
    statusAudioReady: 'குரல் பதில் தயார்',
    quickDemoQuestions: [
      'கனமழையால் எனது பயிர்கள் சேதமடைந்துவிட்டன. எனக்கு அரசு உதவி கிடைக்குமா?',
      'தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கத்தில் (PACS) உறுப்பினராவது எப்படி?',
      'கூட்டுறவு சங்கத்தில் குறைபாடுகள் இருந்தால் எங்கு புகார் அளிக்க வேண்டும்?',
      'கிசான் கிரெடிட் கார்டு (KCC) 4% வட்டி சலுகை பெறுவது எப்படி?'
    ]
  },
  'en-IN': {
    appTitle: 'Cooperative Sahayak',
    tagline: 'Your Voice. Your Language. Your Rights.',
    navHome: 'Home',
    navAssistant: 'Voice Assistant',
    navSchemes: 'Schemes & Services',
    navGrievance: 'Grievance Redressal',
    navHowItWorks: 'How It Works',
    navAbout: 'About',
    navAdmin: 'Dashboard',
    selectLanguageTitle: 'Choose Your Language',
    selectLanguageSubtitle: 'Select your preferred language for voice assistance (or press 1, 2, or 3 on your keyboard)',
    heroHeading: 'Government & Cooperative Services, Now in Your Language.',
    heroSubheading: 'Ask your question in Tamil, English, or Hindi. Speak naturally and get simple, reliable guidance.',
    heroPrimaryCta: 'Start Voice Assistance',
    heroSecondaryCta: 'Explore Schemes',
    askQuestionPrompt: 'How can we help you today?',
    tapToSpeak: 'Tap to Speak',
    listening: 'Listening... Please speak your question',
    processingSTT: 'Understanding your voice (Sarvam STT)...',
    searchingKnowledge: 'Searching verified knowledge base (RAG)...',
    generatingAnswer: 'Preparing your grounded response...',
    answerReady: 'Guidance Ready',
    youSaid: 'You said:',
    assistantAnswer: 'Cooperative Sahayak Guidance:',
    playAnswer: 'Play Answer',
    pauseAnswer: 'Pause',
    replayAnswer: 'Replay',
    volume: 'Volume',
    typeYourQuestionPlaceholder: 'Or type your question here...',
    sendQuestion: 'Ask',
    sourcesAndCitations: 'Verified Official Sources',
    disclaimer: 'Note: Guidance is strictly grounded in official guidelines. Final eligibility depends on your State/UT seasonal notification.',
    pressKey1: 'Press 1 for Tamil',
    pressKey2: 'Press 2 for English',
    pressKey3: 'Press 3 for Hindi',
    quickQuestionsTitle: 'Common Questions (Click to try):',
    statusSelected: 'Language Selected (English)',
    statusCaptured: 'Voice captured',
    statusTranscribed: 'Speech converted to text (Sarvam STT)',
    statusSearched: 'Knowledge base retrieved',
    statusAnswered: 'Grounded response generated',
    statusAudioReady: 'Voice playback ready',
    quickDemoQuestions: [
      'My crop was damaged because of heavy rain. What government scheme can help me?',
      'How can I become an active member of my local PACS?',
      'Where can I file a complaint against my cooperative society?',
      'How does the Kisan Credit Card (KCC) 4% effective interest rate work?'
    ]
  },
  'hi-IN': {
    appTitle: 'सहकारी सहायक',
    tagline: 'आपकी आवाज। आपकी भाषा। आपके अधिकार।',
    navHome: 'मुख्य पृष्ठ',
    navAssistant: 'आवाज सहायक',
    navSchemes: 'योजनाएं और सेवाएं',
    navGrievance: 'शिकायत निवारण',
    navHowItWorks: 'यह कैसे काम करता है',
    navAbout: 'परिचय',
    navAdmin: 'डैशबोर्ड',
    selectLanguageTitle: 'अपनी भाषा चुनें',
    selectLanguageSubtitle: 'आवाज सहायता के लिए अपनी पसंदीदा भाषा चुनें (कीबोर्ड पर 1, 2 या 3 दबाएं)',
    heroHeading: 'सरकारी एवं सहकारी सेवाएं, अब आपकी अपनी भाषा में।',
    heroSubheading: 'तमिल, अंग्रेजी या हिन्दी में अपना प्रश्न पूछें। स्वाभाविक रूप से बोलें और सरल, प्रामाणिक मार्गदर्शन पाएं।',
    heroPrimaryCta: 'आवाज सहायता शुरू करें',
    heroSecondaryCta: 'योजनाएं देखें',
    askQuestionPrompt: 'आज हम आपकी क्या सहायता कर सकते हैं?',
    tapToSpeak: 'बोलने के लिए दबाएं',
    listening: 'सुन रहे हैं... कृपया अपना प्रश्न बोलें',
    processingSTT: 'आपकी आवाज को समझा जा रहा है (Sarvam STT)...',
    searchingKnowledge: 'सहकारी ज्ञान भंडार में खोज जारी है (RAG)...',
    generatingAnswer: 'सत्यापित उत्तर तैयार किया जा रहा है...',
    answerReady: 'उत्तर तैयार है',
    youSaid: 'आपने पूछा:',
    assistantAnswer: 'सहकारी सहायक का उत्तर:',
    playAnswer: 'उत्तर सुनें',
    pauseAnswer: 'रोकें',
    replayAnswer: 'पुनः सुनें',
    volume: 'आवाज',
    typeYourQuestionPlaceholder: 'या अपना प्रश्न यहां लिखें...',
    sendQuestion: 'पूछें',
    sourcesAndCitations: 'सत्यापित आधिकारिक स्रोत',
    disclaimer: 'ध्यान दें: यह मार्गदर्शन आधिकारिक नियमों पर आधारित है। अंतिम पात्रता आपके राज्य/केंद्र शासित प्रदेश की मौसमी अधिसूचना पर निर्भर करती है।',
    pressKey1: 'தமிழுக்கு 1 அழுத்தவும்',
    pressKey2: 'Press 2 for English',
    pressKey3: 'हिन्दी के लिए 3 दबाएं',
    quickQuestionsTitle: 'सामान्य प्रश्न (पूछने के लिए क्लिक करें):',
    statusSelected: 'भाषा चुनी गई (हिन्दी)',
    statusCaptured: 'आवाज रिकॉर्ड हुई',
    statusTranscribed: 'ध्वनि पाठ में बदली गई (Sarvam STT)',
    statusSearched: 'सहकारी ज्ञान भंडार में खोज पूरी हुई',
    statusAnswered: 'सत्यापित उत्तर तैयार हुआ',
    statusAudioReady: 'आवाज उत्तर तैयार',
    quickDemoQuestions: [
      'भारी बारिश के कारण मेरी फसल खराब हो गई है। क्या मुझे सरकारी सहायता मिल सकती है?',
      'अपनी स्थानीय पैक्स (PACS) का सक्रिय सदस्य कैसे बनें?',
      'सहकारी समिति में अनियमितता होने पर शिकायत कहां दर्ज करें?',
      'किसान क्रेडिट कार्ड (KCC) पर 4% ब्याज दर का लाभ कैसे मिलता है?'
    ]
  }
};
