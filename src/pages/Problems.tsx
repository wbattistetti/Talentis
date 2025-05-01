import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import IMAGES from '../assets/images';
import { VisionStep } from '../types';
import LanguageSelector from '../components/LanguageSelector';

const Problems: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currentHighlightPanel, setCurrentHighlightPanel] = useState(-1);

  const problemSteps: VisionStep[] = [
    {
      icon: IMAGES.workers,
      title: t('problems.steps.0.title'),
      description: t('problems.steps.0.description'),
      keywords: t('problems.steps.0.keywords', { returnObjects: true }) as string[]
    },
    {
      icon: IMAGES.training,
      title: t('problems.steps.1.title'),
      description: t('problems.steps.1.description'),
      keywords: t('problems.steps.1.keywords', { returnObjects: true }) as string[]
    },
    {
      icon: IMAGES.illegal,
      title: t('problems.steps.2.title'),
      description: t('problems.steps.2.description'),
      keywords: t('problems.steps.2.keywords', { returnObjects: true }) as string[]
    },
    {
      icon: IMAGES.identification,
      title: t('problems.steps.3.title'),
      description: t('problems.steps.3.description'),
      keywords: t('problems.steps.3.keywords', { returnObjects: true }) as string[]
    },
    {
      icon: IMAGES.politics,
      title: t('problems.steps.4.title'),
      description: t('problems.steps.4.description'),
      keywords: t('problems.steps.4.keywords', { returnObjects: true }) as string[]
    }
  ];

  const startSequence = useCallback(() => {
    setIsHeaderVisible(true);
    setTimeout(() => {
      setActiveSteps([0]);
    }, 1000);
  }, []);

  useEffect(() => {
    startSequence();
  }, [startSequence]);

  useEffect(() => {
    const lastStep = activeSteps[activeSteps.length - 1];
    
    if (lastStep !== undefined && lastStep < problemSteps.length - 1) {
      const timer = setTimeout(() => {
        setActiveSteps(prev => [...prev, lastStep + 1]);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (lastStep === problemSteps.length - 1) {
      const timer = setTimeout(() => {
        startKeywordHighlighting();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeSteps, problemSteps.length]);

  const startKeywordHighlighting = () => {
    let currentPanel = 0;
    
    const highlightNextPanel = () => {
      if (currentPanel >= problemSteps.length) {
        setTimeout(() => setShowNextButton(true), 1000);
        return;
      }
      
      setCurrentHighlightPanel(currentPanel);
      
      setTimeout(() => {
        currentPanel++;
        highlightNextPanel();
      }, 2000);
    };
    
    highlightNextPanel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${IMAGES.background})` }}
      ></div>
      
      <LanguageSelector />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className={`text-center mb-8 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t('problems.title')}</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">{t('problems.subtitle')}</p>
        </div>
        
        <div className="max-w-5xl mx-auto mt-8">
          {problemSteps.map((step, index) => (
            <div 
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center gap-4 transition-all duration-1000 ${
                activeSteps.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                <img 
                  src={step.icon} 
                  alt={step.title} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                {activeSteps.includes(index) && (
                  <TypewriterText 
                    text={step.description}
                    delay={1000}
                    typingSpeed={20}
                    keywords={step.keywords}
                    showKeywords={currentHighlightPanel >= index}
                    className="text-lg text-blue-100 leading-relaxed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between max-w-5xl mx-auto mt-6">
          <button 
            onClick={() => navigate('/vision')}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Indietro
          </button>
          
          {showNextButton && (
            <button 
              onClick={() => navigate('/companies')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold transition-all duration-300"
            >
              {t('problems.next')}
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;