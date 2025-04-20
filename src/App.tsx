import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  BriefcaseIcon, 
  BookOpen, 
  Home as HomeIcon,
  MessageSquare, 
  Shield, 
  ChevronRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Search,
  FileText,
  ScrollText,
  Languages,
  Building,
  Users,
  HeartHandshake,
  FileCheck,
  MessagesSquare,
  CreditCard,
  Trophy,
  Coins,
  UserSquare2,
  Globe
} from 'lucide-react';
import { 
  IT, GB, BG
} from 'country-flag-icons/react/3x2';
import Team from './components/Team';
import CandidatePresentation from './components/CandidatePresentation';
import PasswordProtection from './components/PasswordProtection';
import IDCheck from './components/IDCheck/IDCheck';
import Welcome from './components/Welcome';
import LanguageSelection from './components/LanguageSelection';
import Splash from './components/Splash';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { SupportedLanguage, TeamMember, Translation } from './types';
import { translations } from './translations';
import { DocumentSelection } from './components/IDCheck/DocumentSelection';
import { LanguageProvider } from './contexts/LanguageContext';
import i18n from './i18n';

const teamMembers = {
  it: [
    {
      role: "Avvocato",
      name: "Avv. Marco Rossi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop",
      description: "Esperto in diritto dell'immigrazione e procedure di naturalizzazione",
      bio: "Con oltre 15 anni di esperienza nel diritto dell'immigrazione, l'Avv. Rossi ha assistito centinaia di cittadini stranieri nel loro percorso di integrazione in Italia. Specializzato in procedure di naturalizzazione e ricongiungimento familiare.",
      help: "L'Avv. Rossi ti guiderà attraverso tutte le procedure legali necessarie per la tua naturalizzazione, assicurandosi che ogni documento sia in regola e che tutte le pratiche siano gestite nel modo più efficiente possibile.",
      references: [
        "Ha gestito con successo oltre 200 pratiche di naturalizzazione",
        "Specializzato in diritto dell'immigrazione e cittadinanza",
        "Supporto multilingue in italiano, inglese e francese"
      ]
    },
    {
      role: "Commercialista",
      name: "Dott. Laura Bianchi",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Esperta in fiscalità internazionale e dichiarazioni dei redditi",
      bio: "La Dott.ssa Bianchi vanta una vasta esperienza nella gestione fiscale di cittadini stranieri in Italia. Specializzata in accordi internazionali e ottimizzazione fiscale per expat.",
      help: "Ti aiuterà a gestire tutti gli aspetti fiscali della tua permanenza in Italia, dalle dichiarazioni dei redditi alla gestione delle imposte internazionali.",
      references: [
        "Esperta in fiscalità internazionale",
        "Gestione dichiarazioni dei redditi per cittadini stranieri",
        "Supporto in italiano e inglese"
      ]
    },
    {
      role: "Insegnante di Lingua",
      name: "Prof. Elena Verdi",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
      description: "Specialista in insegnamento dell'italiano come seconda lingua",
      bio: "Con una carriera ventennale nell'insegnamento dell'italiano a stranieri, la Prof.ssa Verdi ha sviluppato metodi innovativi per l'apprendimento rapido ed efficace della lingua.",
      help: "Ti preparerà per il test di lingua italiana richiesto per la naturalizzazione, con un approccio personalizzato basato sulle tue esigenze specifiche.",
      references: [
        "Certificata CELI e CILS",
        "Esperta in preparazione test di naturalizzazione",
        "Supporto multilingue"
      ]
    },
    {
      role: "Agente di Viaggio",
      name: "Maria Santos",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
      description: "Specialista in viaggi per documenti e pratiche burocratiche",
      bio: "Con anni di esperienza nel settore dei viaggi per documenti, Maria ha aiutato centinaia di persone a gestire i viaggi necessari per le pratiche di naturalizzazione.",
      help: "Ti assisterà nell'organizzazione dei viaggi necessari per la raccolta dei documenti e le pratiche burocratiche nel tuo paese d'origine.",
      references: [
        "Esperta in viaggi per documenti",
        "Supporto multilingue",
        "Assistenza completa per pratiche all'estero"
      ]
    },
    {
      role: "Agente Immobiliare",
      name: "Giuseppe Romano",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
      description: "Specialista in affitti e acquisti per cittadini stranieri",
      bio: "Giuseppe si occupa da anni di aiutare cittadini stranieri a trovare casa in Italia, con particolare attenzione alle esigenze specifiche di chi sta completando il processo di naturalizzazione.",
      help: "Ti aiuterà a trovare una sistemazione adeguata che soddisfi i requisiti per la naturalizzazione, gestendo tutti gli aspetti burocratici dell'affitto o dell'acquisto.",
      references: [
        "Esperto in contratti multilingue",
        "Supporto per pratiche catastali",
        "Assistenza completa per affitti e acquisti"
      ]
    },
    {
      role: "Rete di Connazionali",
      name: "Comunità Supporto",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop",
      description: "Rete di supporto formata da connazionali che hanno già completato il processo",
      bio: "Una comunità attiva di persone che hanno già completato il processo di naturalizzazione e sono pronte a condividere la loro esperienza e offrire supporto pratico ed emotivo.",
      help: "Ti metterà in contatto con persone che hanno già completato il processo, offrendoti supporto pratico, consigli e incoraggiamento basati su esperienze reali.",
      references: [
        "Supporto peer-to-peer",
        "Condivisione esperienze",
        "Rete di contatti utili"
      ]
    }
  ],
  en: [
    {
      role: "Lawyer",
      name: "Mr. Marco Rossi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop",
      description: "Expert in immigration law and naturalization procedures",
      bio: "With over 15 years of experience in immigration law, Mr. Rossi has assisted hundreds of foreign citizens in their integration process in Italy. Specialized in naturalization procedures and family reunification.",
      help: "Mr. Rossi will guide you through all the legal procedures needed for your naturalization, ensuring that every document is in order and all practices are handled as efficiently as possible.",
      references: [
        "Successfully managed over 200 naturalization cases",
        "Specialized in immigration law and citizenship",
        "Multilingual support in Italian, English, and French"
      ]
    },
    {
      role: "Accountant",
      name: "Ms. Laura Bianchi",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Expert in international taxation and income tax returns",
      bio: "Ms. Bianchi has extensive experience in managing tax matters for foreign citizens in Italy. Specialized in international agreements and tax optimization for expats.",
      help: "She will help you manage all tax aspects of your stay in Italy, from income tax returns to handling international taxes.",
      references: [
        "Expert in international taxation",
        "Income tax return management for foreign citizens",
        "Support in Italian and English"
      ]
    },
    {
      role: "Language Teacher",
      name: "Prof. Elena Verdi",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
      description: "Specialist in teaching Italian as a second language",
      bio: "With a twenty-year career in teaching Italian to foreigners, Prof. Verdi has developed innovative methods for rapid and effective language learning.",
      help: "She will prepare you for the Italian language test required for naturalization, with a personalized approach based on your specific needs.",
      references: [
        "CELI and CILS certified",
        "Expert in naturalization test preparation",
        "Multilingual support"
      ]
    },
    {
      role: "Travel Agent",
      name: "Maria Santos",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
      description: "Specialist in document-related travel and bureaucratic procedures",
      bio: "With years of experience in document travel, Maria has helped hundreds of people manage the necessary trips for naturalization procedures.",
      help: "She will assist you in organizing the necessary trips for collecting documents and bureaucratic procedures in your country of origin.",
      references: [
        "Expert in document-related travel",
        "Multilingual support",
        "Complete assistance for procedures abroad"
      ]
    },
    {
      role: "Real Estate Agent",
      name: "Giuseppe Romano",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
      description: "Specialist in rentals and purchases for foreign citizens",
      bio: "Giuseppe has been helping foreign citizens find housing in Italy for years, with particular attention to the specific needs of those completing the naturalization process.",
      help: "He will help you find suitable accommodation that meets the requirements for naturalization, handling all bureaucratic aspects of renting or purchasing.",
      references: [
        "Expert in multilingual contracts",
        "Support for cadastral practices",
        "Complete assistance for rentals and purchases"
      ]
    },
    {
      role: "Network of Compatriots",
      name: "Support Community",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop",
      description: "Support network formed by compatriots who have already completed the process",
      bio: "An active community of people who have already completed the naturalization process and are ready to share their experience and offer practical and emotional support.",
      help: "It will connect you with people who have already completed the process, offering you practical support, advice, and encouragement based on real experiences.",
      references: [
        "Peer-to-peer support",
        "Experience sharing",
        "Network of useful contacts"
      ]
    }
  ],
  bg: [
    {
      role: "Адвокат",
      name: "г-н Марко Роси",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop",
      description: "Експерт по имиграционно право и процедури за натурализация",
      bio: "С над 15 години опит в имиграционното право, г-н Роси е помогнал на стотици чужди граждани в техния процес на интеграция в Италия. Специализиран в процедури за натурализация и семейно събиране.",
      help: "Г-н Роси ще ви насочи през всички правни процедури, необходими за вашата натурализация, осигурявайки, че всеки документ е в ред и всички практики се обработват възможно най-ефективно.",
      references: [
        "Успешно управлявани над 200 случая на натурализация",
        "Специализиран в имиграционно право и гражданство",
        "Многоезична поддръжка на italianski i angleški"
      ]
    },
    {
      role: "Счетоводител",
      name: "г-жа Лора Бянки",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Експерт по международно данъчно облагане и данъчни декларации",
      bio: "Г-жа Бянки има богат опит в управлението на данъчни въпроси за чужди граждани в Италия. Специализирана в международни споразумения и данъчна оптимизация за експати.",
      help: "Тя ще ви помогне да управлявате всички данъчни аспекти на вашия престой в Италия, от данъчните декларации до управлението на международни данъци.",
      references: [
        "Експерт по международно данъчно облагане",
        "Управление на данъчни декларации за чужди граждани",
        "Поддръжка на italianski i angleški"
      ]
    },
    {
      role: "Учител по език",
      name: "проф. Елена Верди",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
      description: "Специалист по преподаване на italianski na straneci, prof. Verdi je razvijala inovativne metode za brzo i efektivno izucavanje jezika.",
      help: "She will prepare you for the Italian language test required for naturalization, with a personalized approach based on your specific needs.",
      references: [
        "Сертифицирана CELI i CILS",
        "Експерт по подготовка за тестове за натурализация",
        "Многоезична поддръжка"
      ]
    },
    {
      role: "Туристически агент",
      name: "Мария Сантос",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
      description: "Специалист по пътуване за документи и бюрократични процедури",
      bio: "С години опит в пътуване за документи, Мария е помогнала на стотици хора да управляват необходимите пътувания за процедури по натурализация.",
      help: "Тя ще ви помогне да организирате необходимите пътувания за събиране на документи и бюрократични процедури във вашата страна на произход.",
      references: [
        "Експерт по пътуване за документи",
        "Многоезична поддръжка",
        "Пълна помощ за процедури в чужбина"
      ]
    },
    {
      role: "Имотен агент",
      name: "Джузепе Романо",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
      description: "Специалист по наеми и покупки за чужди граждани",
      bio: "Джузепе от години помага на чужди граждани да намерят жилище в Италия, с особено внимание към специфичните нужди на тези, които завършват процеса на натурализация.",
      help: "Той ще ви помогне да намерите подходящо жилище, което отговаря на изискванията за натурализация, управлявайки всички бюрократични аспекти на наема или покупката.",
      references: [
        "Експерт по многоезични договори",
        "Поддръжка за кадастрални практики",
        "Пълна помощ за наеми и покупки"
      ]
    },
    {
      role: "Мрежа от сънародници",
      name: "Общност за поддръжка",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop",
      description: "Мрежа за поддръжка, формирана от сънародници, които вече са завършили процеса",
      bio: "Активна общност от хора, които вече са завършили процеса на натурализация и са готови да споделят своя опит и да предложат практическа и емоционална поддръжка.",
      help: "Ще ви свърже с хора, които вече са завършили процеса, предлагайки ви практическа поддръжка, съвети и насърчение, базирани на реални преживявания.",
      references: [
        "Поддръжка от равни на равни",
        "Споделяне на опит",
        "Мрежа от полезни контакти"
      ]
    }
  ]
};

