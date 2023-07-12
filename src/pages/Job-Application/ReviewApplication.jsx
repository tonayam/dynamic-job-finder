import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import MobileJobInfo from '../../components/Job-Application-Job-Info/MobileJobInfo';

const ReviewApplication = () => {
  return (
    <>
      <Navbar />
      <main className='job-application-review-page'>
        <MobileJobInfo />
      </main>
    </>
  );
};

export default ReviewApplication;
