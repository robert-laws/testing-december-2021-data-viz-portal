import DashboardIcon from '../assets/icons/space_dashboard_black_24dp.svg';
import PollIcon from '../assets/icons/poll_black_24dp.svg';
import ProfileIcon from '../assets/icons/account_box_black_24dp.svg';
import QuizIcon from '../assets/icons/quiz_black_24dp.svg';
import WelcomeUser from '../assets/icons/account_circle_black_24dp.svg';

export const Sidebar = ({ userName, currentTab, updateCurrentTab }) => {
  return (
    <aside className='left-sidebar'>
      <div className='user'>
        <img src={WelcomeUser} alt='User Icon' />
        <p>Welcome, {userName}</p>
      </div>
      <nav className='links'>
        <div
          name='profile'
          className={`link ${currentTab === 'profile' ? 'active-link' : ''}`}
          onClick={() => updateCurrentTab('profile')}
        >
          <img src={ProfileIcon} alt='profile icon' />
          <span>Your Profile</span>
        </div>

        <div
          name='polls'
          className={`link ${currentTab === 'polls' ? 'active-link' : ''}`}
          onClick={() => updateCurrentTab('polls')}
        >
          <img src={PollIcon} alt='poll icon' />
          <span>Polls</span>
        </div>

        <div
          name='quizzes'
          className={`link ${currentTab === 'quizzes' ? 'active-link' : ''}`}
          onClick={() => updateCurrentTab('quizzes')}
        >
          <img src={QuizIcon} alt='quiz icon' />
          <span>Quizzes</span>
        </div>

        <div
          name='dashboard'
          className={`link ${currentTab === 'dashboard' ? 'active-link' : ''}`}
          onClick={() => updateCurrentTab('dashboard')}
        >
          <img src={DashboardIcon} alt='dashboard icon' />
          <span>Dashboard</span>
        </div>
      </nav>
    </aside>
  );
};
