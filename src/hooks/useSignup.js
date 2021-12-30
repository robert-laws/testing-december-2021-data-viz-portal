import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const auth = getAuth();

  const signupUser = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!credential) {
        throw new Error('User not created');
      } else {
        if (!isCancelled) {
          setError(null);
          setIsPending(false);
        }

        console.log('User created, ready to update profile');

        // try {
        //   await updateProfile(auth.currentUser, { displayName: displayName });

        //   if (!isCancelled) {
        //     setError(null);
        //     setIsPending(false);
        //   }
        // } catch (err) {
        //   if (!isCancelled) {
        //     setError(err.message);
        //     setIsPending(false);
        //   }
        // }
      }
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
  });

  return [signupUser, error, isPending];
};
