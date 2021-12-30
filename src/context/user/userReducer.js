import { LOAD_PROFILE, CLEAR_PROFILE, PROFILE_ERROR } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        profile: action.payload,
        profileError: null,
      };

    case CLEAR_PROFILE:
      return {
        profile: null,
        profileError: null,
      };

    case PROFILE_ERROR:
      return {
        profile: null,
        profileError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
