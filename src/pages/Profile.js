import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

export const Profile = () => {
  const { user } = useAuthContext();
  const { profile, loadProfile } = useUserContext();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    }
  }, [user, profile, loadProfile]);

  return (
    <div>
      <h1>User Profile</h1>
      {profile && (
        <>
          <hr />
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          {user && <p>Email: {user.email}</p>}
          <p>Class: {profile.studentClass}</p>
          <p>Major: {profile.major}</p>
        </>
      )}
    </div>
  );
};
