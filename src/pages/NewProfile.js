import { useState, useEffect } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuizContext } from '../hooks/useQuizContext';
import { Sidebar, Content, Aside, Profile, QuizLinks } from '../components';

const quizSchedule = [
  {
    weekNumber: '1',
    topic: 'Basics of Data Visualization',
    openDate: '2021-12-02T00:00:00.00',
  },
  { weekNumber: '2', topic: 'Datasets', openDate: '2021-12-08T00:00:00.00' },
  { weekNumber: '3', topic: 'Time Series', openDate: '2021-12-15T00:00:00.00' },
  { weekNumber: '4', topic: 'Geo-data', openDate: '2022-01-22T00:00:00.00' },
  {
    weekNumber: '5',
    topic: 'Dashboards and Stories',
    openDate: '2022-01-29T00:00:00.00',
  },
];

const dateToday = new Date();

const groupResults = (arrayOfObjects, property) => {
  return arrayOfObjects.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const listCompletedQuizzes = (userQuizzes) => {
  const weeks = 5;
  const quizLinks = [];

  for (let i = 1; i <= weeks; i++) {
    if (Object.keys(userQuizzes).includes(i.toString())) {
      quizLinks.push({ week: i, complete: true });
    } else {
      quizLinks.push({ week: i, complete: false });
    }
  }

  return quizLinks;
};

const findAvailableQuiz = (schedule, userQuizzes) => {
  let available = [];

  userQuizzes.forEach((quiz) => {
    if (!quiz.complete) {
      const matchWeek = quiz.week;

      schedule.forEach((week) => {
        if (week.weekNumber === matchWeek.toString()) {
          if (dateToday > new Date(week.openDate)) {
            available.push({
              weekNumber: week.weekNumber,
              topic: week.topic,
              status: 'available',
            });
          } else {
            available.push({
              weekNumber: week.weekNumber,
              topic: week.topic,
              status: 'upcoming',
            });
          }
        }
      });
    } else {
      available.push({
        weekNumber: quiz.week.toString(),
        topic: quizSchedule.find(
          (week) => week.weekNumber === quiz.week.toString()
        ).topic,
        status: 'completed',
      });
    }
  });

  console.log(available);

  return available;
};

export const NewProfile = () => {
  const { user, profile } = useCheckUser();
  const [currentTab, setCurrentTab] = useState('profile');
  const [quizStatusList, setQuizStatusList] = useState([]);

  const { results, error, isLoading, loadResultsForUser } = useQuizContext();

  useEffect(() => {
    if (user) {
      loadResultsForUser(user.uid);
    }
  }, [user, loadResultsForUser]);

  useEffect(() => {
    if (user && results.length > 0) {
      const userQuizzes = groupResults(results, 'weekNumber');
      const completedList = listCompletedQuizzes(userQuizzes);
      const availableQuiz = findAvailableQuiz(quizSchedule, completedList);
      setQuizStatusList(availableQuiz);
    } else {
      const completedList = [
        { week: 1, complete: false },
        { week: 2, complete: false },
        { week: 3, complete: false },
        { week: 4, complete: false },
        { week: 5, complete: false },
      ];
      const availableQuiz = findAvailableQuiz(quizSchedule, completedList);
      // console.log(availableQuiz);
      setQuizStatusList(availableQuiz);
    }
  }, [user, results]);

  const handleUpdateCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className='page'>
      {profile && (
        <>
          <Sidebar
            userName={profile && `${profile.firstName} ${profile.lastName}`}
            currentTab={currentTab}
            updateCurrentTab={handleUpdateCurrentTab}
          />

          <Content>
            {currentTab === 'profile' && (
              <>
                <Profile user={user} profile={profile} />
                <br />
                <QuizLinks
                  quizStatusList={quizStatusList}
                  limitToAvailable={true}
                />
              </>
            )}
            {currentTab === 'polls' && <h2>Polls</h2>}
            {currentTab === 'quizzes' && (
              <QuizLinks quizStatusList={quizStatusList} />
            )}
            {currentTab === 'dashboard' && <h2>Dashboard</h2>}
          </Content>
        </>
      )}
      <Aside />
    </div>
  );
};
