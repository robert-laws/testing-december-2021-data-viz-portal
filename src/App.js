import './sass/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Profile, KnowledgeBase, NotFound } from './pages';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>App</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/knowledge-base' element={<KnowledgeBase />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
