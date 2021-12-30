import { useState, useRef } from 'react';
import { useSignup } from '../hooks/useSignup';

export const Signup = () => {
  const formRef = useRef(null);

  const [signupUser, error, isPending] = useSignup();

  const [signup, setSignup] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    studentClass: '',
    major: '',
    meetingDay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signupUser(
      signup.email,
      signup.password,
      signup.firstName,
      signup.lastName,
      signup.studentClass,
      signup.major,
      signup.meetingDay
    );

    formRef.current.reset();
  };

  return (
    <div>
      <form className='app-form' onSubmit={handleSubmit} ref={formRef}>
        <h2>Signup</h2>
        <div className='fields'>
          <label>
            <span>email</span>
            <input
              type='email'
              name='email'
              value={signup.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='fields'>
          <label>
            <span>password</span>
            <input
              type='password'
              name='password'
              value={signup.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='fields'>
          <label>
            <span>first name</span>
            <input
              type='text'
              name='firstName'
              value={signup.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>last name</span>
            <input
              type='text'
              name='lastName'
              value={signup.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='fields'>
          <label>
            <span>class</span>
            <select
              value={signup.studentClass}
              name='studentClass'
              onChange={handleChange}
            >
              <option value='0'>Select your class</option>
              <option value='first-year'>first year</option>
              <option value='sophomore'>sophomore</option>
              <option value='junior'>junior</option>
              <option value='senior'>senior</option>
            </select>
          </label>
          <label>
            <span>major</span>
            <select value={signup.major} name='major' onChange={handleChange}>
              <option value='0'>Select your major</option>
              <option value='econ'>ECON</option>
              <option value='ipol'>IPOL</option>
              <option value='culp'>CULP</option>
              <option value='hist'>HIST</option>
            </select>
          </label>
          <label className='radio-group'>
            <span>Meeting Day</span>
            <div className='radio-buttons'>
              <label className='radio'>
                <input
                  type='radio'
                  name='meetingDay'
                  value='sunday'
                  checked={signup.meetingDay === 'sunday'}
                  onChange={handleChange}
                  className='form-check-input'
                />
                <span>Sunday</span>
              </label>
              <label className='radio'>
                <input
                  type='radio'
                  name='meetingDay'
                  value='wednesday'
                  checked={signup.meetingDay === 'wednesday'}
                  onChange={handleChange}
                  className='form-check-input'
                />
                <span>Wednesday</span>
              </label>
            </div>
          </label>
        </div>
        <div className='form-submit'>
          <button className={`${isPending && 'button-loading'}`}>
            <span className='button-text'>Signup</span>
          </button>
          {error && <span className='error'>{error}</span>}
        </div>
      </form>
    </div>
  );
};
