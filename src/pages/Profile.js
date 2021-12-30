import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

export const Profile = () => {
  const { user } = useAuthContext();
  const { profile, loadProfile } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    } else if (!user) {
      navigate('/');
    }
  }, [user, profile, loadProfile, navigate]);

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
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
};
