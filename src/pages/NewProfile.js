import { useState } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { Sidebar, Content, Aside, Profile, QuizDashboard } from '../components';

export const NewProfile = () => {
  const { user, profile } = useCheckUser();
  const [currentTab, setCurrentTab] = useState('profile');

  const handleUpdateCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className='page'>
      {profile && (
        <Sidebar
          userName={profile && `${profile.firstName} ${profile.lastName}`}
          currentTab={currentTab}
          updateCurrentTab={handleUpdateCurrentTab}
        />
      )}
      <Content>
        {currentTab === 'profile' && (
          <Profile email={user.email} profile={profile} />
        )}
        {currentTab === 'polls' && <h2>Polls</h2>}
        {currentTab === 'quizzes' && <QuizDashboard user={user} />}
        {currentTab === 'dashboard' && <h2>Dashboard</h2>}
      </Content>
      <Aside />
    </div>
  );
};
