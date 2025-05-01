import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import IMAGES from '../assets/images';

interface SplashProps {
  onVisionClick?: () => void;
}

const Splash: React.FC<SplashProps> = ({ onVisionClick }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVisionClick = () => {
    if (onVisionClick) {
      onVisionClick();
    } else {
      navigate('/vision');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-900">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${IMAGES.background})` }}
      ></div>
      
      <LanguageSelector />
      
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center">
          <img 
            src={IMAGES.logoWhite} 
            alt="Talentis Logo" 
            className="w-[420px] max-w-full mx-auto mb-4 animate-fadeIn"
            style={{ background: 'transparent' }}
          />
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-12 animate-fadeInDelay">
            {t('splash.subtitle')}
          </p>
          <button 
            onClick={handleVisionClick}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold tracking-wide transition-all duration-300 animate-fadeInLong hover:bg-white/10 hover:shadow-xl backdrop-blur-none"
          >
            {t('splash.vision')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;