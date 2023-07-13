import React from 'react';
import applicationSent from '../../assets/application-sent.svg';
import Navbar from '../../components/Navbar/Navbar';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ApplicationSent = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className='application-sent-page'>
        <div className='cont'>
          <div className='img'>
            <img src={applicationSent} alt='application sent' />
          </div>
          <h1 className='title'>
            Your Application has been submitted successfully
          </h1>

          <div className='brief-info'>
            <div className='info'>
              <FaCheck />
              <p>
                The employer typically responds to applications within 8 days
              </p>
            </div>
          </div>

          <button className='blue' onClick={() => navigate(`/`)}>
            Return to job search
          </button>
        </div>
      </main>
    </>
  );
};

export default ApplicationSent;
