
import React from 'react';
import CodeBlock from './CodeBlock';
import LoadingSpinner from './LoadingSpinner';

interface ChapterContentProps {
  content: string | null;
  isLoading: boolean;
  error: string | null;
  title: string;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ content, isLoading, error, title }) => {

  const renderContent = () => {
    if (!content) return null;

    // Split content by Java code blocks, keeping the delimiters
    const parts = content.split(/(\`\`\`java[\s\S]*?\`\`\`)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```java')) {
        const code = part.replace('```java\n', '').replace('\n```', '').trim();
        return <CodeBlock key={index} code={code} />;
      }
      // Replace markdown-style headings with styled divs
      const formattedPart = part
        .split('\n')
        .map((line, lineIndex) => {
          if (line.startsWith('### ')) {
            return <h3 key={lineIndex} className="text-xl font-semibold mt-6 mb-2 text-sky-300">{line.substring(4)}</h3>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={lineIndex} className="text-2xl font-bold mt-8 mb-3 text-sky-400">{line.substring(3)}</h2>;
          }
           if (line.startsWith('# ')) {
            return <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4 text-sky-500">{line.substring(2)}</h1>;
          }
          if (line.trim().startsWith('* ')) {
             return <li key={lineIndex} className="ml-5 list-disc">{line.substring(2)}</li>
          }
          return <p key={lineIndex} className="my-2 leading-relaxed">{line}</p>;
        });

      return <div key={index}>{formattedPart}</div>;
    });
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b-2 border-slate-700 pb-4 text-gray-100">{title}</h1>
        {isLoading && <LoadingSpinner />}
        {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md">{error}</div>}
        {!isLoading && !error && content && (
          <article className="prose prose-invert max-w-none prose-p:text-gray-300">
             {renderContent()}
          </article>
        )}
      </div>
    </main>
  );
};

export default ChapterContent;
