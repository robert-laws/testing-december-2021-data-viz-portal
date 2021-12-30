import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, error] = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form className='app-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          <span>email</span>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>password</span>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className='form-submit'>
          <button>Login</button>
          {error && <span className='error'>{error}</span>}
        </div>
      </form>
    </div>
  );
};
