import React, { useState } from 'react';
import { InputForm } from '../components/InputForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { useTextAnalysis } from '../hooks/useTextAnalysis';
import { AlertCircle } from 'lucide-react';

export const DetectorView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [url, setUrl] = useState('');
  const { 
    results, 
    isAnalyzing, 
    error, 
    analyzeText, 
    fetchAndAnalyzeUrl 
  } = useTextAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      await fetchAndAnalyzeUrl(url);
    } else if (inputText) {
      analyzeText(inputText);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          AI Content Detector
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Analyze text to determine if it's written by AI or human, with detailed insights into the content's characteristics.
        </p>
      </section>

      <InputForm 
        inputText={inputText}
        setInputText={setInputText}
        url={url}
        setUrl={setUrl}
        onSubmit={handleSubmit}
        isAnalyzing={isAnalyzing}
      />

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {results && <ResultsDisplay results={results} />}
    </div>
  );
};