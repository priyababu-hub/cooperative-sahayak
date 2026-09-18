export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  source: string;
  lastVerified: string;
  keywords: string[];
}

export const COOPERATIVE_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // 1-10: Agriculture & PMFBY Crop Insurance
  {
    id: "chunk_1",
    category: "Agriculture",
    title: "PMFBY (Pradhan Mantri Fasal Bima Yojana) - Objectives & Coverage",
    content: "Pradhan Mantri Fasal Bima Yojana (PMFBY) is the flagship crop insurance scheme of the Government of India designed to provide financial support to farmers suffering crop loss or damage arising from unforeseen natural events. It covers food crops, oilseeds, and annual commercial/horticultural crops. The scheme aims to stabilize farmer income, encourage adoption of modern farming practices, and ensure credit flow to the agricultural sector.",
    source: "Ministry of Agriculture & Farmers Welfare, PMFBY Operational Guidelines",
    lastVerified: "2025-2026",
    keywords: ["pmfby", "crop insurance", "fasal bima", "பயிர் காப்பீடு", "பயிர் நஷ்டம்", "விவசாய திட்டம்", "फसल बीमा", "पीएमएफबीवाई", "प्राकृतिक आपदा", "crop loss", "heavy rain", "flood", "cyclone"]
  },
  {
    id: "chunk_2",
    category: "Agriculture",
    title: "PMFBY - Coverage of Risks: Heavy Rain, Flood, and Inundation",
    content: "PMFBY covers localized calamities including heavy unseasonal rain, inundation/waterlogging, hailstorms, landslides, cloudbursts, and natural fire. When standing crops are submerged or damaged due to heavy rain or flooding, farmers are eligible for localized assessment. Comprehensive risk insurance is also provided for yield losses from sowing to post-harvest (up to 14 days for crops kept in cut and spread condition for drying in the field).",
    source: "PMFBY Localized Calamity and Post-Harvest Loss Provisions",
    lastVerified: "2025-2026",
    keywords: ["heavy rain", "inundation", "flood", "standing crop", "rain damage", "கனமழை", "மழை சேதம்", "வெள்ளம்", "பயிர் சேதம்", "பயிர் நீரில் மூழ்கியது", "भारी बारिश", "बाढ़", "जलभराव", "फसल नुकसान", "बारिश से खराब"]
  },
  {
    id: "chunk_3",
    category: "Agriculture",
    title: "PMFBY - Mandatory 72-Hour Claim Notification Rule",
    content: "For localized calamities such as heavy rain, inundation, hailstorm, or cyclone, the farmer MUST report the crop loss within 72 hours (3 days) of the occurrence. Intimation can be made through the Crop Insurance App (Farmer App), by calling the national toll-free helpline 14447, or directly contacting the nearest Bank branch, Primary Agricultural Credit Society (PACS), Common Service Centre (CSC), or local Agricultural Officer.",
    source: "PMFBY Claim Intimation Protocol",
    lastVerified: "2025-2026",
    keywords: ["72 hours", "claim notification", "intimation", "crop insurance app", "14447", "72 மணி நேரம்", "அறிவிப்பு", "புகார் பதிவு", "ஹெல்ப்லைன்", "72 घंटे", "दावा सूचना", "टोल फ्री", "शिकायत", "सूचना देना"]
  },
  {
    id: "chunk_4",
    category: "Agriculture",
    title: "PMFBY - Farmer Premium Rates",
    content: "Under PMFBY, the farmer pays a very minimal and subsidized premium: 2.0% of the sum insured for all Kharif crops (food and oilseeds); 1.5% of the sum insured for all Rabi crops (food and oilseeds); and 5.0% for annual commercial and horticultural crops. The balance premium is shared equally (50:50) by the Central Government and State Governments (90:10 for North Eastern states).",
    source: "Ministry of Agriculture & Farmers Welfare, PMFBY Premium Structure",
    lastVerified: "2025-2026",
    keywords: ["premium rate", "kharif 2%", "rabi 1.5%", "horticultural 5%", "மானியம்", "பிரிமியம் தொகை", "ப்ரீமியம்", "प्रीमियम दर", "खरीफ", "रबी", "कम प्रीमियम"]
  },
  {
    id: "chunk_5",
    category: "Agriculture",
    title: "PMFBY - Eligibility & Required Documents",
    content: "All farmers growing notified crops in notified areas are eligible, including loanee farmers and non-loanee farmers, tenant farmers, and sharecroppers. Required documents include: 1) Aadhaar Card or authorized ID, 2) Land ownership records (RoR, Patta/Chitta/Khasra/Khatauni), 3) Sowing Certificate or self-declaration of crop sown, 4) Active Bank Account Passbook copy (linked with Aadhaar), and 5) Tenancy agreement/NOC if cultivating leased land.",
    source: "PMFBY Enrollment Guidelines",
    lastVerified: "2025-2026",
    keywords: ["eligibility", "documents required", "patta", "chitta", "khasra", "aadhaar", "passbook", "தேவையான ஆவணங்கள்", "பட்டா", "சிட்டா", "ஆதார்", "வங்கி புத்தகம்", "आवश्यक दस्तावेज", "पात्रता", "आधार कार्ड", "जमीन के कागज", "बैंक पासबुक"]
  },
  {
    id: "chunk_6",
    category: "Agriculture",
    title: "PMFBY - Notified Crops and Notified Areas Principle",
    content: "PMFBY operates on an 'Area Approach' basis. A Defined Area (village, village panchayat, mandal, or taluk) is notified by the State Government for specified crops. Insurance coverage and yield assessment are applicable only if both the crop and the geographic area have been officially notified by the respective State or Union Territory Government for that specific season.",
    source: "State Department of Agriculture Seasonal Notifications",
    lastVerified: "2025-2026",
    keywords: ["notified crops", "notified area", "area approach", "state notification", "அறிவிக்கப்பட்ட பயிர்", "அறிவிக்கப்பட்ட பகுதி", "நோட்டிபைட் கிராப்", "अधिसूचित फसल", "अधिसूचित क्षेत्र", "राज्य अधिसूचना"]
  },
  {
    id: "chunk_7",
    category: "Agriculture",
    title: "PMFBY - Where and How to Apply / Enroll",
    content: "Farmers can enroll in PMFBY through multiple official channels: 1) Nearest Primary Agricultural Credit Society (PACS), 2) District Central Cooperative Bank or Commercial Bank branch where they hold an agricultural account, 3) Village Common Service Centre (CSC), 4) State Agriculture Department offices, or 5) Directly online through the National Crop Insurance Portal (www.pmfby.gov.in) before the seasonal cut-off date.",
    source: "National Crop Insurance Portal (NCIP)",
    lastVerified: "2025-2026",
    keywords: ["how to apply", "where to apply", "pmfby portal", "csc", "pacs", "விண்ணப்பிப்பது எப்படி", "எங்கு விண்ணப்பிப்பது", "விண்ணப்ப முறை", "आवेदन कैसे करें", "आवेदन केंद्र", "सीएससी", "पैक्स", "पोर्टल"]
  },
  {
    id: "chunk_8",
    category: "Agriculture",
    title: "Restructured Weather Based Crop Insurance Scheme (RWBCIS)",
    content: "RWBCIS provides insurance protection against adverse weather parameters such as deficit or excess rainfall, prolonged dry spells, extreme temperature fluctuations, frost, and high wind speed. Unlike PMFBY which relies on crop cutting experiments (CCEs) for yield estimation, RWBCIS triggers payouts based on data recorded by Reference Weather Stations (RWS) and Automatic Weather Stations (AWS).",
    source: "Ministry of Agriculture, RWBCIS Guidelines",
    lastVerified: "2025-2026",
    keywords: ["rwbcis", "weather based crop insurance", "rainfall deficit", "frost", "வானிலை பயிர் காப்பீடு", "மழை அளவு", "मौसम आधारित फसल बीमा", "मौसम केंद्र"]
  },
  {
    id: "chunk_9",
    category: "Agriculture",
    title: "Kisan Credit Card (KCC) Automatic Crop Insurance Linkage",
    content: "Farmers who avail crop seasonal loans through Kisan Credit Card (KCC) from cooperative banks or commercial banks have their notified crops covered under PMFBY. Since the 2020 revamp, enrollment is voluntary for loanee farmers; however, farmers who wish to opt out must submit a written opt-out declaration to their bank at least 7 days before the seasonal cut-off date.",
    source: "Reserve Bank of India & Ministry of Agriculture Guidelines",
    lastVerified: "2025-2026",
    keywords: ["kcc insurance", "voluntary enrollment", "opt out", "loanee farmer", "கிசான் கிரெடிட் கார்டு", "பயிர் கடன் காப்பீடு", "केसीसी", "ऋणी किसान", "स्वैच्छिक"]
  },
  {
    id: "chunk_10",
    category: "Agriculture",
    title: "State Disaster Response Fund (SDRF) vs PMFBY Assistance",
    content: "In cases of widespread natural disasters, input subsidy / relief assistance may be provided through the State Disaster Response Fund (SDRF) and National Disaster Response Fund (NDRF) managed by Revenue and Disaster Management Departments. SDRF assistance provides immediate humanitarian relief for severe crop loss (33% and above), which functions as non-insurance government calamity assistance alongside PMFBY claims.",
    source: "Ministry of Home Affairs & State Revenue Departments",
    lastVerified: "2025-2026",
    keywords: ["sdrf", "ndrf", "disaster relief", "input subsidy", "பேரிடர் நிவாரணம்", "அரசு இழப்பீடு", "மானியம்", "आपदा राहत", "एसडीआरएफ", "मुआवजा"]
  },

  // 11-18: PACS (Primary Agricultural Credit Societies)
  {
    id: "chunk_11",
    category: "PACS Services",
    title: "Model Bye-laws for PACS - Multipurpose Transformation",
    content: "The Ministry of Cooperation has framed Model Bye-laws to enable Primary Agricultural Credit Societies (PACS) to diversify beyond short-term credit into vibrant multipurpose economic entities. PACS can now engage in over 25 diversified business activities including dairy, fisheries, setting up storage godowns, LPG/petrol dealerships, fertilizer & seed distribution, and providing drone spraying services.",
    source: "Ministry of Cooperation, Government of India - Model Bye-laws for PACS",
    lastVerified: "2025-2026",
    keywords: ["model bye-laws", "multipurpose pacs", "pacs diversification", "துணை விதிகள்", "பாக்ஸ் கூட்டுறவு சங்கம்", "மாதிரி துணைவிதிகள்", "मॉडल उप-नियम", "पैक्स", "बहुउद्देशीय पैक्स", "सहकारिता मंत्रालय"]
  },
  {
    id: "chunk_12",
    category: "PACS Services",
    title: "Computerization of PACS",
    content: "A centrally sponsored project of ₹2,516 Crore is underway for the computerization of approximately 63,000 functional PACS across all States and UTs. It brings PACS onto a unified Enterprise Resource Planning (ERP) cloud platform, linking them directly with District Central Cooperative Banks (DCCBs) and State Cooperative Banks (StCBs). This ensures transparency, faster loan sanctions, and direct online auditing.",
    source: "National Cooperative Computerization Project",
    lastVerified: "2025-2026",
    keywords: ["pacs computerization", "erp software", "transparency", "கணினிமயமாக்கல்", "டிஜிட்டல் பாக்ஸ்", "ஆன்லைன் கணக்கு", "पैक्स कंप्यूटरीकरण", "ईआरपी सॉफ्टवेयर", "डिजिटल पैक्स"]
  },
  {
    id: "chunk_13",
    category: "PACS Services",
    title: "PACS Operating as Common Service Centres (CSCs)",
    content: "PACS have been onboarded to function as Common Service Centres (CSCs). Rural citizens can access over 300 e-services directly at their local PACS, including Aadhaar card updates, PAN card generation, PM-KISAN e-KYC, utility bill payments, train/bus ticket bookings, birth/death certificates, and government scheme enrollments, eliminating the need to travel to distant towns.",
    source: "Ministry of Cooperation & CSC e-Governance Services India",
    lastVerified: "2025-2026",
    keywords: ["pacs as csc", "common service centre", "e-services", "aadhaar", "pan card", "பொது சேவை மையம்", "பாக்ஸ் இ-சேவை", "மின் சேவை", "पैक्स सीएससी", "डिजिटल सेवा", "आधार अपडेट", "पैन कार्ड"]
  },
  {
    id: "chunk_14",
    category: "PACS Services",
    title: "PACS Fertilizer, Seed, and Pesticide Distribution",
    content: "PACS serve as the primary grassroots retail network for subsidized chemical and nano fertilizers (Nano Urea and Nano DAP produced by IFFCO and KRIBHCO), certified seeds, and bio-fertilizers. Members can obtain inputs on credit or spot payment, supported by soil testing guidance and quality assurances overseen by State Agriculture and Cooperation Departments.",
    source: "IFFCO / KRIBHCO & Cooperative Marketing Federations",
    lastVerified: "2025-2026",
    keywords: ["fertilizer distribution", "nano urea", "certified seeds", "iffco", "உரம் விநியோகம்", "நானோ யூரியா", "விதை விநியோகம்", "खाद वितरण", "नैनो यूरिया", "प्रमाणित बीज", "कीटनाशक"]
  },
  {
    id: "chunk_15",
    category: "PACS Services",
    title: "World's Largest Grain Storage Plan in Cooperative Sector",
    content: "The Government of India has launched a pilot and nationwide rollout for creating decentralized grain storage capacity at the PACS level under the 'World's Largest Grain Storage Plan'. Under this scheme, PACS are assisted in setting up custom godowns (500 MT to 2000 MT), custom hiring centres, and processing units through convergence of Agriculture Infrastructure Fund (AIF) and AMI schemes.",
    source: "Ministry of Cooperation Inter-Ministerial Committee on Storage",
    lastVerified: "2025-2026",
    keywords: ["grain storage", "godown", "decentralized storage", "தானிய சேமிப்பு கிடங்கு", "கிடங்கு திட்டம்", "அनाज भंडारण", "पैक्स गोदाम", "अनाज भंडारण योजना"]
  },
  {
    id: "chunk_16",
    category: "PACS Services",
    title: "Jan Aushadhi Kendras at PACS for Affordable Medicines",
    content: "PACS are authorized to open Pradhan Mantri Bhartiya Janaushadhi Kendras (PMBJK) at their premises. These pharmacies dispense quality generic medicines at prices 50% to 90% cheaper than branded market medicines, delivering affordable healthcare, essential pharmaceuticals, and surgical items directly to rural families.",
    source: "Pharmaceuticals & Medical Devices Bureau of India (PMBI) & Ministry of Cooperation",
    lastVerified: "2025-2026",
    keywords: ["jan aushadhi", "generic medicine", "affordable health", "ஜன் ஔஷதி", "குறைந்த விலை மருந்து", "மருந்து கடை", "जन औषधि केंद्र", "सस्ती दवाइयां", "जेनेरिक दवा"]
  },
  {
    id: "chunk_17",
    category: "PACS Services",
    title: "PACS Petrol/Diesel Pumps and LPG Dealerships",
    content: "In alignment with the revised Model Bye-laws, PACS are given priority quota and eligibility to operate rural retail outlets for petrol/diesel and LPG distribution agencies in partnership with Public Sector Oil Marketing Companies (IOCL, BPCL, HPCL). This creates steady income streams for societies and ensures reliable fuel supply for village machinery.",
    source: "Ministry of Petroleum & Natural Gas & Ministry of Cooperation",
    lastVerified: "2025-2026",
    keywords: ["petrol pump", "lpg dealership", "fuel retail", "பெட்ரோல் பங்க்", "எரிவாயு சிலிண்டர்", "पेट्रोल पंप", "एलपीजी एजेंसी", "डीजल"]
  },
  {
    id: "chunk_18",
    category: "PACS Services",
    title: "Micro-ATMs and Doorstep Banking through PACS",
    content: "PACS Secretaries and designated Village Cooperative Correspondents are equipped with Micro-ATM handheld devices and biometric scanners (AePS). Members and rural residents can deposit cash, withdraw funds, check bank balances, and transfer funds without needing to visit bank branches located miles away in urban centres.",
    source: "NABARD & National Payments Corporation of India (NPCI)",
    lastVerified: "2025-2026",
    keywords: ["micro-atm", "aeps", "doorstep banking", "பணம் எடுத்தல்", "மைக்ரோ ஏடிஎம்", "பயோமெட்ரிக் பணம்", "माइक्रो एटीएम", "घर पर बैंकिंग", "निकासी"]
  },

  // 19-27: Cooperative Laws, By-laws & Governance
  {
    id: "chunk_19",
    category: "Laws & By-laws",
    title: "Cooperative Principles and Legal Foundation",
    content: "Cooperative societies are autonomous associations of persons united voluntarily to meet their common economic, social, and cultural needs through a jointly-owned and democratically-controlled enterprise. Cooperatives operate under the seven Rochdale principles: voluntary and open membership, democratic member control, member economic participation, autonomy and independence, education and training, cooperation among cooperatives, and concern for community.",
    source: "International Co-operative Alliance & Constitution of India (Part IXB)",
    lastVerified: "2025-2026",
    keywords: ["cooperative principles", "part ixb", "democratic control", "கூட்டுறவு கோட்பாடுகள்", "ஜனநாயக கட்டுப்பாடு", "सहकारी सिद्धांत", "सहकारिता नियम", "स्वायत्तता"]
  },
  {
    id: "chunk_20",
    category: "Laws & By-laws",
    title: "Multi-State Co-operative Societies (MSCS) Amendment Act 2023",
    content: "The MSCS Amendment Act 2023 introduced significant governance reforms for multi-state cooperatives: 1) Establishment of the 'Co-operative Election Authority' to conduct fair and timely elections, 2) Creation of the 'Co-operative Ombudsman' for impartial grievance redressal, 3) Mandatory reservation for women and SC/ST members on the Board of Directors, and 4) Strengthened auditing standards by independent panels.",
    source: "The Multi-State Co-operative Societies (Amendment) Act, 2023",
    lastVerified: "2025-2026",
    keywords: ["mscs act", "multi-state cooperative", "cooperative election authority", "கூட்டுறவு சட்டம்", "தேர்தல் ஆணையம்", "மத்திய கூட்டுறவு சட்டம்", "एमएससीएस एक्ट 2023", "बहु-राज्य सहकारी", "चुनाव प्राधिकरण"]
  },
  {
    id: "chunk_21",
    category: "Laws & By-laws",
    title: "Member Rights: One Member One Vote and Admission",
    content: "Under cooperative law, every active member is entitled to one vote in the affairs of the society, irrespective of the number of shares held ('One Member, One Vote'). No proxy voting is allowed in general meetings. An individual residing within the society's area of operation who qualifies under the by-laws cannot be denied membership arbitrarily.",
    source: "State Cooperative Societies Acts & Model By-laws",
    lastVerified: "2025-2026",
    keywords: ["one member one vote", "voting rights", "membership admission", "வாக்குரிமை", "ஒரு உறுப்பினர் ஒரு வாக்கு", "உறுப்பினர் உரிமை", "एक सदस्य एक वोट", "मतदान अधिकार", "सदस्यता नियम"]
  },
  {
    id: "chunk_22",
    category: "Laws & By-laws",
    title: "Active Member Definition & Attendance Requirements",
    content: "To vote and contest elections, a person must qualify as an 'Active Member'. Criteria typically mandate: 1) Attending at least a minimum number of Annual General Meetings (AGMs) within a prescribed period (e.g., at least 3 out of 5 meetings), and 2) Utilizing minimum prescribed economic services/products of the cooperative society during the financial year.",
    source: "MSCS Act Section 20 & State Cooperative Rules",
    lastVerified: "2025-2026",
    keywords: ["active member", "general body meeting", "agm attendance", "செயல்பாட்டு உறுப்பினர்", "பொதுக்குழு கூட்டம்", "சங்க கூட்டம்", "सक्रिय सदस्य", "साधारण सभा", "बैठक उपस्थिति"]
  },
  {
    id: "chunk_23",
    category: "Laws & By-laws",
    title: "Managing Committee Elections and Tenure",
    content: "The Board of Directors or Managing Committee of a cooperative society is elected democratically by the General Body. The standard term of office for elected board members is 5 years from the date of election. Elections must be conducted before the expiry of the committee's tenure. If the board fails to hold timely elections, the Registrar may appoint an administrator to conduct elections.",
    source: "Constitution 97th Amendment & State Cooperative Acts",
    lastVerified: "2025-2026",
    keywords: ["managing committee", "board elections", "5 year tenure", "நிர்வாக குழு தேர்தல்", "பதவிக்காலம்", "மேலாண்மை குழு", "प्रबंध समिति", "चुनाव", "5 साल का कार्यकाल"]
  },
  {
    id: "chunk_24",
    category: "Laws & By-laws",
    title: "Inspection of Cooperative Books and Member Transparency",
    content: "Every member has a legal right to inspect the books of accounts, register of members, minutes of general meetings, annual audit report, and by-laws of their cooperative society during working hours. Societies are obligated to provide copies of documents upon payment of nominal fees prescribed in the by-laws.",
    source: "Cooperative Governance & Member Rights Charters",
    lastVerified: "2025-2026",
    keywords: ["inspection of books", "audit report", "member rights", "கணக்கு புத்தகங்கள் ஆய்வு", "தணிக்கை அறிக்கை", "உரிமைகள்", "दस्तावेजों का निरीक्षण", "ऑडिट रिपोर्ट", "पारदर्शिता"]
  },
  {
    id: "chunk_25",
    category: "Laws & By-laws",
    title: "Expulsion of Members and Due Process",
    content: "A cooperative member can only be expelled for acts detrimental to the interests or reputation of the society. Expulsion requires a resolution passed by a special majority (typically 2/3rds or 3/4ths of members present and voting) at a specially convened General Meeting after giving the member reasonable opportunity to show cause. The expulsion takes effect only upon approval by the Registrar.",
    source: "State Cooperative Societies Act & Rules",
    lastVerified: "2025-2026",
    keywords: ["expulsion of member", "show cause notice", "registrar approval", "உறுப்பினர் நீக்கம்", "காரணம் காட்டும் நோட்டீஸ்", "பதிவாளர் ஒப்புதல்", "सदस्य निष्कासन", "कारण बताओ नोटिस", "पंजीयक"]
  },
  {
    id: "chunk_26",
    category: "Laws & By-laws",
    title: "Share Capital, Maximum Shareholding, and Dividends",
    content: "To prevent concentration of control, cooperative law restricts any single individual member from holding more than a specified ceiling of the total share capital (typically 20% or ₹1,00,000, whichever is less). Dividends on paid-up share capital are subject to statutory ceilings (usually capped at 12% to 15% per annum) after mandatory allocation to the Reserve Fund and Cooperative Education Fund.",
    source: "Cooperative Financial Prudential Regulations",
    lastVerified: "2025-2026",
    keywords: ["share capital", "dividend cap", "reserve fund", "பங்கு மூலதனம்", "ஈவுத்தொகை வரம்பு", "ரிசர்வ் நிதி", "शेयर पूंजी", "लाभांश सीमा", "रिजर्व फंड"]
  },
  {
    id: "chunk_27",
    category: "Cooperative Services",
    title: "Ministry of Cooperation - 'Sahakar Se Samriddhi' Vision",
    content: "The Ministry of Cooperation was created in July 2021 with the vision 'Sahakar Se Samriddhi' (Prosperity through Cooperation). Its initiatives include PACS computerization, model by-laws for multipurpose societies, creation of new national-level cooperatives for exports, organics, and seeds, formulation of a National Cooperative Policy, and building the National Cooperative Database.",
    source: "Ministry of Cooperation, Government of India Official Portal",
    lastVerified: "2025-2026",
    keywords: ["ministry of cooperation", "sahakar se samriddhi", "cooperation initiatives", "கூட்டுறவு அமைச்சகம்", "சககார் சே சம்ரிதி", "மத்திய கூட்டுறவு திட்டம்", "सहकारिता मंत्रालय", "सहकार से समृद्धि", "सहकारी विकास"]
  },

  // 28-35: Grievance Redressal Mechanisms
  {
    id: "chunk_28",
    category: "Grievance Redressal",
    title: "How to File a Grievance Against a Primary Society / PACS",
    content: "If a member has a complaint regarding denied membership, refusal of crop loan, irregularities in fertilizer distribution, or misbehavior at a PACS, they can: 1) Submit a written representation to the President/Secretary of the Society, 2) If unresolved, petition the Circle Deputy Registrar / Assistant Registrar of Cooperative Societies (ARCS/DRCS) of the district, or 3) File through the State Government's Citizen Grievance Portal.",
    source: "State Registrar of Cooperative Societies (RCS) Grievance Framework",
    lastVerified: "2025-2026",
    keywords: ["grievance against pacs", "arcs", "drcs", "society complaint", "கூட்டுறவு சங்கம் புகார்", "துணை பதிவாளர் புகார்", "மனு தாக்கல்", "पैक्स शिकायत", "सहायक पंजीयक", "शिकायत निवारण", "सोसायटी विवाद"]
  },
  {
    id: "chunk_29",
    category: "Grievance Redressal",
    title: "Central Registrar of Cooperative Societies (CRCS) Portal",
    content: "For multi-state cooperative societies operating across more than one State, grievances are addressed through the CRCS Grievance Portal (crcs.gov.in). Members can register complaints regarding non-refund of deposits, delayed maturity claims, fraudulent practices, or governance issues directly online and track the investigation status with a unique grievance registration number.",
    source: "Office of the Central Registrar of Cooperative Societies, New Delhi",
    lastVerified: "2025-2026",
    keywords: ["crcs portal", "multi-state grievance", "deposit non-refund", "சிஆர்சிஎஸ் போர்டல்", "டெபாசிட் திரும்ப பெறாமை", "மத்திய பதிவாளர் புகார்", "सीआरसीएस पोर्टल", "जमा वापसी नहीं", "केंद्रीय पंजीयक"]
  },
  {
    id: "chunk_30",
    category: "Grievance Redressal",
    title: "CPGRAMS Portal for Cooperative Complaints",
    content: "The Centralized Public Grievance Redress and Monitoring System (CPGRAMS - pgportal.gov.in) connects directly to the Ministry of Cooperation. Any citizen can lodge an online complaint 24x7. The portal generates a grievance registration number, automatically routes the complaint to the nodal officer, and mandates resolution within 30 days with a clear right of appeal.",
    source: "Department of Administrative Reforms & Public Grievances (DARPG)",
    lastVerified: "2025-2026",
    keywords: ["cpgrams", "pgportal", "30 days resolution", "மத்திய மக்கள் குறைதீர்ப்பு போர்டல்", "ஆன்லைன் புகார்", "30 நாள் தீர்வு", "सीपीजीआरएएमएस", "पीजी पोर्टल", "ऑनलाइन शिकायत", "30 दिन में निवारण"]
  },
  {
    id: "chunk_31",
    category: "Grievance Redressal",
    title: "Cooperative Arbitration and Cooperative Tribunals",
    content: "Disputes touching the constitution, management, or business of a cooperative society are adjudicated under cooperative law rather than standard civil courts. Disputes are referred to the Registrar for arbitration under Section 90 of State Acts (or Section 84 of MSCS Act). Appeals against the Registrar's arbitration award lie before the State Cooperative Tribunal.",
    source: "Cooperative Societies Dispute Resolution Rules",
    lastVerified: "2025-2026",
    keywords: ["arbitration", "cooperative tribunal", "dispute resolution", "கூட்டுறவு தீர்ப்பாயம்", "மத்தியஸ்தம்", "சட்ட விவாதம்", "सहकारी न्यायाधिकरण", "विवाद समाधान", "मध्यस्थता"]
  },
  {
    id: "chunk_32",
    category: "Grievance Redressal",
    title: "RBI Banking Ombudsman for Cooperative Banks",
    content: "Customers having unresolved complaints against Urban Cooperative Banks (UCBs) or State/Central Cooperative Banks regarding unauthorized transactions, ATM failures, excessive interest charges, or deficiency in service can approach the Reserve Bank - Integrated Ombudsman Scheme (RB-IOS). Complaints can be filed at cms.rbi.org.in or toll-free number 14448 if the bank fails to resolve within 30 days.",
    source: "Reserve Bank of India Integrated Ombudsman Scheme",
    lastVerified: "2025-2026",
    keywords: ["banking ombudsman", "rbi ombudsman", "cooperative bank complaint", "வங்கி குறைதீர்ப்பாளர்", "ஆர்பிஐ புகார்", "14448", "बैंकिंग लोकपाल", "आरबीआई शिकायत", "बैंक धोखाधड़ी"]
  },
  {
    id: "chunk_33",
    category: "Grievance Redressal",
    title: "PMFBY Grievance Redressal Committees (DLGC and SLGC)",
    content: "For crop insurance grievances, District Level Grievance Committees (DLGC) headed by the District Collector/District Magistrate resolve farmer disputes regarding claim rejections, delayed settlements, or incorrect area notifications. If dissatisfied with DLGC, the farmer can appeal to the State Level Grievance Committee (SLGC) headed by the Agriculture Production Commissioner/Secretary.",
    source: "PMFBY Operational Guidelines - Grievance Redressal Mechanism",
    lastVerified: "2025-2026",
    keywords: ["dlgc", "slgc", "crop insurance grievance", "district collector", "பயிர் காப்பீடு புகார் குழு", "மாவட்ட ஆட்சியர் மேல்முறையீடு", "फसल बीमा शिकायत", "जिला शिकायत समिति"]
  },
  {
    id: "chunk_34",
    category: "Grievance Redressal",
    title: "Checklist for Submitting an Effective Cooperative Grievance",
    content: "When submitting a grievance, always provide: 1) Full Name, Aadhaar, and Village/Panchayat, 2) Name and registration number of the Cooperative Society or PACS, 3) Membership number or Bank Account number, 4) Clear chronological summary of the issue, 5) Copies of supporting receipts, passbook entries, or loan sanction letters, and 6) Proof of earlier communication with the society.",
    source: "Public Grievance Redressal Protocol Guide",
    lastVerified: "2025-2026",
    keywords: ["grievance checklist", "documents for complaint", "receipts", "புகார் ஆவணங்கள்", "ஆதாரங்கள்", "உறுப்பினர் எண்", "शिकायत दस्तावेज", "रसीद", "सदस्य संख्या"]
  },
  {
    id: "chunk_35",
    category: "Grievance Redressal",
    title: "Whistleblower and Inspection Provisions against Cooperative Mismanagement",
    content: "Members representing not less than 1/10th of total membership (or 1/3rd of the board) can petition the Registrar of Cooperative Societies to initiate a formal statutory inquiry or inspection into the financial affairs and working of a society under Section 81/82 of State Acts. The Registrar has legal power to inspect accounts and summon records.",
    source: "Statutory Inspection Powers under Cooperative Law",
    lastVerified: "2025-2026",
    keywords: ["statutory inspection", "inquiry", "mismanagement", "கூட்டுறவு தணிக்கை விசாரணை", "முறைகேடு புகார்", "सहकारी जांच", "पंजीयक जांच", "गबन शिकायत"]
  },

  // 36-44: Financial Literacy & Rural Banking
  {
    id: "chunk_36",
    category: "Financial Literacy",
    title: "Kisan Credit Card (KCC) - Scale of Finance and Interest Subvention",
    content: "KCC provides affordable crop credit to farmers. The benchmark interest rate is 9%. The Government of India provides a 2% Interest Subvention, reducing it to 7%. For farmers who repay on or before the due date, an additional 3% Prompt Repayment Incentive (PRI) is given, making the effective interest rate only 4% per annum for crop loans up to ₹3,00,000.",
    source: "Ministry of Agriculture & NABARD KCC Guidelines",
    lastVerified: "2025-2026",
    keywords: ["kcc", "kisan credit card", "interest subvention", "4 percent interest", "கிசான் கிரெடிட் கார்டு", "4% வட்டி", "பயிர் கடன் வட்டி மானியம்", "किसान क्रेडिट कार्ड", "4 प्रतिशत ब्याज", "ब्याज छूट"]
  },
  {
    id: "chunk_37",
    category: "Financial Literacy",
    title: "KCC for Animal Husbandry and Dairy Farmers",
    content: "KCC credit facilities have been extended to Animal Husbandry, Dairy, and Fisheries farmers for their working capital requirements. Loans up to ₹2,00,000 are eligible for the 2% interest subvention and 3% prompt repayment incentive (effective 4% rate). For combined crop and animal husbandry loans, the overall subsidized limit is ₹3,00,000.",
    source: "Department of Animal Husbandry & Dairying (DAHD) & RBI",
    lastVerified: "2025-2026",
    keywords: ["kcc dairy", "animal husbandry kcc", "fisheries loan", "கால்நடை கடன்", "பால் பண்ணை கடன்", "கிசான் அட்டை", "पशुपालन केसीसी", "डेयरी लोन", "मत्स्य पालन"]
  },
  {
    id: "chunk_38",
    category: "Financial Literacy",
    title: "DICGC Deposit Insurance Protection up to ₹5 Lakh in Cooperative Banks",
    content: "Deposits held in all licensed State Cooperative Banks, District Central Cooperative Banks (DCCBs), and Urban Cooperative Banks are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly-owned subsidiary of the RBI. Each depositor is insured up to a maximum of ₹5,00,000 (principal + interest) across all accounts in the same bank.",
    source: "Deposit Insurance and Credit Guarantee Corporation (DICGC) Act",
    lastVerified: "2025-2026",
    keywords: ["dicgc", "deposit insurance", "5 lakh guarantee", "வைப்பு நிதி பாதுகாப்பு", "ரூபாய் 5 லட்சம் காப்பீடு", "வங்கி டெபாசிட்", "डीआईसीजीसी", "5 लाख बीमा", "जमा सुरक्षा"]
  },
  {
    id: "chunk_39",
    category: "Financial Literacy",
    title: "RuPay Kisan Cards and AePS Digital Transactions",
    content: "Cooperative banks issue RuPay Kisan debit cards linked to KCC accounts, enabling farmers to withdraw cash at any ATM or purchase seeds and fertilizers at PoS machines in PACS. Aadhaar Enabled Payment System (AePS) allows biometric withdrawals using Aadhaar and fingerprint, eliminating the need to carry physical cards or remember PINs.",
    source: "National Payments Corporation of India (NPCI) Rural Banking Guidelines",
    lastVerified: "2025-2026",
    keywords: ["rupay kisan card", "aeps", "digital payment", "ரூபே கிசான் கார்டு", "ஏடிஎம் கார்டு", "டிஜிட்டல் பரிவர்த்தனை", "रुपये किसान कार्ड", "एईपीएस", "डिजिटल भुगतान"]
  },
  {
    id: "chunk_40",
    category: "Financial Literacy",
    title: "Safe Banking Practices & Protecting Against Rural Fraud",
    content: "Rural bank customers and cooperative members must follow strict financial security practices: 1) Never share OTP, ATM PIN, or UPI PIN with anyone, including bank employees or PACS staff, 2) No government scheme requires sending money upfront to receive benefits, 3) Do not sign blank cheques or promissory notes, and 4) Report any cyber fraud immediately by calling 1930 (National Cyber Crime Helpline).",
    source: "Reserve Bank of India Financial Literacy & Cyber Crime Helpline 1930",
    lastVerified: "2025-2026",
    keywords: ["safe banking", "cyber fraud", "1930 helpline", "otp safety", "வங்கி பாதுகாப்பு", "சைபர் கிரைம் 1930", "ஓடிபி பகிர வேண்டாம்", "सुरक्षित बैंकिंग", "धोखाधड़ी से बचाव", "साइबर हेल्पलाइन 1930"]
  },
  {
    id: "chunk_41",
    category: "Financial Literacy",
    title: "Self Help Groups (SHGs) and Cooperative Linkage",
    content: "Cooperative societies actively facilitate Self Help Group (SHG) bank linkage, particularly under the Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM). Women's SHGs can access collateral-free credit up to ₹20 lakh with interest subvention down to 7% p.a., fostering collective savings, micro-enterprises, and financial independence.",
    source: "Ministry of Rural Development, DAY-NRLM Guidelines",
    lastVerified: "2025-2026",
    keywords: ["shg linkage", "self help group", "women cooperative", "சுய உதவி குழு", "மகளிர் கூட்டுறவு", "குழு கடன்", "स्वयं सहायता समूह", "एसएचजी", "महिला समूह"]
  },
  {
    id: "chunk_42",
    category: "Financial Literacy",
    title: "Agriculture Infrastructure Fund (AIF) at 3% Interest Subvention",
    content: "The Agriculture Infrastructure Fund (AIF) is a financing facility providing medium-to-long term debt for post-harvest management infrastructure and community farming assets. PACS, cooperatives, and individual farmers get a 3% per annum interest subvention for loans up to ₹2 Crore for a maximum tenure of 7 years, along with credit guarantee coverage under CGTMSE.",
    source: "Ministry of Agriculture & Farmers Welfare, AIF Portal",
    lastVerified: "2025-2026",
    keywords: ["aif", "agriculture infrastructure fund", "3% interest subvention", "வேளாண் உள்கட்டமைப்பு நிதி", "சேமிப்பு கடன்", "कृषि अवसंरचना कोष", "एआईएफ", "3 प्रतिशत छूट"]
  },
  {
    id: "chunk_43",
    category: "Financial Literacy",
    title: "Understanding PACS Share Capital vs Savings Deposits",
    content: "Members must clearly distinguish between Share Capital and Savings Deposits at PACS. Share Capital represents member equity ownership in the society, carries voting rights and potential dividends, but cannot be withdrawn immediately on demand. Savings or Fixed Deposits are borrowed funds of the member, earn fixed interest, and are repayable upon demand or maturity.",
    source: "Cooperative Accounting Standards & NABARD Guidelines",
    lastVerified: "2025-2026",
    keywords: ["share capital vs deposits", "savings", "pacs accounting", "பங்கு மூலதனம் vs சேமிப்பு", "வைப்பு தொகை", "शेयर पूंजी और जमा में अंतर", "बचत"]
  },
  {
    id: "chunk_44",
    category: "Financial Literacy",
    title: "Prompt Repayment Culture and Credit Score Benefits",
    content: "Timely repayment of crop loans taken through PACS or cooperative banks ensures eligibility for the 3% Prompt Repayment Incentive (effective 4% rate). Prompt repayment maintains an active, unblocked KCC limit, enables automatic credit limit enhancement of 10% annually, and builds a positive credit record in CIBIL/Credit Information Companies for future loans.",
    source: "NABARD Credit Monitoring Advisory",
    lastVerified: "2025-2026",
    keywords: ["prompt repayment", "cibil", "credit score", "limit enhancement", "நேரத்திற்கு கடன் திருப்பி செலுத்துதல்", "சிபில் ஸ்கோர்", "समय पर भुगतान", "क्रेडिट स्कोर", "केसीसी नवीनीकरण"]
  },

  // 45-52: New National Level Cooperative Societies (Ministry of Cooperation)
  {
    id: "chunk_45",
    category: "Cooperative Services",
    title: "National Cooperative Exports Limited (NCEL)",
    content: "NCEL was established under the Multi-State Co-operative Societies Act to serve as an umbrella organization for cooperative exports. It facilitates global market access for agricultural and allied produce grown by farmers and primary cooperatives, unlocking international export prices, quality certification, and direct export earnings for cooperative members.",
    source: "Ministry of Cooperation & NCEL Mandate",
    lastVerified: "2025-2026",
    keywords: ["ncel", "cooperative exports", "export produce", "கூட்டுறவு ஏற்றுமதி", "தேசிய ஏற்றுமதி சங்கம்", "एनसीईएल", "सहकारी निर्यात", "कृषि निर्यात"]
  },
  {
    id: "chunk_46",
    category: "Cooperative Services",
    title: "Bharatiya Beej Sahakari Samiti Limited (BBSSL) for Quality Seeds",
    content: "BBSSL has been set up as a multi-state cooperative to produce, test, certify, and distribute high-yielding and indigenous variety quality seeds. By utilizing the vast network of PACS and farmer cooperatives, BBSSL works to improve Seed Replacement Rates (SRR), safeguard indigenous genetic varieties, and lower seed costs for smallholders.",
    source: "Ministry of Cooperation & BBSSL Guidelines",
    lastVerified: "2025-2026",
    keywords: ["bbssl", "certified seeds", "seed cooperative", "பாரதிய விதைத் திட்டம்", "தரமான விதைகள்", "பிபிஎஸ்எஸ்எல்", "बीबीएसएसएल", "सहकारी बीज", "उन्नत बीज"]
  },
  {
    id: "chunk_47",
    category: "Cooperative Services",
    title: "National Cooperative Organics Limited (NCOL) & 'Bharat Organics'",
    content: "NCOL was founded to aggregate, verify, test, and market organic produce under the trusted national brand 'Bharat Organics'. Farmers practicing certified natural or organic farming can market their produce through local PACS connected to NCOL, receiving premium market prices and affordable certification support.",
    source: "Ministry of Cooperation & NCOL Guidelines",
    lastVerified: "2025-2026",
    keywords: ["ncol", "bharat organics", "organic farming", "பாரத் ஆர்கானிக்ஸ்", "இயற்கை விவசாயம்", "கூட்டுறவு அங்கக சங்கம்", "एनसीओएल", "भारत ऑर्गेनिक्स", "जैविक खेती"]
  },
  {
    id: "chunk_48",
    category: "Cooperative Services",
    title: "National Cooperative Database (NCD)",
    content: "The Ministry of Cooperation has developed the National Cooperative Database (cooperatives.gov.in), a comprehensive single-window digital mapping platform covering over 8.5 lakh cooperative societies across all sectors nationwide. It facilitates targeted policy interventions, transparent scheme delivery, and cooperative discovery for rural producers.",
    source: "National Cooperative Database Portal (cooperatives.gov.in)",
    lastVerified: "2025-2026",
    keywords: ["national cooperative database", "ncd", "8.5 lakh societies", "தேசிய கூட்டுறவு தரவுத்தளம்", "சங்க விவரங்கள்", "राष्ट्रीय सहकारी डेटाबेस", "डेटाबेस पोर्टल"]
  },
  {
    id: "chunk_49",
    category: "Cooperative Services",
    title: "Tribhuvandas Patel National Cooperative University",
    content: "To build professional management capacity and training within the cooperative movement, the National Cooperative University has been established. It offers standardized diploma, degree, and executive education courses in cooperative management, accounting, auditing, and digital governance for cooperative leaders and youth.",
    source: "Ministry of Cooperation Policy Blueprint",
    lastVerified: "2025-2026",
    keywords: ["cooperative university", "tribhuvandas patel", "training", "கூட்டுறவு பல்கலைக்கழகம்", "பயிற்சி", "सहकारी विश्वविद्यालय", "प्रशिक्षण"]
  },
  {
    id: "chunk_50",
    category: "Cooperative Services",
    title: "Dairy Cooperatives and White Revolution 2.0",
    content: "Under White Revolution 2.0, the Ministry of Cooperation and NDDB are expanding primary dairy cooperative societies into unreached panchayats across India. Dairy farmers supplying milk to cooperative societies benefit from transparent automated milk testing, direct bank transfer of milk payments, cattle feed supply, artificial insemination, and veterinary health services.",
    source: "National Dairy Development Board (NDDB) & Ministry of Cooperation",
    lastVerified: "2025-2026",
    keywords: ["dairy cooperatives", "white revolution 2.0", "nddb", "பால் கூட்டுறவு சங்கம்", "வெண்மை புரட்சி", "डेयरी सहकारी", "श्वेत क्रांति 2.0", "दूध समिति"]
  },
  {
    id: "chunk_51",
    category: "Cooperative Services",
    title: "Fisheries Cooperatives and PMMSY Support",
    content: "Fisheries cooperatives (FFCS) are organized to protect the livelihoods of traditional fisherfolk and fish farmers. Under the Pradhan Mantri Matsya Sampada Yojana (PMMSY), cooperative members can obtain financial assistance for purchasing modern boats, biofloc units, fish feed mills, cold storage chains, and safety equipment.",
    source: "Department of Fisheries & National Federation of Fishers Cooperatives (FISHCOPFED)",
    lastVerified: "2025-2026",
    keywords: ["fisheries cooperative", "pmmsy", "fish farming", "மீன்வள கூட்டுறவு", "மீன்பிடி திட்டம்", "मत्स्य सहकारी", "पीएमएमएसवाई", "मछुआरा"]
  },
  {
    id: "chunk_52",
    category: "Cooperative Services",
    title: "Strengthening Rural Cooperative Credit Structure (STCCS)",
    content: "The Short-Term Cooperative Credit Structure operates through a three-tier system in most states: State Cooperative Banks (StCBs) at the apex level, District Central Cooperative Banks (DCCBs) at the intermediate district level, and PACS at the grassroots village level. NABARD provides refinance support to ensure continuous agricultural liquidity.",
    source: "NABARD Annual Cooperative Credit Review",
    lastVerified: "2025-2026",
    keywords: ["stccs", "three tier cooperative", "nabard refinance", "மூன்று அடுக்கு கூட்டுறவு", "நபார்டு மறுநிதி", "नाबार्ड", "सहकारी साख ढांचा", "डीसीसीबी"]
  },

  // 53-58: Other Government Welfare Schemes for Cooperative Members & Farmers
  {
    id: "chunk_53",
    category: "Government Schemes",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    content: "PM-KISAN provides income support of ₹6,000 per year in three equal instalments of ₹2,000 every four months directly into the Aadhaar-seeded bank accounts of eligible landholding farmer families. Mandatory requirements include completion of e-KYC (via OTP or facial recognition), land record seeding in the state portal, and active Aadhaar bank account linking.",
    source: "Ministry of Agriculture & Farmers Welfare, PM-KISAN Portal (pmkisan.gov.in)",
    lastVerified: "2025-2026",
    keywords: ["pm-kisan", "6000 rupees", "direct benefit transfer", "ekyc", "பிஎம் கிசான்", "ரூபாய் 6000", "நேரடி மானியம்", "இ-கேஒய்சி", "पीएम किसान", "6000 रुपये", "ई-केवाईसी", "डीबीटी"]
  },
  {
    id: "chunk_54",
    category: "Government Schemes",
    title: "PM-KUSUM Solar Agriculture Pumps Scheme for Cooperatives",
    content: "PM-KUSUM assists farmers and cooperatives in adopting solar power. Under Component A, cooperatives and farmer groups can install grid-connected solar power plants up to 2 MW on barren land and sell power to DISCOMs. Under Component B & C, standalone and grid-connected solar pumps receive up to 60% capital subsidy from Central and State Governments.",
    source: "Ministry of New and Renewable Energy (MNRE), PM-KUSUM Guidelines",
    lastVerified: "2025-2026",
    keywords: ["pm-kusum", "solar pump", "solar agriculture", "சூரிய மின் பம்பு", "குசும் திட்டம்", "சோலார் மின்சாரம்", "पीएम कुसुम", "सोलर पंप", "सौर ऊर्जा"]
  },
  {
    id: "chunk_55",
    category: "Government Schemes",
    title: "Custom Hiring Centres (CHCs) by PACS under SMAM",
    content: "Under the Sub-Mission on Agricultural Mechanization (SMAM), PACS and cooperative societies are sanctioned capital subsidies (up to 40% to 80%) to establish Custom Hiring Centres (CHCs). These centres stock modern machinery like tractors, rotavators, laser levellers, and seed drills, which small and marginal farmers can rent at affordable hourly rates.",
    source: "Department of Agriculture and Farmers Welfare, SMAM Guidelines",
    lastVerified: "2025-2026",
    keywords: ["chc", "custom hiring centre", "farm machinery rental", "smam", "வேளாண் இயந்திர வாடகை மையம்", "டிராக்டர் வாடகை", "कस्टम हायरिंग सेंटर", "कृषि यंत्र किराया"]
  },
  {
    id: "chunk_56",
    category: "Insurance",
    title: "Social Security: PMJJBY and PMSBY via Cooperative Banks",
    content: "Cooperative bank account holders aged 18-50 can enroll in Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) providing ₹2,00,000 life insurance for an annual premium of ₹436. Account holders aged 18-70 can enroll in Pradhan Mantri Suraksha Bima Yojana (PMSBY) providing ₹2,00,000 accidental death/disability coverage for just ₹20 per year.",
    source: "Department of Financial Services, Ministry of Finance",
    lastVerified: "2025-2026",
    keywords: ["pmjjby", "pmsby", "life insurance", "accidental insurance", "ஆயுள் காப்பீடு", "விபத்து காப்பீடு", "ரூ.436", "ரூ.20", "जीवन ज्योति बीमा", "सुरक्षा बीमा", "2 लाख"]
  },
  {
    id: "chunk_57",
    category: "Government Schemes",
    title: "Atal Pension Yojana (APY) for Rural Workers",
    content: "Atal Pension Yojana (APY) provides guaranteed monthly pension (₹1,000 to ₹5,000 per month) after reaching age 60 for unorganized sector workers, rural labourers, and cooperative members who join between ages 18 and 40. Premium is auto-debited from their savings account with cooperative or commercial banks.",
    source: "Pension Fund Regulatory and Development Authority (PFRDA)",
    lastVerified: "2025-2026",
    keywords: ["atal pension yojana", "apy", "rural pension", "அடல் பென்ஷன் திட்டம்", "மாத ஓய்வூதியம்", "அரசு பென்ஷன்", "अटल पेंशन योजना", "मासिक पेंशन", "बुढ़ापा पेंशन"]
  },
  {
    id: "chunk_58",
    category: "Agriculture",
    title: "Soil Health Card Scheme & Balanced Fertilizer Guidance at PACS",
    content: "Soil Health Cards provide farmers with specific nutrient status reports of their agricultural plots along with tailored fertilizer recommendations for major crops. PACS staff use these card recommendations to advise farmers on balanced NPK fertilizer and micronutrient application, avoiding over-use of chemical urea and preserving long-term soil fertility.",
    source: "Department of Agriculture & Farmers Welfare (soilhealth.dac.gov.in)",
    lastVerified: "2025-2026",
    keywords: ["soil health card", "soil testing", "npk recommendation", "மண் பரிசோதனை அட்டை", "மண் வளம்", "மண் பரிசோதனை", "मृदा स्वास्थ्य कार्ड", "मिट्टी जांच", "उर्वरक सलाह"]
  }
];
