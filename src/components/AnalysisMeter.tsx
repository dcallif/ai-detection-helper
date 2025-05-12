import React, { useEffect, useState } from 'react';

interface AnalysisMeterProps {
  probability: number; // 0-100
}

export const AnalysisMeter: React.FC<AnalysisMeterProps> = ({ probability }) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  // Animate the meter filling up
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(probability);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [probability]);

  // Determine color based on probability
  const getColor = () => {
    if (probability <= 30) return '#10B981'; // success/green
    if (probability <= 70) return '#FBBF24'; // warning/yellow
    return '#EF4444'; // error/red
  };

  const getLabel = () => {
    if (probability <= 30) return 'Human';
    if (probability <= 70) return 'Uncertain';
    return 'AI';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          
          {/* Progress circle - using stroke-dasharray and stroke-dashoffset for animation */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * currentValue) / 100}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Percentage display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: getColor() }}>
            {Math.round(currentValue)}%
          </span>
          <span className="text-sm text-gray-600">{getLabel()}</span>
        </div>
      </div>
    </div>
  );
};