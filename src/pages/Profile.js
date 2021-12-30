import { useCheckUser } from '../hooks/useCheckUser';

export const Profile = () => {
  const { user, profile } = useCheckUser();

  return (
    <div>
      <h1>User Profile</h1>
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
    </div>
  );
};
