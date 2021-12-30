import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const signupUser = async (
    email,
    password,
    firstName,
    lastName,
    studentClass,
    major
  ) => {
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

        const userUid = credential.user.uid;

        try {
          await setDoc(doc(db, 'users', userUid), {
            firstName,
            lastName,
            studentClass,
            major,
          });

          if (!isCancelled) {
            setError(null);
            setIsPending(false);
          }
        } catch (err) {
          if (!isCancelled) {
            setError(err.message);
            setIsPending(false);
          }
        }
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
