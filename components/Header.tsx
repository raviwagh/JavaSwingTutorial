
import React from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

interface HeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedLanguage, onLanguageChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangCode = event.target.value;
    const newLang = LANGUAGES.find(lang => lang.code === selectedLangCode);
    if (newLang) {
      onLanguageChange(newLang);
    }
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 5.293z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-bold text-gray-100">Interactive Java Swing Tutorial</h1>
      </div>
      <div>
        <select
          value={selectedLanguage.code}
          onChange={handleSelectChange}
          className="bg-slate-700 text-white border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
