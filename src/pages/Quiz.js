import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { Quizzes } from '../components';

export const Quiz = () => {
  const { user } = useCheckUser();
  const { weekNumber } = useParams();

  return (
    <div>
      <h1>Quiz for Week # {weekNumber}</h1>
      <Quizzes user={user} weekNumber={weekNumber} />
    </div>
  );
};
