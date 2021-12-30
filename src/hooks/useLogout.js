import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }

      navigate('/', { replace: true });
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return [logout, error, isPending];
};
