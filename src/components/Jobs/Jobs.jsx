import React from 'react';
import { miniJobs } from '../../data/data';
import JobDetails from '../Job-Details/JobDetails';
import { useGlobalContext } from '../../context/context';

const Jobs = () => {
  const { setShowJobDetails } = useGlobalContext();

  return (
    <section className='jobs-container'>
      <div className='box'>
        {/* JOB FILTERS */}
        <div className='filters'>Filter component here</div>

        {/* JOB LISTINGS AND INFORMATIONS */}
        <div className='jobs'>
          <div className='jobs-list'>
            {miniJobs.map((job, jobIndex) => {
              const { company, location, position, timePosted } = job;
              return (
                <div
                  className='job'
                  key={jobIndex}
                  onClick={() => setShowJobDetails(true)}
                >
                  <div className='company'>
                    <h2>{company}</h2>
                  </div>
                  <div className='position'>
                    <h3>{position}</h3>
                  </div>
                  <div className='location-time'>
                    <h5>{location}</h5>
                    <span>{timePosted}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* JOB DETAILS */}
          <JobDetails />
        </div>
      </div>
    </section>
  );
};

export default Jobs;
