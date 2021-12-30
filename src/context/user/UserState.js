import { useReducer, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { LOAD_PROFILE, CLEAR_PROFILE, PROFILE_ERROR } from '../types';
import UserContext from './userContext';
import userReducer from './userReducer';

const db = getFirestore();

const UserState = ({ children }) => {
  const initialState = {
    profile: null,
    profileError: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadProfile = useCallback(
    async (uid) => {
      const docRef = doc(db, 'users', uid);

      try {
        const profileSnapshot = await getDoc(docRef);
        if (profileSnapshot.exists()) {
          const profile = profileSnapshot.data();
          dispatch({ type: LOAD_PROFILE, payload: profile });
        } else {
          dispatch({ type: PROFILE_ERROR, payload: 'Profile not found' });
        }
      } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: err.message });
      }
    },
    [dispatch]
  );

  const clearProfile = useCallback(() => {
    dispatch({ type: CLEAR_PROFILE });
  }, [dispatch]);

  return (
    <UserContext.Provider
      value={{
        profile: state.profile,
        profileError: state.profileError,
        loadProfile,
        clearProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
