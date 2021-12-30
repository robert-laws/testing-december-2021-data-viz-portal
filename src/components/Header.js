import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header>
      <div className='app-header'>
        <div className='branding'>
          <h1>
            <Link to='/'>Data Viz Portal</Link>
          </h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
