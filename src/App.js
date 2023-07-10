import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// PAGES WITHOUT AUTH
import {
  AccountSettings,
  ContactUs,
  Home,
  MyJobs,
  Profile,
  SignIn,
  SignUp,
} from './pages';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/my-profile' element={<Profile />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/my-jobs' element={<MyJobs />} />
        <Route path='/contact-us' element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
