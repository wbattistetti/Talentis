import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Building2, 
  Lightbulb, 
  Globe, 
  Home, 
  Users, 
  Languages, 
  Scale, 
  CreditCard,
  CalendarClock
} from 'lucide-react';

interface SplashProps {
  onContinue: () => void;
  translations: any;
}

const Splash: React.FC<SplashProps> = ({ onContinue, translations }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const iconStyle = "w-8 h-8 text-blue-600 mb-2";
  const sectionStyle = "flex items-start space-x-4 mb-6";
  const textStyle = "text-gray-700";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="relative"
            initial={{ y: 0 }}
            animate={{ y: -160 }}
            transition={{ 
              duration: 0.8,
              delay: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {/* Logo */}
            <motion.div className="mb-[80px]">
              <motion.img
                layoutId="logo"
                src="/icons/Talentis Logo.png"
                alt="Talentis Logo"
                className="w-[300px] h-auto mx-auto"
                transition={{ 
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              />
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.4,
                delay: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold text-gray-900">
                {translations.splash.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-1">
                {translations.splash.description}
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                onClick={onContinue}
                className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {translations.splash.button}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Splash; 