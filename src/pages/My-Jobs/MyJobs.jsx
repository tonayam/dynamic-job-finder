import React, { useState } from 'react';
import { AppliedJob, SavedJob } from '../../components/Jobs/Jobs';
import { miniJobs } from '../../data/data';
import Navbar from '../../components/Navbar/Navbar';
import JobDetails from '../../components/Job-Details/JobDetails';

const MyJobs = () => {
  const [currentTab, setCurrentTab] = useState(`saved`);

  return (
    <main className='my-jobs-page'>
      <Navbar />
      <div className='headers'>
        <h1>My Jobs</h1>
        <ul>
          <li
            className={currentTab === `saved` ? `active` : null}
            onClick={() => setCurrentTab(`saved`)}
          >
            0 Saved
          </li>
          <li
            className={currentTab === `applied` ? `active` : null}
            onClick={() => setCurrentTab(`applied`)}
          >
            3 Applied
          </li>
        </ul>
      </div>

      <div className='jobs-container'>
        <div className='jobs-list'>
          {currentTab === `saved`
            ? miniJobs.map((job, jobIndex) => {
                const { company, location, position, timePosted } = job;
                return (
                  <SavedJob
                    key={jobIndex}
                    company={company}
                    location={location}
                    position={position}
                    timePosted={timePosted}
                  />
                );
              })
            : miniJobs.slice(0, 3).map((job, jobIndex) => {
                const { company, location, position, timePosted } = job;
                return (
                  <AppliedJob
                    key={jobIndex}
                    company={company}
                    location={location}
                    position={position}
                    timePosted={timePosted}
                  />
                );
              })}
        </div>
        {/* JOB DETAILS */}
        <JobDetails />
      </div>
    </main>
  );
};

export default MyJobs;
