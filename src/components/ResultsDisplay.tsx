import React, { useState } from 'react';
import { AnalysisMeter } from './AnalysisMeter';
import { AnalysisDetail } from './AnalysisDetail';
import { Copy, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AnalysisResults } from '../types/analysis';

interface ResultsDisplayProps {
  results: AnalysisResults;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = () => {
    const resultText = `AI Probability: ${results.aiProbability}%\n${results.summary}`;
    navigator.clipboard.writeText(resultText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden animate-fadeIn">
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
        
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <AnalysisMeter probability={results.aiProbability} />
          </div>
          
          <div className="w-full sm:w-2/3 pl-0 sm:pl-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {results.aiProbability > 70 
                ? 'Likely AI Generated' 
                : results.aiProbability > 40 
                  ? 'Possibly AI Generated' 
                  : 'Likely Human Written'}
            </h3>
            <p className="text-gray-600 mb-4">{results.summary}</p>
            
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Results
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        <button
          onClick={toggleDetails}
          className="w-full px-6 py-3 text-left text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none flex justify-between items-center"
        >
          <span>Analysis Details</span>
          {showDetails ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {showDetails && (
          <div className="px-6 pb-6 pt-2 animate-slideDown">
            {results.indicators.map((indicator, index) => (
              <AnalysisDetail 
                key={index}
                name={indicator.name}
                value={indicator.value}
                description={indicator.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};