import React, { useState } from 'react';

import { HelpCircle, Play, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const QuizGeneratorWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(5);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState(null);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    const data = await aiApi.generateQuiz(topic, difficulty, count);
    setQuiz(data.questions);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsGenerating(false);
  };

  const handleSelectOption = (optIdx) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19] relative">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-sm bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Quiz Generator</h2>
            <p className="text-xs text-slate-500">Test your knowledge with AI</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 flex flex-col items-center">
        
        {!quiz && (
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create a Quiz</h3>
            <p className="text-slate-500 mb-8">Enter any topic and AI will generate a custom multiple-choice quiz for you to practice.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Topic</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. World War II, JavaScript Closures..."
                  className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Difficulty</label>
                  <select 
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Questions</label>
                  <select 
                    value={count}
                    onChange={e => setCount(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none"
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={20}>20 Questions</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full py-4 rounded-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600 -cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Quiz...</>
                ) : (
                  <><Play className="w-5 h-5 fill-current" /> Start Quiz</>
                )}
              </button>
            </div>
          </div>
        )}

        {quiz && quiz.length === 0 && (
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Failed to Generate Quiz</h3>
            <p className="text-slate-500 mb-6">The AI could not generate questions for this topic. Please try a different topic or try again later.</p>
            <button onClick={() => setQuiz(null)} className="px-6 py-2 rounded-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600">Try Again</button>
          </div>
        )}

        {quiz && quiz.length > 0 && !showResults && (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Question {currentQuestionIdx + 1} of {quiz.length}</span>
              <button onClick={() => setQuiz(null)} className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Cancel</button>
            </div>
            
            <div 
              key={currentQuestionIdx}
              className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">{quiz[currentQuestionIdx].question}</h3>
              
              <div className="space-y-3">
                {quiz[currentQuestionIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-sm border-2  ${
                        isSelected 
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' 
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-200">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIdx] === undefined}
                  className="px-8 py-3 rounded-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600 -cyan-500/30 disabled:opacity-50"
                >
                  {currentQuestionIdx === quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showResults && quiz && quiz.length > 0 && (
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8 text-center">
            <div className="w-24 h-24 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 -cyan-500/20">
              <span className="text-3xl font-black">{getScore()}/{quiz.length}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h3>
            <p className="text-slate-500 mb-8">You scored {Math.round((getScore()/quiz.length)*100)}% on {topic}.</p>
            
            <div className="space-y-4 mb-8 text-left">
              {quiz.map((q, i) => {
                const isCorrect = selectedAnswers[i] === q.correctAnswer;
                return (
                  <div key={i} className={`p-4 rounded-sm border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{q.question}</p>
                        <p className="text-xs text-slate-500 mb-2">Your answer: {q.options[selectedAnswers[i]]}</p>
                        {!isCorrect && <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Correct: {q.options[q.correctAnswer]}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => setQuiz(null)} className="px-8 py-3 rounded-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" /> Try Another Topic
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizGeneratorWorkspace;
