import React, { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { BsHourglassSplit } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { FaMoneyBill, FaGenderless } from 'react-icons/fa';
import { GrUserExpert } from 'react-icons/gr';
import { FcGraduationCap } from 'react-icons/fc';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';
import loader from '../../assets/purple-loader.svg';

const AppliedJobDetails = ({ activeJobId }) => {
  const { setShowJobDetails, showJobDetails, baseURL, activeAppliedJob } =
    useGlobalContext();
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  // const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
  //   ? JSON.parse(sessionStorage.getItem(`userInfo`))
  //   : ``;

  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/jobs/${activeAppliedJob}`);
      setJobDetails(data.job);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [activeAppliedJob]);

  if (loading) {
    return (
      <section className={`job-details ${showJobDetails && `show`}`}>
        <div className='loader'>
          <img src={loader} alt='' />
        </div>
      </section>
    );
  }

  const {
    companyName,
    jobTitle,
    desc,
    offeredSalary,
    gender,
    experience,
    qualification,
    jobExpiration,
    location,
    createdAt,
  } = jobDetails;

  return (
    <section className={`applied-job-details ${showJobDetails && `show`}`}>
      <div className='close-btn'>
        <RiCloseFill onClick={() => setShowJobDetails(false)} />
      </div>
      {/* BASIC INFORMATION ABOUT THE JOB POSTING */}
      <div className='job-info'>
        <div className='company-position'>
          <h4>{companyName}</h4>
          <h1>{jobTitle}</h1>
          <div className='location-date'>
            <h6>{location}</h6>
            <h6>{new Date(createdAt).toDateString()}</h6>
          </div>
          <div className='update-job-status'>
            <h3 className='title'>Job Status</h3>

            <div className='boxes'>
              <div className='form-control'>
                <input type='checkbox' defaultChecked id='applied' />
                <label htmlFor='applied'>Applied</label>
              </div>
              <div className='form-control'>
                <input type='checkbox' id='heard-back' />
                <label htmlFor='heard-back'>Heard Back</label>
              </div>
              <div className='form-control'>
                <input type='checkbox' id='interviewing' />
                <label htmlFor='interviewing'>Interviewing</label>
              </div>
              <div className='form-control'>
                <input type='checkbox' id='got-offer' />
                <label htmlFor='got-offer'>Got Offer</label>
              </div>
              <div className='form-control'>
                <input type='checkbox' id='landed-job' />
                <label htmlFor='landed-job'>Landed Job</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* JOB POSTING DESCRIPTION */}
      <div className='job-description'>
        <h3 className='title'>Job description</h3>
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
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
              <p>{new Date(createdAt).toDateString()}</p>
            </div>
          </div>
          <div className='item offered salary'>
            <div className='logo'>
              <FaMoneyBill />
            </div>
            <div className='info'>
              <h6>Offered Salary</h6>
              <p>₦{offeredSalary?.toLocaleString(`en-US`)}</p>
            </div>
          </div>
          <div className='item expiration date'>
            <div className='logo'>
              <BsHourglassSplit />
            </div>
            <div className='info'>
              <h6>Expiration date</h6>
              <p>{new Date(jobExpiration).toDateString()}</p>
            </div>
          </div>
          <div className='item expereience'>
            <div className='logo'>
              <GrUserExpert />
            </div>
            <div className='info'>
              <h6>Experience</h6>
              <p>{experience}</p>
            </div>
          </div>
          <div className='item gender'>
            <div className='logo'>
              <FaGenderless />
            </div>
            <div className='info'>
              <h6>Gender</h6>
              <p>{gender}</p>
            </div>
          </div>
          <div className='item qualification'>
            <div className='logo'>
              <FcGraduationCap />
            </div>
            <div className='info'>
              <h6>Qualification</h6>
              <p>{qualification}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppliedJobDetails;
