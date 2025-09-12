"use client";

import React, { useState } from "react";
import { type PersonaMatcherStep, getPersonaMatcherConfig } from "./PersonaMatcherConfig";
import { PersonaMatcherForm } from "@/types/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";

interface PersonaMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PersonaMatcherForm) => void;
  step: PersonaMatcherStep;
}

const PersonaMatcher: React.FC<PersonaMatcherProps> = ({ isOpen, onClose, onSubmit, step }) => {
  const config = getPersonaMatcherConfig(step);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = config.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === config.questions.length - 1;
  const canProceed = currentQuestion?.required ? responses[currentQuestion.id] !== undefined : true;

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      onSubmit(responses as PersonaMatcherForm);
      setIsSubmitting(false);
      // Reset state
      setCurrentQuestionIndex(0);
      setResponses({});
    }, 1500);
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "single_choice":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <motion.label
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  responses[currentQuestion.id] === option.value
                    ? "border-color-state-info bg-color-state-info-bg shadow-md"
                    : "border-color-default hover:border-color-state-info-border hover:bg-color-subtle"
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={responses[currentQuestion.id] === option.value}
                  onChange={e => handleResponseChange(currentQuestion.id, e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      responses[currentQuestion.id] === option.value
                        ? "border-color-state-info bg-color-state-info"
                        : "border-color-strong"
                    }`}
                  >
                    {responses[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="font-medium text-color-primary">{option.text}</span>
                </div>
              </motion.label>
            ))}
          </div>
        );

      case "multiple_choice":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => {
              const currentValues = responses[currentQuestion.id] || [];
              const isSelected = currentValues.includes(option.value);

              return (
                <motion.label
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-color-state-info bg-color-state-info-bg shadow-md"
                      : "border-color-default hover:border-color-state-info-border hover:bg-color-subtle"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={e => {
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v: string) => v !== option.value);
                      handleResponseChange(currentQuestion.id, newValues);
                    }}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                        isSelected ? "border-color-state-info bg-color-state-info" : "border-color-strong"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-medium text-color-primary">{option.text}</span>
                  </div>
                </motion.label>
              );
            })}
          </div>
        );

      case "rating":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-color-tertiary">Meno</span>
              <span className="text-sm text-color-tertiary">Più</span>
            </div>
            <div className="flex justify-center space-x-2">
              {currentQuestion.options?.map(option => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleResponseChange(currentQuestion.id, option.value)}
                  className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
                    responses[currentQuestion.id] === option.value
                      ? "bg-color-state-info text-white shadow-lg"
                      : "bg-color-muted text-color-secondary hover:bg-gray-300"
                  }`}
                >
                  {option.value}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-center">
              {currentQuestion.options?.find(opt => opt.value === responses[currentQuestion.id])?.text && (
                <span className="text-sm text-color-state-info-strong font-medium">
                  {currentQuestion.options.find(opt => opt.value === responses[currentQuestion.id])?.text}
                </span>
              )}
            </div>
          </div>
        );

      case "text":
        return (
          <textarea
            value={responses[currentQuestion.id] || ""}
            onChange={e => handleResponseChange(currentQuestion.id, e.target.value)}
            placeholder="Descrivi le tue esigenze..."
            className="w-full p-4 border-2 border-color-default rounded-xl focus:border-color-state-info focus:outline-none resize-none"
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / config.questions.length) * 100;
  };

  const getStepIcon = () => {
    const icons = {
      1: "🎯",
      2: "⚙️",
      3: "🎨",
    };
    return icons[step] || "❓";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          /* Overlay: use inverse background token with opacity instead of raw black */
          className="fixed inset-0 bg-color-bg-inverse/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            /* Modal surface: semantic base background for light; token system swaps in dark mode */
            className="bg-color-base rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-color-border-default"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-apty-primary to-apty-secondary dark:from-apty-primary dark:to-apty-secondary text-white p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{getStepIcon()}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                  <p className="text-white/80">{config.description}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-2 rounded-full bg-color-state-info-border/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full bg-color-state-info"
                  />
                </div>
                <div className="flex justify-between text-xs font-medium tracking-wide text-white/80 mt-2">
                  <span>
                    Domanda {currentQuestionIndex + 1} di {config.questions.length}
                  </span>
                  <span>{Math.round(getProgressPercentage())}% completato</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitting ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-color-state-info-subtle rounded-full mb-4 border border-color-state-info-border">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-color-state-info border-t-transparent rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-color-primary mb-2">Analizzando le tue risposte...</h3>
                  <p className="text-color-tertiary">Stiamo elaborando la soluzione perfetta per te</p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Question */}
                  <div className="mb-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-color-state-info-subtle rounded-full flex items-center justify-center">
                        <span className="text-color-state-info-strong font-bold text-sm">
                          {currentQuestionIndex + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-color-primary mb-2">{currentQuestion?.question}</h3>
                        <div className="text-sm text-color-primary dark:text-white">
                          Categoria: {currentQuestion?.category}
                          {currentQuestion?.required && <span className="text-color-state-error ml-2">*</span>}
                        </div>
                      </div>
                    </div>

                    {/* Question Input */}
                    <div className="pl-11">{renderQuestionInput()}</div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {!isSubmitting && (
              <div className="flex items-center justify-between p-6 bg-color-subtle border-t border-color-border-default">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-colors ${
                    currentQuestionIndex === 0
                      ? "text-color-disabled cursor-not-allowed"
                      : "text-color-tertiary hover:text-color-primary hover:bg-color-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-state-info"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Precedente
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`flex items-center px-6 py-2 rounded-xl font-semibold transition-colors ${
                    canProceed
                      ? "bg-color-state-info text-color-text-inverse shadow-lg hover:bg-color-state-info-strong focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-state-info"
                      : "bg-color-border-strong text-color-tertiary cursor-not-allowed"
                  }`}
                >
                  {isLastQuestion ? "Ottieni Raccomandazione" : "Avanti"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonaMatcher;
