import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Info, 
  MessageSquareText, 
  Camera, 
  Wrench, 
  Languages, 
  FileText, 
  Scale, 
  HelpCircle 
} from 'lucide-react';

interface CandidatePresentationProps {
  language: 'it' | 'en' | 'bg' | 'es' | 'fr' | 'de' | 'pl' | 'ro' | 'pt' | 'nl' | 'gr' | 'hu' | 'cz' | 'sk' | 'hr' | 'si' | 'lt' | 'lv' | 'ee' | 'mt';
  onBack: () => void;
  onVideoSelfieClick: () => void;
}

const translations = {
  it: {
    backButton: "Torna indietro",
    sections: {
      request: "Ti chiederemo di fare",
      help: "... e ti aiuteremo"
    },
    steps: {
      interview: {
        title: "Una intervista",
        description: "L'intervista sarà condotta da un nostro esperto del settore. Durerà circa 30 minuti e si svolgerà online. Parleremo delle tue esperienze lavorative, delle tue competenze tecniche e trasversali, e delle tue aspirazioni professionali. Ti faremo domande specifiche sul tuo settore di competenza per valutare il tuo livello di preparazione."
      },
      videoSelfie: {
        title: "Un video selfie",
        description: "Il video selfie è un breve video di 2-3 minuti in cui ti presenti. Questo ci permette di verificare la tua identità e di avere una prima impressione professionale. Ti forniremo una guida dettagliata su come realizzarlo al meglio: quali aspetti evidenziare, come presentarti, quale sfondo utilizzare e come gestire l'illuminazione."
      },
      practicalTests: {
        title: "Delle prove pratiche",
        description: "Le prove pratiche sono personalizzate in base al tuo settore professionale. Ad esempio, se sei un programmatore, ti chiederemo di risolvere alcuni problemi di coding; se sei un grafico, di realizzare un progetto creativo. Le prove sono supervisionate e certificate, garantendo ai datori di lavoro l'autenticità delle tue competenze. Avrai a disposizione il tempo necessario per completarle con tranquillità."
      },
      languageTest: {
        title: "Una prova in una lingua straniera",
        description: "Se cerchi lavoro all'estero, valuteremo il tuo livello linguistico attraverso un breve colloquio nella lingua del paese di destinazione o in inglese. Non preoccuparti se non ti senti sicuro: ti metteremo a disposizione un interprete per aiutarti durante il colloquio. Inoltre, se necessario, ti offriremo un corso base della lingua per acquisire le competenze linguistiche essenziali per il lavoro."
      },
      curriculum: {
        title: "Creeremo il tuo curriculum professionale",
        description: "Il nostro team di esperti creerà per te un curriculum professionale ottimizzato per il mercato del lavoro internazionale. Lo realizzeremo in tre versioni: nella tua lingua madre, in inglese e nella lingua del paese di destinazione. Evidenzieremo le tue competenze chiave, i risultati raggiunti e le certificazioni ottenute. Includeremo anche una sezione dedicata alle soft skills e alle esperienze internazionali."
      },
      documentation: {
        title: "Verificheremo la documentazione necessaria",
        description: "Un nostro esperto legale esaminerà tutti i documenti necessari per lavorare nel paese di destinazione: permesso di lavoro, visto, documenti d'identità, certificazioni professionali e loro eventuali traduzioni. Ti forniremo una checklist personalizzata dei documenti da preparare e ti guideremo passo dopo passo nel processo di raccolta e validazione."
      },
      interviewTips: {
        title: "Ti daremo consigli per l'intervista",
        description: "Ti prepareremo al meglio per i colloqui di lavoro con consigli personalizzati. Ti spiegheremo come presentarti efficacemente, quale abbigliamento scegliere e come gestire le domande più comuni. Ti forniremo una guida sulle specificità culturali del paese di destinazione e sulle aspettative dei datori di lavoro locali."
      }
    },
    finalMessage: "Una volta preparata la tua scheda di presentazione cercheremo le opportunità di lavoro disponibili"
  },
  en: {
    backButton: "Go back",
    sections: {
      request: "We will ask you to",
      help: "... and we will help you"
    },
    steps: {
      interview: {
        title: "An interview",
        description: "The interview will be conducted by our industry expert. It will last about 30 minutes and will be held online. We will discuss your work experience, technical and soft skills, and professional aspirations. We will ask specific questions about your area of expertise to assess your level of preparation."
      },
      videoSelfie: {
        title: "A video selfie",
        description: "The video selfie is a short 2-3 minute video where you introduce yourself. This allows us to verify your identity and get a first professional impression. We will provide you with detailed guidance on how to make it best: what aspects to highlight, how to present yourself, what background to use, and how to manage lighting."
      },
      practicalTests: {
        title: "Practical tests",
        description: "The practical tests are customized based on your professional sector. For example, if you're a programmer, we'll ask you to solve some coding problems; if you're a graphic designer, to create a creative project. The tests are supervised and certified, guaranteeing employers the authenticity of your skills. You will have the necessary time to complete them comfortably."
      },
      languageTest: {
        title: "A foreign language test",
        description: "If you're looking for work abroad, we'll assess your language level through a brief interview in the destination country's language or in English. Don't worry if you're not confident: we'll provide an interpreter to help you during the interview. Additionally, if needed, we'll offer a basic language course to acquire essential work-related language skills."
      },
      curriculum: {
        title: "Create your professional CV",
        description: "Our team of experts will create a professional CV optimized for the international job market. We will create it in three versions: in your native language, in English, and in the destination country's language. We will highlight your key skills, achievements, and certifications obtained. We will also include a section dedicated to soft skills and international experiences."
      },
      documentation: {
        title: "Verify necessary documentation",
        description: "Our legal expert will examine all documents needed to work in the destination country: work permit, visa, identity documents, professional certifications, and their translations. We will provide you with a personalized checklist of documents to prepare and guide you step by step through the collection and validation process."
      },
      interviewTips: {
        title: "Give you interview tips",
        description: "We will prepare you for job interviews with personalized advice. We will explain how to present yourself effectively, what attire to choose, and how to handle common questions. We will provide guidance on cultural specifics of the destination country and local employers' expectations."
      }
    },
    finalMessage: "Once your presentation profile is prepared, we will search for available job opportunities"
  },
  bg: {
    backButton: "Върни се",
    sections: {
      request: "Ще ви помолим да",
      help: "... и ще ви помогнем"
    },
    steps: {
      interview: {
        title: "Интервю",
        description: "Интервюто ще бъде проведено от наш експерт в сектора. Ще продължи около 30 минути и ще се проведе онлайн. Ще обсъдим вашия трудов опит, технически и меки умения, и професионални стремежи. Ще ви зададем специфични въпроси за вашата област на експертиза, за да оценим нивото ви на подготовка."
      },
      videoSelfie: {
        title: "Видео селфи",
        description: "Видео селфито е кратко 2-3 минутно видео, в което се представяте. Това ни позволява да потвърдим вашата самоличност и да получим първо професионално впечатление. Ще ви предоставим подробни насоки как да го направите най-добре: кои аспекти да подчертаете, как да се представите, какъв фон да използвате и как да управлявате осветлението."
      },
      practicalTests: {
        title: "Практически тестове",
        description: "Практическите тестове са персонализирани според вашия професионален сектор. Например, ако сте програмист, ще ви помолим да решите някои проблеми с кодиране; ако сте графичен дизайнер, да създадете творчески проект. Тестовете са наблюдавани и сертифицирани, гарантирайки на работодателите автентичността на вашите умения."
      },
      languageTest: {
        title: "Езиков тест",
        description: "Ако търсите работа в чужбина, ще оценим вашето езиково ниво чрез кратко интервю на езика на страната на дестинация или на английски. Не се притеснявайте, ако не се чувствате уверени: ще ви осигурим преводач, който да ви помогне по време на интервюто. Освен това, ако е необходимо, ще ви предложим основен езиков курс."
      },
      curriculum: {
        title: "Създаване на професионална автобиография",
        description: "Нашият екип от експерти ще създаде професионална автобиография, оптимизирана за международния пазар на труда. Ще я създадем в три версии: на вашия роден език, на английски и на езика на страната на дестинация. Ще подчертаем вашите ключови умения, постижения и получени сертификати."
      },
      documentation: {
        title: "Проверка на необходимата документация",
        description: "Нашият правен експерт ще прегледа всички документи, необходими за работа в страната на дестинация: разрешение за работа, виза, документи за самоличност, професионални сертификати и техните преводи. Ще ви предоставим персонализиран списък с документи за подготовка."
      },
      interviewTips: {
        title: "Съвети за интервю",
        description: "Ще ви подготвим за интервюта за работа с персонализирани съвети. Ще обясним как да се представите ефективно, какво облекло да изберете и как да се справите с често задаваните въпроси. Ще предоставим насоки за културните особености на страната на дестинация."
      }
    },
    finalMessage: "След като подготвим вашия профил за представяне, ще потърсим налични възможности за работа"
  }
};

