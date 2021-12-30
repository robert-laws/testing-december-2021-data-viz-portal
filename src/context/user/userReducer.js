import { SIGNUP } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
