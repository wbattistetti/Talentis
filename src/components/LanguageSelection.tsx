import React from 'react';
import { IT, GB, BG, ES, FR, DE, PL, RO, PT, NL, GR, HU, CZ, SK, HR, SI, LT, LV, EE, MT } from 'country-flag-icons/react/3x2';
import { translations } from '../translations';
import { SupportedLanguage } from '../types';

interface LanguageSelectionProps {
  onLanguageSelect: (language: SupportedLanguage | null) => void;
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
  const italianLanguage = languages[0];

  const handleLanguageSelect = (code: string) => {
    // Convertiamo solo le lingue supportate
    if (code === 'it' || code === 'en' || code === 'bg') {
      onLanguageSelect(code as SupportedLanguage);
    } else {
      // Per le altre lingue, mostriamo un messaggio o gestiamo come preferisci
      alert('Questa lingua sarà presto disponibile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Pulsante italiano in evidenza */}
        <div className="text-center mb-8">
          <button
            onClick={() => handleLanguageSelect(italianLanguage.code)}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <div className="h-12 w-12 mr-4">
              {React.createElement(italianLanguage.flag)}
            </div>
            <span className="text-2xl font-bold">{italianLanguage.label}</span>
          </button>
        </div>

        {/* Separatore con testo */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-b from-blue-50 to-white text-lg text-gray-500">
              {translations.it.languageSelection.or}
            </span>
          </div>
        </div>

        {/* Griglia delle altre lingue */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.slice(1).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
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