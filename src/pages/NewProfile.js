import { useState } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { Sidebar, Content, Aside, Profile, Quizzes } from '../components';

export const NewProfile = () => {
  const { user, profile } = useCheckUser();
  const [currentTab, setCurrentTab] = useState('profile');

  const handleUpdateCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className='page'>
      <Sidebar
        userName={`${profile.firstName} ${profile.lastName}`}
        currentTab={currentTab}
        updateCurrentTab={handleUpdateCurrentTab}
      />
      <Content>
        {currentTab === 'profile' && (
          <Profile email={user.email} profile={profile} />
        )}
        {currentTab === 'polls' && <h2>Polls</h2>}
        {currentTab === 'quizzes' && <Quizzes user={user} />}
        {currentTab === 'dashboard' && <h2>Dashboard</h2>}
      </Content>
      <Aside />
    </div>
  );
};
