import React from 'react';
import { Layout } from './components/Layout';
import { DetectorView } from './views/DetectorView';
import { AboutView } from './views/AboutView';
import { HistoryView } from './views/HistoryView';

function App() {
  const [currentView, setCurrentView] = React.useState<'detector' | 'about' | 'history'>('detector');

  return (
    <Layout onNavigate={setCurrentView} currentView={currentView}>
      {currentView === 'detector' ? (
        <DetectorView />
      ) : currentView === 'about' ? (
        <AboutView />
      ) : (
        <HistoryView />
      )}
    </Layout>
  );
}

export default App;