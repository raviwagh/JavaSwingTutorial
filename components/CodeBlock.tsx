
import React, { useState, useCallback, useEffect, useRef } from 'react';

// Let TypeScript know that hljs is available on the window object
declare global {
  interface Window {
    hljs: any;
  }
}

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && window.hljs) {
      window.hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="rounded-lg my-4 relative overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 bg-slate-600 hover:bg-sky-600 text-white text-xs font-semibold rounded-md transition-colors duration-200 z-10"
        aria-label="Copy code to clipboard"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="text-sm overflow-x-auto">
        <code ref={codeRef} className="language-java p-4 block">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
