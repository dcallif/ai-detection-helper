import React from 'react';
import { ScanSearch } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'detector' | 'about' | 'history') => void;
  currentView: 'detector' | 'about' | 'history';
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('detector')}>
            <ScanSearch className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AI Detector</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('detector')}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                currentView === 'detector' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('history')}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                currentView === 'history' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              History
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                currentView === 'about' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};