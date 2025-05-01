import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import LanguageSelector from '../components/LanguageSelector';
import IMAGES from '../assets/images';

const Differences: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState(-1);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState<{ panel: number; item: number }>({ panel: -1, item: -1 });
  const [showSolution, setShowSolution] = useState(false);

  const initiatives = [
    {
      title: t('differences.initiatives.linkedin.title'),
      description: t('differences.initiatives.linkedin.description'),
      missing: t('differences.initiatives.linkedin.missing', { returnObjects: true }) as string[]
    },
    {
      title: t('differences.initiatives.ngo.title'),
      description: t('differences.initiatives.ngo.description'),
      missing: t('differences.initiatives.ngo.missing', { returnObjects: true }) as string[]
    },
    {
      title: t('differences.initiatives.portals.title'),
      description: t('differences.initiatives.portals.description'),
      missing: t('differences.initiatives.portals.missing', { returnObjects: true }) as string[]
    },
    {
      title: t('differences.initiatives.microcredit.title'),
      description: t('differences.initiatives.microcredit.description'),
      missing: t('differences.initiatives.microcredit.missing', { returnObjects: true }) as string[]
    }
  ];

  useEffect(() => {
    setIsHeaderVisible(true);
    
    const timer = setTimeout(() => {
      setActivePanel(0);
      setCurrentItemIndex({ panel: 0, item: 0 });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleItemComplete = () => {
    const currentPanel = currentItemIndex.panel;
    const currentItem = currentItemIndex.item;
    const maxItems = initiatives[currentPanel].missing.length + 1; // +1 for description

    setTimeout(() => {
      if (currentItem < maxItems - 1) {
        // Move to next item in current panel
        setCurrentItemIndex({ panel: currentPanel, item: currentItem + 1 });
      } else if (currentPanel < initiatives.length - 1) {
        // Move to next panel
        setActivePanel(currentPanel + 1);
        setCurrentItemIndex({ panel: currentPanel + 1, item: 0 });
      } else if (currentPanel === initiatives.length - 1) {
        // Show solution panel after last initiative panel is complete
        setShowSolution(true);
      }
    }, 1000);
  };

  const isItemVisible = (panelIndex: number, itemIndex: number) => {
    return currentItemIndex.panel > panelIndex || 
           (currentItemIndex.panel === panelIndex && currentItemIndex.item >= itemIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${IMAGES.background})` }}
      ></div>
      
      <LanguageSelector />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">{t('differences.title')}</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">{t('differences.subtitle')}</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative, panelIndex) => (
              <div 
                key={panelIndex}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-1000 transform ${
                  activePanel >= panelIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-full'
                }`}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{initiative.title}</h3>
                <div className="text-white mb-4">
                  {isItemVisible(panelIndex, 0) ? (
                    panelIndex === currentItemIndex.panel && currentItemIndex.item === 0 ? (
                      <TypewriterText
                        text={initiative.description}
                        delay={0}
                        typingSpeed={20}
                        onComplete={handleItemComplete}
                      />
                    ) : (
                      <p>{initiative.description}</p>
                    )
                  ) : null}
                </div>
                <ul className="space-y-2">
                  {initiative.missing.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white">
                      <span>•</span>
                      {isItemVisible(panelIndex, idx + 1) ? (
                        panelIndex === currentItemIndex.panel && currentItemIndex.item === idx + 1 ? (
                          <TypewriterText
                            text={point}
                            delay={0}
                            typingSpeed={20}
                            onComplete={handleItemComplete}
                          />
                        ) : (
                          <span>{point}</span>
                        )
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {showSolution && (
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-1000 transform opacity-100 translate-y-0">
              <h3 className="text-2xl font-bold mb-4 text-white">{t('differences.solution.title')}</h3>
              <TypewriterText
                text={t('differences.solution.description')}
                delay={0}
                typingSpeed={20}
                className="text-lg text-white leading-relaxed"
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-between max-w-5xl mx-auto mt-6">
          <button 
            onClick={() => navigate('/workers-2')}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Indietro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Differences;