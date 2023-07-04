import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// PAGES WITHOUT AUTH
import { SignIn, SignUp } from './pages';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
