import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import Button from '../ui/Button';

const InteractiveQuiz = ({ data }) => {
  const questions = data?.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!questions.length) return null;

  const currentQ = questions[currentIndex];
  const selectedOpt = selectedAnswers[currentIndex];
  const isAnswered = selectedOpt !== undefined;

  const handleSelectOption = (optIdx) => {
    if (isAnswered) return;
    const updated = { ...selectedAnswers, [currentIndex]: optIdx };
    setSelectedAnswers(updated);
    setShowExplanation({ ...showExplanation, [currentIndex]: true });

    if (Object.keys(updated).length === questions.length) {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setQuizCompleted(false);
  };

  return (
    <div className="my-3 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-sm space-y-4 max-w-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Interactive Quiz ({currentIndex + 1} / {questions.length})</span>
        </div>
        {quizCompleted && (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>Score: {calculateScore()} / {questions.length}</span>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-2">
          {currentQ.options?.map((opt, optIdx) => {
            const isSelected = selectedOpt === optIdx;
            const isCorrect = optIdx === currentQ.correctAnswer;
            let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
              } else if (isSelected) {
                btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-medium';
              } else {
                btnStyle = 'border-slate-200 dark:border-slate-800 opacity-60 bg-white dark:bg-slate-900';
              }
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {isAnswered && currentQ.explanation && (
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <p className="font-semibold text-blue-700 dark:text-blue-400">💡 Explanation:</p>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
        >
          Previous
        </Button>

        {quizCompleted ? (
          <Button variant="primary" size="sm" icon={RotateCcw} onClick={handleRestart}>
            Try Again
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(prev => prev + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;
