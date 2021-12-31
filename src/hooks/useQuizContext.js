import { useContext } from 'react';
import QuizContext from '../context/quiz/quizContext';

export const useQuizContext = () => {
  const quizContext = useContext(QuizContext);

  if (!quizContext) {
    throw new Error('useQuizContext must be used within an QuizProvider');
  }

  return quizContext;
};
