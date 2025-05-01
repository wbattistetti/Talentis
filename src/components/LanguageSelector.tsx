import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-6 right-6 z-10" ref={dropdownRef}>
      <div 
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md cursor-pointer hover:bg-white/100 transition-all duration-300"
        onClick={() => setDropdownOpen(prev => !prev)}
      >
        <span className="text-xl">{currentLang.flag}</span>
        <span className="font-medium text-gray-800">{currentLang.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn">
          {LANGUAGES.filter(l => l.code !== i18n.language).map(lang => (
            <div
              key={lang.code}
              className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => { 
                i18n.changeLanguage(lang.code); 
                setDropdownOpen(false); 
              }}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium text-gray-800">{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;