type SupportedLanguage = 'it' | 'en' | 'bg';

const languages = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'bg', label: 'български' },
];

const languageLabels: Record<SupportedLanguage, string> = {
  it: 'Italiano',
  en: 'English',
  bg: 'български',
};

type ViewType = 'team' | 'candidate' | 'id-profile' | 'document' | 'home';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);

  // Rilevamento lingua basato su IP
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code.toLowerCase();
        
        // Aggiorna la mappa dei codici paese alle lingue
        const countryToLanguage: { [key: string]: typeof selectedLanguage } = {
          'it': 'it',
          'gb': 'en',
          'us': 'en',
          'bg': 'bg',
          'es': 'es',
          'fr': 'fr',
          'de': 'de',
          'pl': 'pl',
          'ro': 'ro',
          'pt': 'pt',
          'nl': 'nl',
          'gr': 'de',
          'hu': 'de',
          'cz': 'de',
          'sk': 'de',
          'hr': 'de',
          'si': 'de',
          'lt': 'de',
          'lv': 'de',
          'ee': 'de',
          'mt': 'de',
          'dk': 'de',
          'se': 'de',
          'fi': 'de',
          'no': 'de',
          'ie': 'de',
          'at': 'de-at',
          'be': 'nl-be',
          'ch': 'de-ch',
          'ua': 'uk',
          'tr': 'tr'
        };

        const detectedLang = countryToLanguage[countryCode] || 'en';
        setDetectedLanguage(detectedLang);
      } catch (error) {
        console.error('Error detecting language:', error);
        setDetectedLanguage('en');
      }
    };

    detectLanguage();
  }, []);

  // Gestione della navigazione del browser
  useEffect(() => {
    const handlePopState = () => {
      if (currentView === 'team') {
        setCurrentView('home');
      } else if (currentView === 'candidate') {
        setCurrentView('home');
      } else if (selectedLanguage) {
        setSelectedLanguage(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView, selectedLanguage]);

  // Aggiorna l'URL quando cambia lo stato
  useEffect(() => {
    if (currentView === 'team') {
      window.history.pushState({}, '', '/team');
    } else if (currentView === 'candidate') {
      window.history.pushState({}, '', '/candidate');
    } else if (selectedLanguage) {
      window.history.pushState({}, '', '/');
    }
  }, [currentView, selectedLanguage]);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight;
      if (bottom) {
        setHasScrolledToBottom(true);
        setIsFirstVisit(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = selectedLanguage ? translations[selectedLanguage] : translations.it;

  const handleLanguageSelect = (language: SupportedLanguage | null) => {
    if (language) {
      setSelectedLanguage(language);
      setShowLanguageSelector(false);
      i18n.changeLanguage(language);
      setShowWelcome(true);
    }
  };

  const handleLanguageClick = (language: SupportedLanguage | null) => {
    if (language === 'it') {
      setSelectedLanguage('it');
      i18n.changeLanguage('it');
    } else if (language === 'en') {
      setSelectedLanguage('en');
      i18n.changeLanguage('en');
    } else if (language === 'bg') {
      setSelectedLanguage('bg');
      i18n.changeLanguage('bg');
    }
  };

  const handleSplashContinue = () => {
    setShowSplash(false);
    setShowWelcome(true);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'document') {
      setShowWelcome(false);
    }
  };

  const renderContent = () => {
    if (!selectedLanguage) {
      return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
    }

    if (showSplash) {
      return <Splash 
        onContinue={handleSplashContinue} 
        translations={translations[selectedLanguage as SupportedLanguage]} 
      />;
    }

    if (currentView === 'document') {
      return <DocumentSelection 
        onCancel={() => setCurrentView('team')} 
        translations={translations[selectedLanguage]}
        onComplete={(data) => {
          console.log('Document verification completed:', data);
          setCurrentView('team');
        }}
      />;
    }

    if (showWelcome && (selectedLanguage === 'it' || selectedLanguage === 'en' || selectedLanguage === 'bg')) {
      return <Welcome 
        onViewChange={handleViewChange}
        translations={translations[selectedLanguage]}
      />;
    }

    if (currentView === 'team') {
      return (
        <Team 
          teamMembers={teamMembers[selectedLanguage] || teamMembers['en']} 
          onBack={() => handleViewChange('home')}
          language={selectedLanguage as SupportedLanguage}
        />
      );
    }

    if (currentView === 'candidate') {
      return <CandidatePresentation 
        language={selectedLanguage} 
        onBack={() => setCurrentView('team')} 
        onVideoSelfieClick={() => {}} 
      />;
    }

    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {selectedLanguage && !showSplash && !showWelcome && (
          <Navigation
            currentView={currentView}
            onViewChange={handleViewChange}
            selectedLanguage={selectedLanguage}
            translations={translations[selectedLanguage]}
          />
        )}
        {renderContent()}
      </div>
    </LanguageProvider>
  );
}

export default App;