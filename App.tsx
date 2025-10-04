
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChapterContent from './components/ChapterContent';
import { fetchChapterContent } from './services/geminiService';
import type { Language, Chapter } from './types';
import { LANGUAGES, INITIAL_CHAPTERS } from './constants';

const App: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadChapterContent = useCallback(async (chapterIndex: number, language: Language) => {
    const chapter = chapters[chapterIndex];
    if (chapter.content.has(language.code)) {
      // Content already exists, no need to fetch
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const content = await fetchChapterContent(chapter.title, language.name, language.code);
      setChapters(prevChapters => {
        const newChapters = [...prevChapters];
        const updatedChapter = { ...newChapters[chapterIndex] };
        updatedChapter.content.set(language.code, content);
        newChapters[chapterIndex] = updatedChapter;
        return newChapters;
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [chapters]);

  useEffect(() => {
    loadChapterContent(currentChapterIndex, selectedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapterIndex, selectedLanguage]);


  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };
  
  const currentChapter = chapters[currentChapterIndex];
  const currentContent = currentChapter.content.get(selectedLanguage.code) || null;

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          chapters={chapters}
          currentIndex={currentChapterIndex}
          onSelectChapter={handleSelectChapter}
        />
        <ChapterContent
          title={currentChapter.title}
          content={currentContent}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default App;
