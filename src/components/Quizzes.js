import { useEffect } from 'react';
import { useQuizContext } from '../hooks/useQuizContext';
import { QuizList } from './QuizList';

export const Quizzes = ({ user, weekNumber }) => {
  const { questions, error, isLoading, loadQuizzes } = useQuizContext();

  useEffect(() => {
    if (user) {
      loadQuizzes(weekNumber);
    }
  }, [user, weekNumber, loadQuizzes]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && questions && <QuizList questions={questions} user={user} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
