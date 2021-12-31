import { COLLECTION_ERROR, LOAD_DOCUMENTS } from '../types';

const quizReducer = (state, action) => {
  switch (action.type) {
    case COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case LOAD_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default quizReducer;
