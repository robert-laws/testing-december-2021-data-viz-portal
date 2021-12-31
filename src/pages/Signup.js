import { useState, useRef } from 'react';
import { useSignup } from '../hooks/useSignup';
import Select from 'react-select';

const studentClasses = [
  { value: 'first-year', label: 'First Year' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
];

const majors = [
  { value: 'ipol', label: 'IPOL' },
  { value: 'culp', label: 'CULP' },
  { value: 'econ', label: 'ECON' },
  { value: 'hist', label: 'HIST' },
];

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
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!signup.studentClass) {
      setFormError('Please select a class');
      return;
    }

    if (!signup.major) {
      setFormError('Please select a major');
      return;
    }

    if (!signup.meetingDay) {
      setFormError('Please select a meeting day');
      return;
    }

    signupUser(signup);

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
              required
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
              required
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
              required
              type='text'
              name='firstName'
              value={signup.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>last name</span>
            <input
              required
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
            <Select
              options={studentClasses}
              onChange={(option) =>
                setSignup({ ...signup, studentClass: option.value })
              }
            />
          </label>
          <label>
            <span>major</span>
            <Select
              options={majors}
              onChange={(option) =>
                setSignup({ ...signup, major: option.value })
              }
            />
          </label>
          <label className='radio-group'>
            <span>class meeting day</span>
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
          {formError && <span className='error-text'>{formError}</span>}
          {error && <span className='error-text'>{error}</span>}
        </div>
      </form>
    </div>
  );
};
