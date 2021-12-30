import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, PrivateRoute } from './components';
import { Home, Login, Signup, Profile, KnowledgeBase, NotFound } from './pages';
import { useAuthContext } from './hooks/useAuthContext';
import { useUserContext } from './hooks/useUserContext';

function App() {
  const { user, authIsReady } = useAuthContext();
  const { loadProfile, clearProfile } = useUserContext();

  console.log(authIsReady, user);

  useEffect(() => {
    if (user !== null) {
      // console.log(user.uid);
      loadProfile(user.uid);
    } else {
      clearProfile();
    }
  }, [user, loadProfile, clearProfile]);

  return (
    <>
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
            <Route
              path='/profile'
              element={
                <PrivateRoute user={!user}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path='/knowledge-base' element={<KnowledgeBase />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
