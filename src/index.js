import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import './firebase/config';
import App from './App';
import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import QuizState from './context/quiz/QuizState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <QuizState>
          <App />
        </QuizState>
      </UserState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
