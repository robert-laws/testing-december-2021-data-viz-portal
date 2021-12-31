import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLogoutPending, setIsLogoutPending] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsLogoutPending(true);

    try {
      await signOut(auth);

      if (!isCancelled) {
        setError(null);
        setIsLogoutPending(false);
      }

      navigate('/');
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsLogoutPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, error, isLogoutPending };
};
