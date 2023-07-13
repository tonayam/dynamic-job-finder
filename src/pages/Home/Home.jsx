import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { JobListingJob } from '../../components/Jobs/Jobs';
import { miniJobs } from '../../data/data';
import JobDetails from '../../components/Job-Details/JobDetails';
import JobFilters from '../../components/Job-Filters/JobFilters';

const Home = () => {
  return (
    <main className='home-page'>
      <Navbar />
      <section className='available-jobs-container'>
        <div className='box'>
          {/* JOB FILTERS */}
          <JobFilters />

          {/* JOB LISTINGS AND INFORMATIONS */}
          <div className='jobs'>
            <div className='jobs-list'>
              {miniJobs.map((job, jobIndex) => {
                const { company, location, position, timePosted } = job;
                return (
                  <JobListingJob
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
        </div>
      </section>
    </main>
  );
};

export default Home;
