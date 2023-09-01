import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// PAGES WITHOUT AUTH
import {
  AccountSettings,
  ApplicationSent,
  ContactUs,
  CreateJob,
  JobApplication,
  MyJobs,
  Profile,
  UserSignUp,
  EmployerSignUp,
  UserSignIn,
  EmployerSignIn,
  Jobs,
  Home,
  EmployerProfile,
  EmployerJobs,
} from './pages';
import { Slide, ToastContainer } from 'react-toastify';
import EmployerRoutes from './pages/EmployerRoutes';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <SkeletonTheme>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/sign-in' element={<UserSignIn />} />
          <Route path='/sign-up' element={<UserSignUp />} />
          <Route path='/sign-in/employer' element={<EmployerSignIn />} />
          <Route path='/sign-up/employer' element={<EmployerSignUp />} />
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/employer-profile' element={<EmployerProfile />} />
          <Route path='/employer-jobs' element={<EmployerJobs />} />
          <Route path='/account-settings' element={<AccountSettings />} />
          <Route path='/job-application/:id' element={<JobApplication />} />
          <Route
            path='/job-application/application-sent'
            element={<ApplicationSent />}
          />
          <Route path='/my-jobs' element={<MyJobs />} />
          <Route path='/contact-us' element={<ContactUs />} />

          <Route element={<EmployerRoutes />}>
            <Route path='/post-job' element={<CreateJob />} />
          </Route>
        </Routes>
        <ToastContainer transition={Slide} />
      </SkeletonTheme>
    </>
  );
}

export default App;
