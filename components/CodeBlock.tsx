
import React, { useState, useCallback } from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="bg-slate-800 rounded-lg my-4 relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 bg-slate-600 hover:bg-sky-600 text-white text-xs font-semibold rounded-md transition-colors duration-200"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="p-4 text-sm overflow-x-auto text-gray-200">
        <code className="language-java">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
