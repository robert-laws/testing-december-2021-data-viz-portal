import { useCheckUser } from '../hooks/useCheckUser';

export const Poll = () => {
  useCheckUser();

  return (
    <div>
      <h1>Poll</h1>
    </div>
  );
};
