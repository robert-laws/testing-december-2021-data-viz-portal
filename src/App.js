import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, PrivateRoute } from './components';
import {
  Home,
  Login,
  Signup,
  Profile,
  NewProfile,
  Quiz,
  Poll,
  KnowledgeBase,
  NotFound,
} from './pages';
import { useAuthContext } from './hooks/useAuthContext';
import { useUserContext } from './hooks/useUserContext';
import { useQuizContext } from './hooks/useQuizContext';

function App() {
  const { user, authIsReady } = useAuthContext();
  const { loadProfile, clearProfile } = useUserContext();
  const { clearQuizzes } = useQuizContext();

  console.log(authIsReady, user);

  useEffect(() => {
    if (user !== null) {
      loadProfile(user.uid);
    } else {
      clearProfile();
      clearQuizzes();
    }
  }, [user, loadProfile, clearProfile, clearQuizzes]);

  return (
    <div className='app'>
      {authIsReady && (
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={
                <PrivateRoute user={user}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <PrivateRoute user={user}>
                  <Signup />
                </PrivateRoute>
              }
            />
            <Route path='/profile' element={<Profile />} />
            <Route path='/new-profile' element={<NewProfile />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/poll' element={<Poll />} />
            <Route path='/knowledge-base' element={<KnowledgeBase />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
