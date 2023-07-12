import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

const MobileJobInfo = () => {
  const [jobDetails, setJobDetails] = useState(false);
  return (
    <div className='mobile-job-info'>
      <div className='job-company'>
        <h3>Frontend Developer (React)</h3>
        <p>Revent Technologies - Lagos</p>
      </div>
      <div className='see-more'>
        <span
          onClick={() => {
            setJobDetails(true);
          }}
        >
          See more details
        </span>
      </div>
      <div className={`info ${jobDetails ? `show` : null}`}>
        <div className='close-btn'>
          <RiCloseFill
            onClick={() => {
              setJobDetails(false);
            }}
          />
        </div>

        {/* FULL JOB DESCRIPTION */}
        <div className='full-description'>
          <h2 className='title'>Job Description</h2>
          <h4>About us</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>

          <h4>Duties And Responsibilities</h4>
          <ul>
            <li>Develop new user-facing features using React.js.</li>
            <li>
              Make your products easy to use, fast, stable and accessible.
            </li>
            <li>Use feedback from users to improve the product. </li>
            <li>Build products to match design and specified requirements.</li>
            <li>
              Make your product work across multiple devices and operating
              systems.
            </li>
          </ul>
          <h4>Skills And Abilities</h4>
          <ol>
            <li>Develop new user-facing features using React.js.</li>
            <li>
              Make your products easy to use, fast, stable and accessible.
            </li>
            <li>Use feedback from users to improve the product. </li>
            <li>Build products to match design and specified requirements.</li>
            <li>
              Make your product work across multiple devices and operating
              systems.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MobileJobInfo;
