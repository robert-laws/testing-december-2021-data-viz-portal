import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navigation = () => {
  const { logout, isLogoutPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className='app-navigation short-form'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/knowledge-base'>Knowledge Base</NavLink>
      {!user && <NavLink to='/login'>Login</NavLink>}
      {!user && <NavLink to='/signup'>Signup</NavLink>}
      {user && <NavLink to='/profile'>Profile</NavLink>}
      {user && (
        <button
          className={`${isLogoutPending && 'button-loading'}`}
          onClick={() => logout()}
        >
          <span className='button-text'>Logout</span>
        </button>
      )}
    </nav>
  );
};
