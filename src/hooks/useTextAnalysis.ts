import { useState } from 'react';
import { analyzeContent } from '../utils/aiDetection';
import { AnalysisResults } from '../types/analysis';

export const useTextAnalysis = () => {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = (text: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Simulate API delay for demonstration purposes
      setTimeout(() => {
        const analysisResults = analyzeContent(text);
        setResults(analysisResults);
        setIsAnalyzing(false);
        
        // Save to history
        saveToHistory(text, analysisResults);
      }, 1500);
    } catch (err) {
      setError("Error analyzing text. Please try again.");
      setIsAnalyzing(false);
    }
  };

  const fetchAndAnalyzeUrl = async (url: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Simulate fetching and extracting content from URL
      setTimeout(() => {
        try {
          // Simulated AI-generated content with clear patterns and structures
          const extractedText = `The implementation of artificial intelligence in modern healthcare systems represents a significant advancement in medical technology. Through sophisticated algorithms and machine learning models, AI systems can analyze vast amounts of patient data with remarkable precision and efficiency.

          These systems continuously process medical records, diagnostic images, and clinical trials data, identifying patterns that might escape human observation. The neural networks employed in these applications have been trained on extensive datasets, enabling them to recognize subtle indicators of various medical conditions.

          Healthcare professionals increasingly rely on AI-powered diagnostic tools to support their decision-making processes. These tools can rapidly analyze medical imaging results, detect anomalies in laboratory tests, and predict potential health risks based on patient history. The systematic approach of these systems ensures consistent and reliable analysis across different cases.

          The future of AI in healthcare looks particularly promising, with ongoing developments in natural language processing and computer vision. These advancements will further enhance the capability of medical systems to interpret complex medical data and provide increasingly accurate diagnostic suggestions. The integration of such technology continues to transform the healthcare landscape, improving both efficiency and patient outcomes.`;
          
          const analysisResults = analyzeContent(extractedText);
          setResults(analysisResults);
          
          // Save to history
          saveToHistory(extractedText, analysisResults, url);
        } catch (e) {
          setError("Error processing URL content. Please try a different URL or paste the content directly.");
        }
        setIsAnalyzing(false);
      }, 2000);
    } catch (err) {
      setError("Error fetching URL content. Please check the URL and try again.");
      setIsAnalyzing(false);
    }
  };

  const saveToHistory = (
    content: string, 
    results: AnalysisResults, 
    url?: string
  ) => {
    const historyItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
      results,
      url
    };
    
    try {
      const historyData = localStorage.getItem('aiDetectorHistory');
      const history = historyData ? JSON.parse(historyData) : [];
      const updatedHistory = [historyItem, ...history].slice(0, 10); // Keep last 10 items
      localStorage.setItem('aiDetectorHistory', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving to history:', e);
    }
  };

  return {
    results,
    isAnalyzing,
    error,
    analyzeText,
    fetchAndAnalyzeUrl
  };
};