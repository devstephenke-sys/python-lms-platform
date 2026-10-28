'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Trophy } from 'lucide-react';
import { Quiz, Question } from '@/types';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number, total: number) => void;
}

export default function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    onComplete(correctCount, quiz.questions.length);
  };

  const getScoreColor = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (showResults) {
    const percentage = ((score / quiz.questions.length) * 100).toFixed(0);
    const passed = parseInt(percentage) >= 70;

    return (
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--primary)]/10 mb-4">
            <Trophy className={`h-10 w-10 ${passed ? 'text-[var(--accent)]' : 'text-[var(--foreground)]/40'}`} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score}/{quiz.questions.length}
          </div>
          <p className="text-lg text-[var(--foreground)]/70 mb-6">
            {passed ? '🎉 Congratulations! You passed!' : 'Keep practicing! You need 70% to pass.'}
          </p>

          <div className="space-y-4 text-left max-w-md mx-auto">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-[var(--foreground)]/60 mb-2">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-[var(--accent)]">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-[var(--foreground)]/40 mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Quiz</h3>
        <div className="text-sm text-[var(--foreground)]/60">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg mb-4">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion.id] === index;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[var(--primary)] bg-[var(--primary)]'
                        : 'border-[var(--foreground)]/30'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--card-bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion.id] === undefined}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
