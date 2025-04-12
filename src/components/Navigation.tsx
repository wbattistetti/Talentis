import React from 'react';
import { motion } from 'framer-motion';
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

export type ViewType = 'team' | 'candidate' | 'id-profile' | 'document' | 'home';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedLanguage: string | null;
  translations: any;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  selectedLanguage,
  translations
}) => {
  const handleBack = () => {
    if (currentView === 'candidate') {
      onViewChange('team');
    } else if (currentView === 'document') {
      onViewChange('team');
    } else if (currentView === 'id-profile') {
      onViewChange('candidate');
    }
  };

  const renderBackButton = () => {
    if (currentView === 'home' || currentView === 'team') return null;

    return (
      <motion.button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>{translations?.back || 'Back'}</span>
      </motion.button>
    );
  };

  const renderNavigationItems = () => {
    if (currentView === 'home') {
      return (
        <div className="flex space-x-4">
          <motion.button
            onClick={() => onViewChange('team')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5 mr-2" />
            <span>{translations?.team || 'Team'}</span>
          </motion.button>
        </div>
      );
    }

    if (currentView === 'team') {
      return (
        <div className="flex space-x-4">
          <motion.button
            onClick={() => onViewChange('candidate')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserSquare2 className="w-5 h-5 mr-2" />
            <span>{translations?.candidate || 'Candidate'}</span>
          </motion.button>
        </div>
      );
    }

    if (currentView === 'candidate') {
      return (
        <div className="flex space-x-4">
          <motion.button
            onClick={() => onViewChange('document')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-5 h-5 mr-2" />
            <span>{translations?.documents || 'Documents'}</span>
          </motion.button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        {renderBackButton()}
      </div>
      <div className="flex items-center space-x-4">
        {renderNavigationItems()}
      </div>
    </div>
  );
};

export default Navigation; 