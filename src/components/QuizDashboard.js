import { useEffect } from 'react';
import { useQuizContext } from '../hooks/useQuizContext';
import { QuizLinks } from './QuizLinks';

export const QuizDashboard = ({ user }) => {
  const { results, error, isLoading, loadResultsForUser } = useQuizContext();

  useEffect(() => {
    if (user) {
      loadResultsForUser(user.uid);
    }
  }, [user, loadResultsForUser]);

  return (
    <div>
      <h2>Quiz Dashboard</h2>
      {error && <p>{error}</p>}
      {!error && results && <QuizLinks userResults={results} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
