import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {year} AI Detector. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};