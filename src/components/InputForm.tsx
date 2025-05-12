import React, { useState } from 'react';
import { Upload, Link, RefreshCw } from 'lucide-react';

interface InputFormProps {
  inputText: string;
  setInputText: (text: string) => void;
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  inputText,
  setInputText,
  url,
  setUrl,
  onSubmit,
  isAnalyzing
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');

  const handleTabClick = (mode: 'text' | 'url') => {
    setInputMode(mode);
    // Clear inputs when switching tabs
    if (mode === 'text') setUrl('');
    if (mode === 'url') setInputText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            inputMode === 'text'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          } transition-colors duration-200`}
          onClick={() => handleTabClick('text')}
        >
          <div className="flex items-center justify-center">
            <Upload className="h-4 w-4 mr-2" />
            <span>Paste Text</span>
          </div>
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            inputMode === 'url'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          } transition-colors duration-200`}
          onClick={() => handleTabClick('url')}
        >
          <div className="flex items-center justify-center">
            <Link className="h-4 w-4 mr-2" />
            <span>Enter URL</span>
          </div>
        </button>
      </div>

      <form onSubmit={onSubmit} className="p-6">
        {inputMode === 'text' ? (
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paste your text here:
            </label>
            <textarea
              id="inputText"
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              placeholder="Enter the text you want to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isAnalyzing}
            ></textarea>
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="urlInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter URL to analyze:
            </label>
            <input
              type="url"
              id="urlInput"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              We'll extract and analyze the main content from the provided URL.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnalyzing || (inputMode === 'text' ? !inputText : !url)}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              'Analyze Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};