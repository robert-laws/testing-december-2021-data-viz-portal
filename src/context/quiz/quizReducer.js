import {
  COLLECTION_ERROR,
  LOAD_QUESTIONS,
  LOAD_RESULTS,
  CLEAR_QUIZZES,
  CLEAR_RESULTS,
} from '../types';

const quizReducer = (state, action) => {
  switch (action.type) {
    case COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        error: null,
        isLoading: false,
      };

    case CLEAR_QUIZZES:
      return {
        ...state,
        documents: [],
        error: null,
        isLoading: true,
      };

    case LOAD_RESULTS:
      return {
        ...state,
        results: action.payload,
        error: null,
        isLoading: false,
      };

    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        error: null,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default quizReducer;