const CandidatePresentation: React.FC<CandidatePresentationProps> = ({ onBack, language, onVideoSelfieClick }) => {
  const [activeInfo, setActiveInfo] = useState<number | null>(null);
  const t = translations[language];

  const steps = [
    {
      section: t.sections.request,
      items: [
        {
          title: t.steps.interview.title,
          icon: <MessageSquareText className="w-10 h-10 text-blue-600" strokeWidth={1.5} />,
          description: t.steps.interview.description,
        },
        {
          title: t.steps.videoSelfie.title,
          icon: <Camera className="w-10 h-10 text-purple-600" strokeWidth={1.5} />,
          description: t.steps.videoSelfie.description,
        },
        {
          title: t.steps.practicalTests.title,
          icon: <Wrench className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />,
          description: t.steps.practicalTests.description,
        },
        {
          title: t.steps.languageTest.title,
          icon: <Languages className="w-10 h-10 text-orange-600" strokeWidth={1.5} />,
          description: t.steps.languageTest.description,
        }
      ]
    },
    {
      section: t.sections.help,
      items: [
        {
          title: t.steps.curriculum.title,
          icon: <FileText className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />,
          description: t.steps.curriculum.description,
        },
        {
          title: t.steps.documentation.title,
          icon: <Scale className="w-10 h-10 text-rose-600" strokeWidth={1.5} />,
          description: t.steps.documentation.description,
        },
        {
          title: t.steps.interviewTips.title,
          icon: <HelpCircle className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
          description: t.steps.interviewTips.description,
        }
      ]
    }
  ];

  return (
    <div className="bg-white">
      <main className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.section}
                </h2>
              </div>
              <div className="space-y-4">
                {section.items.map((step, stepIndex) => {
                  const index = sectionIndex * 10 + stepIndex;
                  const isActive = activeInfo === index;
                  const isVideoSelfie = step.title === t.steps.videoSelfie.title;
                  
                  return (
                    <div 
                      key={stepIndex}
                      className={`bg-white rounded-2xl shadow-sm p-4 ${isVideoSelfie ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                      onClick={() => {
                        if (isVideoSelfie) {
                          onVideoSelfieClick();
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                            {step.icon}
                          </div>
                          <span className="font-medium text-gray-900 text-lg">{step.title}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveInfo(isActive ? null : index);
                          }}
                          className="flex-shrink-0 w-8 h-8 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Info className="w-5 h-5" />
                        </button>
                      </div>
                      {isActive && (
                        <div className="mt-4 ml-20 text-gray-600 text-base leading-relaxed">
                          {step.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8 mb-8">
          <p className="text-lg text-gray-800 text-center">
            {t.finalMessage}
          </p>
        </div>
      </main>
    </div>
  );
};

export default CandidatePresentation; 