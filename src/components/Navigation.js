import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export const Navigation = () => {
  const [logout] = useLogout();

  return (
    <nav className='app-navigation'>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/signup'>Signup</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  );
};
