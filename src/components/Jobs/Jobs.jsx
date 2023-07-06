import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { miniJobs } from '../../data/data';

const Jobs = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);

  return (
    <section className='jobs-container'>
      <div className='box'>
        <div className='filters'></div>
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
          <div className={`job-info ${showJobDetails && `show`}`}>
            <div className='close-btn'>
              <RiCloseFill onClick={() => setShowJobDetails(false)} />
            </div>
            <div className='info'>
              <div className='company-position'>
                <h4>Astrosoft</h4>
                <h1>Frontdesk Assistant</h1>
                <div className='location-date'>
                  <h6>Yenegoa, bayelsa</h6>
                  <h6>20d+</h6>
                </div>
                <div className='btns'>
                  <button className='blue'>Apply</button>
                  <button className='transparent'>Save</button>
                </div>
              </div>

              {/* JOB DESCRIPTION */}
            </div>

            <div className='job-overview'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
