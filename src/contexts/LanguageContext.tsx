import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi" | "bn" | "ta" | "te";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translations: Record<Language, Record<string, string>> = {
      en: {
        // Hero Section
        trustBadge: "Trusted by 10,000+ Clients",
        heroTitle: "Find India's Top",
        heroTitleHighlight: "Legal Experts",
        heroTitleEnd: "in Minutes",
        heroDescription:
          "Connect with verified lawyers across India. Get instant legal advice, document review, and consultation booking - all in one trusted platform.",
        findLegalHelp: "Find Legal Help",
        browseLawyers: "Browse Lawyers",
        lawyersCount: "5000+",
        verifiedProfessionals: "Verified Lawyers",
        legalAreas: "50+",
        expertCoverage: "Legal Areas",
        successRate: "98%",
        clientSatisfaction: "Client Satisfaction",

        // Navigation
        services: "Services",
        findLawyers: "Find Lawyers",
        about: "About",
        contact: "Contact",
        signIn: "Sign In",
        getStarted: "Get Started",

        // Additional legal-specific content
        instantConsultation: "Instant Consultation",
        documentReview: "Document Review",
        legalAdvice: "Legal Advice",
        courtRepresentation: "Court Representation",
        contractDrafting: "Contract Drafting",
        propertyLaw: "Property Law",
        familyLaw: "Family Law",
        criminalLaw: "Criminal Law",
        corporateLaw: "Corporate Law",
        taxLaw: "Tax Law",
      },
      hi: {
        // Hero Section
        trustBadge: "10,000+ ग्राहकों द्वारा विश्वसनीय",
        heroTitle: "भारत के शीर्ष",
        heroTitleHighlight: "कानूनी विशेषज्ञ",
        heroTitleEnd: "को मिनटों में खोजें",
        heroDescription:
          "पूरे भारत में सत्यापित वकीलों से जुड़ें। तत्काल कानूनी सलाह, दस्तावेज समीक्षा, और परामर्श बुकिंग प्राप्त करें - सभी एक विश्वसनीय प्लेटफॉर्म पर।",
        findLegalHelp: "कानूनी सहायता खोजें",
        browseLawyers: "वकीलों को ब्राउज़ करें",
        lawyersCount: "5000+",
        verifiedProfessionals: "सत्यापित वकील",
        legalAreas: "50+",
        expertCoverage: "कानूनी क्षेत्र",
        successRate: "98%",
        clientSatisfaction: "ग्राहक संतुष्टि",

        // Navigation
        services: "सेवाएं",
        findLawyers: "वकील खोजें",
        about: "हमारे बारे में",
        contact: "संपर्क",
        signIn: "साइन इन",
        getStarted: "शुरू करें",

        // Additional legal-specific content
        instantConsultation: "तत्काल परामर्श",
        documentReview: "दस्तावेज समीक्षा",
        legalAdvice: "कानूनी सलाह",
        courtRepresentation: "न्यायालय प्रतिनिधित्व",
        contractDrafting: "अनुबंध प्रारूपण",
        propertyLaw: "संपत्ति कानून",
        familyLaw: "पारिवारिक कानून",
        criminalLaw: "आपराधिक कानून",
        corporateLaw: "कॉर्पोरेट कानून",
        taxLaw: "कर कानून",
      },
      bn: {
        // Hero Section
        trustBadge: "10,000+ ক্লায়েন্ট দ্বারা বিশ্বস্ত",
        heroTitle: "ভারতের শীর্ষ",
        heroTitleHighlight: "আইনী বিশেষজ্ঞ",
        heroTitleEnd: "কে মিনিটে খুঁজুন",
        heroDescription:
          "সমগ্র ভারতে যাচাইকৃত আইনজীবীদের সাথে সংযোগ স্থাপন করুন। তাত্ক্ষণিক আইনী পরামর্শ, নথি পর্যালোচনা এবং পরামর্শ বুকিং পান - সবই একটি বিশ্বস্ত প্ল্যাটফর্মে।",
        findLegalHelp: "আইনী সাহায্য খুঁজুন",
        browseLawyers: "আইনজীবীদের ব্রাউজ করুন",
        lawyersCount: "5000+",
        verifiedProfessionals: "যাচাইকৃত আইনজীবী",
        legalAreas: "50+",
        expertCoverage: "আইনী ক্ষেত্র",
        successRate: "98%",
        clientSatisfaction: "ক্লায়েন্ট সন্তুষ্টি",

        // Navigation
        services: "পরিষেবা",
        findLawyers: "আইনজীবী খুঁজুন",
        about: "আমাদের সম্পর্কে",
        contact: "যোগাযোগ",
        signIn: "সাইন ইন",
        getStarted: "শুরু করুন",

        // Additional legal-specific content
        instantConsultation: "তাত্ক্ষণিক পরামর্শ",
        documentReview: "নথি পর্যালোচনা",
        legalAdvice: "আইনী পরামর্শ",
        courtRepresentation: "আদালত প্রতিনিধিত্ব",
        contractDrafting: "চুক্তি খসড়া",
        propertyLaw: "সম্পত্তি আইন",
        familyLaw: "পারিবারিক আইন",
        criminalLaw: "ফৌজদারি আইন",
        corporateLaw: "কর্পোরেট আইন",
        taxLaw: "কর আইন",
      },
      ta: {
        // Hero Section
        trustBadge: "10,000+ வாடிக்கையாளர்களால் நம்பப்படுகிறது",
        heroTitle: "இந்தியாவின் சிறந்த",
        heroTitleHighlight: "சட்ட நிபுணர்களை",
        heroTitleEnd: "நிமிடங்களில் கண்டறியவும்",
        heroDescription:
          "இந்தியா முழுவதும் சரிபார்க்கப்பட்ட வழக்கறிஞர்களுடன் இணைக்கவும். உடனடி சட்ட ஆலோசனை, ஆவண மதிப்பாய்வு மற்றும் ஆலோசனை முன்பதிவு பெறவும் - அனைத்தும் ஒரே நம்பகமான தளத்தில்.",
        findLegalHelp: "சட்ட உதவியைக் கண்டறியவும்",
        browseLawyers: "வழக்கறிஞர்களை உலாவவும்",
        lawyersCount: "5000+",
        verifiedProfessionals: "சரிபார்க்கப்பட்ட வழக்கறிஞர்கள்",
        legalAreas: "50+",
        expertCoverage: "சட்டப் பகுதிகள்",
        successRate: "98%",
        clientSatisfaction: "வாடிக்கையாளர் திருப்தி",

        // Navigation
        services: "சேவைகள்",
        findLawyers: "வழக்கறிஞர்களைக் கண்டறியவும்",
        about: "எங்களைப் பற்றி",
        contact: "தொடர்பு",
        signIn: "உள்நுழையவும்",
        getStarted: "தொடங்கவும்",

        // Additional legal-specific content
        instantConsultation: "உடனடி ஆலோ�னை",
        documentReview: "ஆவண மதிப்பாய்வு",
        legalAdvice: "சட்ட ஆலோசனை",
        courtRepresentation: "நீதிமன்ற பிரதிநிதித்துவம்",
        contractDrafting: "ஒப்பந்தம் வரைதல்",
        propertyLaw: "சொத்து சட்டம்",
        familyLaw: "குடும்ப சட்டம்",
        criminalLaw: "குற்றவியல் சட்டம்",
        corporateLaw: "கார்ப்பரேட் சட்டம்",
        taxLaw: "வரிச் சட்டம்",
      },
      te: {
        // Hero Section
        trustBadge: "10,000+ క్లయింట్లచే విశ్వసించబడింది",
        heroTitle: "భారతదేశంలోని అగ్రగామి",
        heroTitleHighlight: "న్యాయ నిపుణులను",
        heroTitleEnd: "నిమిషాలలో కనుగొనండి",
        heroDescription:
          "భారతదేశం అంతటా ధృవీకరించబడిన న్యాయవాదులతో కనెక్ట్ అవ్వండి. తక్షణ న్యాయ సలహా, పత్రాల సమీక్ష మరియు సంప్రదింపుల బుకింగ్ పొందండి - అన్నీ ఒక విశ్వసనీయ వేదికలో.",
        findLegalHelp: "న్యాయ సహాయాన్ని కనుగొనండి",
        browseLawyers: "న్యాయవాదులను బ్రౌజ్ చేయండి",
        lawyersCount: "5000+",
        verifiedProfessionals: "ధృవీకరించబడిన న్యాయవాదులు",
        legalAreas: "50+",
        expertCoverage: "న్యాయ ప్రాంతాలు",
        successRate: "98%",
        clientSatisfaction: "క్లయింట్ సంతృప్తి",

        // Navigation
        services: "సేవలు",
        findLawyers: "న్యాయవాదులను కనుగొనండి",
        about: "మా గురించి",
        contact: "సంప్రదించండి",
        signIn: "సైన్ ఇన్",
        getStarted: "ప్రారంభించండి",

        // Additional legal-specific content
        instantConsultation: "తక్షణ సంప్రదింపు",
        documentReview: "పత్రాల సమీక్ష",
        legalAdvice: "న్యాయ సలహా",
        courtRepresentation: "కోర్టు ప్రాతినిధ్యం",
        contractDrafting: "ఒప్పందం రూపొందించడం",
        propertyLaw: "ఆస్తి చట్టం",
        familyLaw: "కుటుంబ చట్టం",
        criminalLaw: "నేర చట్టం",
        corporateLaw: "కార్పొరేట్ చట్టం",
        taxLaw: "పన్ను చట్టం",
      },
    };

    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
