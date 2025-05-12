import React from 'react';
import { HistoryItem } from '../types/analysis';
import { Clock, Link, Trash2, Copy, CheckCircle } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const historyData = localStorage.getItem('aiDetectorHistory');
    if (historyData) {
      setHistory(JSON.parse(historyData));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('aiDetectorHistory');
    setHistory([]);
  };

  const deleteHistoryItem = (id: number) => {
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem('aiDetectorHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const copyContent = async (id: number, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  if (history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No history yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start analyzing content to build your history.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analysis History</h1>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Clear All History
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()} at{' '}
                  {new Date(item.date).toLocaleTimeString()}
                </span>
                {item.url && (
                  <div className="flex items-center text-sm text-blue-600">
                    <Link className="h-4 w-4 mr-1" />
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyContent(item.id, item.content)}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center"
                  title="Copy content"
                >
                  {copiedId === item.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => deleteHistoryItem(item.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Delete from history"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-800 line-clamp-2">{item.content}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    item.results.aiProbability > 70
                      ? 'bg-red-500'
                      : item.results.aiProbability > 30
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <span className="text-sm font-medium text-gray-900">
                  {item.results.aiProbability}% AI Probability
                </span>
              </div>
              <span className="text-sm text-gray-500">{item.results.summary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}