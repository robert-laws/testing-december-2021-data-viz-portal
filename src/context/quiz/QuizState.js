import { useReducer, useCallback } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import {
  COLLECTION_ERROR,
  LOAD_QUESTIONS,
  CLEAR_QUIZZES,
  LOAD_RESULTS,
  CLEAR_RESULTS,
  SAVING_COMPLETE,
} from '../types';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';

const db = getFirestore();

const QuizState = ({ children }) => {
  const initialState = {
    questions: [],
    results: [],
    error: null,
    isLoading: true,
    isSaving: true,
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
      // const queryRef = query(
      //   colRef,
      //   where('weekNumber', '==', weekNumber),
      //   orderBy('questionNumber', 'asc')
      // );

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
          dispatch({ type: LOAD_QUESTIONS, payload: allDocs });
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

  const loadResultsForUser = useCallback(
    async (userId) => {
      const colRef = collection(db, 'quiz-results');
      const queryRef = query(colRef, where('userId', '==', userId));

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
          dispatch({ type: LOAD_RESULTS, payload: allDocs });
        }
      } catch (error) {
        dispatch({
          type: COLLECTION_ERROR,
          payload: `Could not load the documents because: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const clearQuizzes = useCallback(() => {
    dispatch({ type: CLEAR_QUIZZES });
  }, [dispatch]);

  const clearResults = useCallback(() => {
    dispatch({ type: CLEAR_RESULTS });
  }, [dispatch]);

  const saveQuizResults = useCallback(
    async (answers) => {
      const colRef = collection(db, 'quiz-results');

      try {
        for (let i = 0; i < answers.length; i++) {
          await addDoc(colRef, answers[i]);
        }
        dispatch({ type: SAVING_COMPLETE });
      } catch (error) {
        dispatch({
          type: COLLECTION_ERROR,
          payload: `Could not add the documents because: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions: state.questions,
        results: state.results,
        error: state.error,
        isLoading: state.isLoading,
        isSaving: state.isSaving,
        loadQuizzes,
        clearQuizzes,
        loadResultsForUser,
        saveQuizResults,
        clearResults,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizState;
