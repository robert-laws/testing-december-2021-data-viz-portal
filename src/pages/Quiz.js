import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuizContext } from '../hooks/useQuizContext';
import { QuizList } from '../components';

export const Quiz = () => {
  const { user } = useCheckUser();
  const { weekNumber } = useParams();
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
