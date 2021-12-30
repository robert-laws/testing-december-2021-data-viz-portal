import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className='app-navigation'>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/signup'>Signup</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <button>Logout</button>
    </nav>
  );
};
