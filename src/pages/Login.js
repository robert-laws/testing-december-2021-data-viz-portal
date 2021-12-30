import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, error, isPending] = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form className='app-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='fields'>
          <label>
            <span>email</span>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className='fields'>
          <label>
            <span>password</span>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className='form-submit'>
          <button className={`${isPending && 'button-loading'}`}>
            <span className='button-text'>Login</span>
          </button>
          {error && <span className='error'>{error}</span>}
        </div>
      </form>
    </div>
  );
};
