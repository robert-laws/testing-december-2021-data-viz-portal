import { useEffect } from 'react';
import { useQuizContext } from '../hooks/useQuizContext';
import { QuizList } from './QuizList';

export const Quizzes = ({ user }) => {
  const { questions, results, error, isLoading, loadQuizzes } =
    useQuizContext();

  useEffect(() => {
    if (user) {
      loadQuizzes('1');
    }
  }, [user, loadQuizzes]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && questions && (
        <QuizList weekNumber={'1'} questions={questions} />
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
