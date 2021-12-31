import { useEffect } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuizContext } from '../hooks/useQuizContext';

export const Profile = () => {
  const { user, profile } = useCheckUser();
  const { documents, error, isLoading, loadQuizzes } = useQuizContext();

  useEffect(() => {
    if (user) {
      loadQuizzes('2');
    }
  }, [user, loadQuizzes]);

  return (
    <div>
      <h1>Your Profile</h1>
      {profile ? (
        <>
          <hr />
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          {user && <p>Email: {user.email}</p>}
          <p>Class: {profile.studentClass}</p>
          <p>Major: {profile.major}</p>
          <p>Meeting Day: {profile.meetingDay}</p>
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
      <hr />
      <h2>Quizzes</h2>
      {isLoading && <p>Loading...</p>}
      {!error && documents ? (
        <ul>
          {documents.map((document) => (
            <li key={document.id}>{document.questionText}</li>
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
