import { useCheckUser } from '../hooks/useCheckUser';

export const Quiz = () => {
  useCheckUser();

  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
};
