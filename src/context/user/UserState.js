import { useReducer } from 'react';
import { getAuth } from 'firebase/user';
import { LOAD_PROFILE } from '../types';
import UserContext from './userContext';
import userReducer from './userReducer';

const UserState = ({ children }) => {};

export default UserState;
