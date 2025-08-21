import React from "react";

export type AnswerCardProps = {
  finalAnswer: string;
  explanation: string;
  question?: string;
  timestamp?: string;
};

const AnswerCard: React.FC<AnswerCardProps> = ({ finalAnswer, explanation, question, timestamp }) => {
  return (
    <article className="card p-5 space-y-3">
      {question && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Q: {question}</p>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Final Answer</h3>
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{finalAnswer}</p>
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-3">Explanation</h4>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{explanation}</p>
      {timestamp && (
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">{timestamp}</div>
      )}
    </article>
  );
};

export default AnswerCard;


