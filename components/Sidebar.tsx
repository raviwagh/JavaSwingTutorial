
import React from 'react';
import type { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  currentIndex: number;
  onSelectChapter: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, currentIndex, onSelectChapter }) => {
  return (
    <aside className="w-64 bg-slate-800 p-4 border-r border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">Chapters</h2>
      <nav>
        <ul>
          {chapters.map((chapter, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => onSelectChapter(index)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  currentIndex === index
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
