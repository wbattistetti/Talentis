import React from 'react';
import { IT, GB, BG, ES, FR, DE, PL, RO, PT, NL, GR, HU, CZ, SK, HR, SI, LT, LV, EE, MT } from 'country-flag-icons/react/3x2';
import { SupportedLanguage } from '../types';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'it', label: 'Parlo italiano', flag: IT },
  { code: 'en', label: 'I speak English', flag: GB },
  { code: 'bg', label: 'Говоря български', flag: BG },
  { code: 'es', label: 'Hablo español', flag: ES },
  { code: 'fr', label: 'Je parle français', flag: FR },
  { code: 'de', label: 'Ich spreche Deutsch', flag: DE },
  { code: 'pl', label: 'Mówię po polsku', flag: PL },
  { code: 'ro', label: 'Vorbesc română', flag: RO },
  { code: 'pt', label: 'Falo português', flag: PT },
  { code: 'nl', label: 'Ik spreek Nederlands', flag: NL },
  { code: 'gr', label: 'Μιλάω ελληνικά', flag: GR },
  { code: 'hu', label: 'Magyarul beszélek', flag: HU },
  { code: 'cz', label: 'Mluvím česky', flag: CZ },
  { code: 'sk', label: 'Hovorím po slovensky', flag: SK },
  { code: 'hr', label: 'Govorim hrvatski', flag: HR },
  { code: 'si', label: 'Govorim slovensko', flag: SI },
  { code: 'lt', label: 'Kalbu lietuviškai', flag: LT },
  { code: 'lv', label: 'Runāju latviski', flag: LV },
  { code: 'ee', label: 'Räägin eesti keelt', flag: EE },
  { code: 'mt', label: 'Nitkellem bil-Malti', flag: MT }
];

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="h-8 w-8">
                  {React.createElement(lang.flag)}
                </div>
                <span className="text-lg font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection; 