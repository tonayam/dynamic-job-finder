import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { BsHourglassSplit, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { FaMoneyBill, FaGenderless } from 'react-icons/fa';
import { GrUserExpert } from 'react-icons/gr';
import { FcGraduationCap } from 'react-icons/fc';
import { useGlobalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { setShowJobDetails, showJobDetails } = useGlobalContext();
  const [saveJob, setSaveJob] = useState(false);
  const navigate = useNavigate();
  return (
    <section className={`job-details ${showJobDetails && `show`}`}>
      <div className='close-btn'>
        <RiCloseFill onClick={() => setShowJobDetails(false)} />
      </div>
      {/* BASIC INFORMATION ABOUT THE JOB POSTING */}
      <div className='job-info'>
        <div className='company-position'>
          <h4>Astrosoft</h4>
          <h1>Frontdesk Assistant</h1>
          <div className='location-date'>
            <h6>Yenegoa, bayelsa</h6>
            <h6>20d+</h6>
          </div>
          <div className='btns'>
            <button
              className='blue apply'
              onClick={() => navigate(`/job-application/asdaasad`)}
            >
              Apply
            </button>
            <button
              className='transparent save'
              onClick={() => setSaveJob(!saveJob)}
            >
              Save{' '}
              {saveJob ? <BsBookmarkFill className='saved' /> : <BsBookmark />}
            </button>
          </div>
        </div>
      </div>

      {/* JOB POSTING DESCRIPTION */}
      <div className='job-description'>
        <h3 className='title'>Job description</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At
          repudiandae optio consequatur aspernatur tempore totam ratione! Ea
          maxime voluptatum tempora magni nisi id nostrum sit exercitationem
          illo non ullam quia unde totam doloremque reiciendis, soluta repellat
          dolores, sunt consequatur aperiam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At
          repudiandae optio consequatur aspernatur tempore totam ratione! Ea
          maxime voluptatum tempora magni nisi id nostrum sit exercitationem
          illo non ullam quia unde totam doloremque reiciendis, soluta repellat
          dolores, sunt consequatur aperiam.
        </p>

        <h4>Job Requirements</h4>
        <ul>
          <li>item one</li>
          <li>item one</li>
          <li>item one</li>
          <li>item one</li>
        </ul>
      </div>

      {/* JOB OVERVIEW SECTION */}
      <div className='job-overview'>
        <h3 className='title'>Job Overview</h3>

        <div className='items-container'>
          <div className='item data-posted'>
            <div className='logo'>
              <SlCalender />
            </div>
            <div className='info'>
              <h6>Date Posted</h6>
              <p>May 14, 2023</p>
            </div>
          </div>
          <div className='item offered salary'>
            <div className='logo'>
              <FaMoneyBill />
            </div>
            <div className='info'>
              <h6>Offered Salary</h6>
              <p>$100 - $200 / week</p>
            </div>
          </div>
          <div className='item expiration date'>
            <div className='logo'>
              <BsHourglassSplit />
            </div>
            <div className='info'>
              <h6>Expiration date</h6>
              <p>June 13, 2023</p>
            </div>
          </div>
          <div className='item expereience'>
            <div className='logo'>
              <GrUserExpert />
            </div>
            <div className='info'>
              <h6>Experience</h6>
              <p>No Experience Needed</p>
            </div>
          </div>
          <div className='item gender'>
            <div className='logo'>
              <FaGenderless />
            </div>
            <div className='info'>
              <h6>Gender</h6>
              <p>Both</p>
            </div>
          </div>
          <div className='item qualification'>
            <div className='logo'>
              <FcGraduationCap />
            </div>
            <div className='info'>
              <h6>Qualification</h6>
              <p>Certificate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
