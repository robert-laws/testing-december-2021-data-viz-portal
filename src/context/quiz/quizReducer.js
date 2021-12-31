import { COLLECTION_ERROR, LOAD_DOCUMENTS, CLEAR_DOCUMENTS } from '../types';

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
        documents: action.payload,
        error: null,
        isLoading: false,
      };

    case CLEAR_DOCUMENTS:
      return {
        documents: [],
        error: null,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default quizReducer;
