export interface AnalysisIndicator {
  name: string;
  value: number; // 0-100 scale
  description: string;
}

export interface AnalysisResults {
  aiProbability: number; // 0-100 scale
  summary: string;
  indicators: AnalysisIndicator[];
}

export interface HistoryItem {
  id: number;
  date: string;
  content: string;
  results: AnalysisResults;
  url?: string;
}