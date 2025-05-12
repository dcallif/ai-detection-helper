import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface AnalysisDetailProps {
  name: string;
  value: number; // 0-100
  description: string;
}

export const AnalysisDetail: React.FC<AnalysisDetailProps> = ({
  name,
  value,
  description
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getValueColor = () => {
    if (value <= 30) return 'text-green-600 dark:text-green-400';
    if (value <= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
          <div className="relative ml-1">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className="h-4 w-4" />
            </button>
            
            {showTooltip && (
              <div className="absolute z-10 w-64 p-2 text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 -left-12 -top-2 transform -translate-y-full">
                {description}
                <div className="absolute w-2 h-2 bg-white dark:bg-gray-700 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45 left-1/2 -ml-1 -bottom-1"></div>
              </div>
            )}
          </div>
        </div>
        <span className={`text-sm font-medium ${getValueColor()}`}>{value}%</span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${value}%`, 
            backgroundColor: value <= 30 ? '#10B981' : value <= 70 ? '#FBBF24' : '#EF4444' 
          }}
        ></div>
      </div>
    </div>
  );
};