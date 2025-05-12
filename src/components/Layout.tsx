import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  onNavigate: (view: 'detector' | 'about' | 'history') => void;
  currentView: 'detector' | 'about' | 'history';
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onNavigate={onNavigate} currentView={currentView} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};