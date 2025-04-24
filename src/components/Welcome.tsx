import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  HardHat, 
  Building2, 
  Lightbulb, 
  Globe, 
  Home, 
  Users, 
  Languages, 
  Scale, 
  CreditCard,
  CalendarClock,
  Info,
  Plane
} from 'lucide-react';
import { ViewType } from './Navigation';
import { Translation } from '../types';

interface WelcomeProps {
  onViewChange: (view: ViewType) => void;
  translations: Translation;
}

const Welcome: React.FC<WelcomeProps> = ({ onViewChange, translations }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeTooltip && !(event.target as Element).closest('.info-icon-container')) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeTooltip]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Stili per le icone colorate
  const iconStyles = {
    fileText: "w-8 h-8 text-purple-600 mb-2",
    messageSquare: "w-8 h-8 text-blue-600 mb-2",
    hardHat: "w-8 h-8 text-yellow-600 mb-2",
    lightbulb: "w-8 h-8 text-amber-600 mb-2",
    building: "w-8 h-8 text-emerald-600 mb-2",
    home: "w-8 h-8 text-indigo-600 mb-2",
    plane: "w-8 h-8 text-sky-600 mb-2",
    scale: "w-8 h-8 text-rose-600 mb-2",
    languages: "w-8 h-8 text-teal-600 mb-2",
    users: "w-8 h-8 text-violet-600 mb-2",
    calendar: "w-8 h-8 text-blue-600 mb-2"
  };

  const sectionStyle = "flex items-start space-x-4 mb-6";
  const textStyle = "text-gray-700";
  const infoIconStyle = "w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer";

  const handleTooltipClick = (tooltipId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  const tooltipStyle = "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-50";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {translations.welcome.title}
            </h1>
            <p className="text-xl text-gray-600">
              {translations.welcome.subtitle}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            initial="initial"
            animate="animate"
          >
            <motion.div className={sectionStyle} variants={fadeInUp}>
              <MessageSquare className={iconStyles.messageSquare} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.interview.title}</h3>
                  <div className="relative info-icon-container">
                    <Info 
                      className={infoIconStyle} 
                      onClick={(e) => handleTooltipClick('interview', e)}
                    />
                    {activeTooltip === 'interview' && (
                      <div className={tooltipStyle}>
                        {translations.welcome.interview.tooltip}
                      </div>
                    )}
                  </div>
                </div>
                <p className={textStyle}>{translations.welcome.interview.description}</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <HardHat className={iconStyles.hardHat} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.skills.title}</h3>
                  <div className="relative info-icon-container">
                    <Info 
                      className={infoIconStyle} 
                      onClick={(e) => handleTooltipClick('skills', e)}
                    />
                    {activeTooltip === 'skills' && (
                      <div className={tooltipStyle}>
                        {translations.welcome.skills.tooltip}
                      </div>
                    )}
                  </div>
                </div>
                <p className={textStyle}>{translations.welcome.skills.description}</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <Lightbulb className={iconStyles.lightbulb} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.preparation.title}</h3>
                  <div className="relative info-icon-container">
                    <Info 
                      className={infoIconStyle} 
                      onClick={(e) => handleTooltipClick('preparation', e)}
                    />
                    {activeTooltip === 'preparation' && (
                      <div className={tooltipStyle}>
                        {translations.welcome.preparation.tooltip}
                      </div>
                    )}
                  </div>
                </div>
                <p className={textStyle}>{translations.welcome.preparation.description}</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <Building2 className={iconStyles.building} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.companies.title}</h3>
                  <div className="relative info-icon-container">
                    <Info 
                      className={infoIconStyle} 
                      onClick={(e) => handleTooltipClick('companies', e)}
                    />
                    {activeTooltip === 'companies' && (
                      <div className={tooltipStyle}>
                        {translations.welcome.companies.tooltip}
                      </div>
                    )}
                  </div>
                </div>
                <p className={textStyle}>{translations.welcome.companies.description}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-blue-50 p-6 rounded-lg mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-12 h-12 mr-3 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-green-400 opacity-20"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-green-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              {translations.welcome.abroad.title}
            </h2>

            <motion.div 
              className="space-y-6"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } }
              }}
              initial="initial"
              animate="animate"
            >
              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Home className={iconStyles.home} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.abroad.documentation.title}</h3>
                    <div className="relative info-icon-container">
                      <Info 
                        className={infoIconStyle} 
                        onClick={(e) => handleTooltipClick('documentation', e)}
                      />
                      {activeTooltip === 'documentation' && (
                        <div className={tooltipStyle}>
                          {translations.welcome.abroad.documentation.tooltip}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={textStyle}>{translations.welcome.abroad.documentation.description}</p>
                </div>
              </motion.div>

              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Plane className={iconStyles.plane} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.abroad.travel.title}</h3>
                    <div className="relative info-icon-container">
                      <Info 
                        className={infoIconStyle} 
                        onClick={(e) => handleTooltipClick('travel', e)}
                      />
                      {activeTooltip === 'travel' && (
                        <div className={tooltipStyle}>
                          {translations.welcome.abroad.travel.tooltip}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={textStyle}>{translations.welcome.abroad.travel.description}</p>
                </div>
              </motion.div>

              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Languages className={iconStyles.languages} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{translations.welcome.abroad.culture.title}</h3>
                    <div className="relative info-icon-container">
                      <Info 
                        className={infoIconStyle} 
                        onClick={(e) => handleTooltipClick('culture', e)}
                      />
                      {activeTooltip === 'culture' && (
                        <div className={tooltipStyle}>
                          {translations.welcome.abroad.culture.tooltip}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={textStyle}>{translations.welcome.abroad.culture.description}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-700 mb-6">
              {translations.welcome.registration.description}
            </p>
            <motion.button
              onClick={() => onViewChange('document')}
              className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.welcome.registration.button}
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              {translations.welcome.registration.note}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 

