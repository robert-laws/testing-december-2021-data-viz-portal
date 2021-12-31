import { useReducer, useCallback } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { COLLECTION_ERROR, LOAD_DOCUMENTS } from '../types';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';

const db = getFirestore();

const QuizState = ({ children }) => {
  const initialState = {
    documents: [],
    error: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(colRef, (snapshot) => {
  //     let allDocs = [];
  //       if(snapshot.empty) {
  //         dispatch({
  //           type: COLLECTION_ERROR,
  //           payload: 'No Documents Found'
  //         });
  //       } else {
  //         snapshot.docs.forEach(doc => {
  //           allDocs.push({
  //             id: doc.id,
  //             ...doc.data()
  //           });
  //         dispatch({ type: LOAD_DOCUMENTS, payload: allDocs });
  //         })
  //       }
  //    }, (error) => {
  //      dispatch({ COLLECTION_ERROR, payload: `Could not load the documents: ${error.message}` });
  //    })

  //    return () => unsubscribe();
  //   }, []);

  const loadQuizzes = useCallback(
    async (weekNumber) => {
      const colRef = collection(db, 'quizzes');
      const queryRef = query(colRef, where('weekNumber', '==', weekNumber));

      try {
        const snapshot = await getDocs(queryRef);
        if (snapshot.empty) {
          dispatch({
            type: COLLECTION_ERROR,
            payload: 'No Documents Found',
          });
        } else {
          let allDocs = [];
          snapshot.docs.forEach((doc) => {
            allDocs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          dispatch({ type: LOAD_DOCUMENTS, payload: allDocs });
        }
      } catch (error) {
        dispatch({
          COLLECTION_ERROR,
          payload: `Could not load the documents: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        documents: state.documents,
        error: state.error,
        isLoading: state.isLoading,
        loadQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizState;
