import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navigation = () => {
  const [logout] = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className='app-navigation'>
      <NavLink to='/'>Home</NavLink>
      {!user && <NavLink to='/login'>Login</NavLink>}
      {!user && <NavLink to='/signup'>Signup</NavLink>}
      {user && <NavLink to='/profile'>Profile</NavLink>}
      {user && <button onClick={() => logout()}>Logout</button>}
    </nav>
  );
};
