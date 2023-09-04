import React, { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { BsHourglassSplit, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { FaMoneyBill, FaGenderless } from 'react-icons/fa';
import { GrUserExpert } from 'react-icons/gr';
import { FcGraduationCap } from 'react-icons/fc';
import { useGlobalContext } from '../../context/context';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JobDetailsSkeleton } from '../Skeleton-Loaders/SkeletonLoaders';

const JobDetails = () => {
  const {
    setShowJobDetails,
    showJobDetails,
    activeJob,
    setActiveJob,
    baseURL,
  } = useGlobalContext();
  const [saveJob, setSaveJob] = useState(false);
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({ jobTitle: `` });
  const [savedJob, setSavedJob] = useState(``);
  const { token, role } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  // GET JOB DETAILS
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/jobs/${activeJob}`);
      setJobDetails(data.job);
    } catch (error) {}
  };

  // GET THE SAVE STATUS OF A PARTICULAR JOB
  const fetchSavedJobs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/saved-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedJob(
        data.savedJobs.filter((savedJob) => savedJob.job._id === activeJob)
      );
    } catch (error) {}
  };

  // SAVE A JOB
  const submitSavedJob = async (e) => {
    try {
      await axios.post(
        `${baseURL}/saved-jobs`,
        {
          job: jobDetails._id,
          employer: jobDetails.createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSavedJobs();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const { pathname } = useLocation();

  // REMOVE A JOB FROM THE LIST OF SAVED JOBS
  const removeSavedJob = async (jobId) => {
    try {
      await axios.delete(`${baseURL}/saved-jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (pathname === `/my-jobs`) {
        window.location.reload(false);
      }
      fetchSavedJobs();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (activeJob) {
      fetchJob();
    }
    // eslint-disable-next-line
  }, [activeJob]);

  useEffect(() => {
    if (jobDetails && token && role === `user`) {
      fetchSavedJobs();
    }
    // eslint-disable-next-line
  }, [activeJob]);

  if (!jobDetails.jobTitle) {
    return (
      <div className='job-details'>
        <JobDetailsSkeleton />
      </div>
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
    _id,
  } = jobDetails;

  return (
    <section className={`job-details ${showJobDetails && `show`}`}>
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
          {role === `user` ? (
            <>
              <div className='btns'>
                <button
                  className='blue apply'
                  onClick={() => {
                    if (token) {
                      navigate(`/job-application/${_id}`);
                    } else {
                      navigate(`/sign-in`);
                    }
                  }}
                >
                  Apply
                </button>
                <button
                  className='transparent save'
                  onClick={() => {
                    if (token && savedJob.length < 1) {
                      submitSavedJob();
                      setSaveJob(!saveJob);
                    } else if (token && savedJob.length > 0) {
                      removeSavedJob(savedJob[0]._id);
                      setSaveJob(!saveJob);
                    } else {
                      navigate(`/sign-in`);
                    }
                  }}
                  type='button'
                >
                  {savedJob.length > 0 ? `Saved` : `Save`}{' '}
                  {savedJob.length > 0 ? (
                    <BsBookmarkFill className='saved' />
                  ) : (
                    <BsBookmark />
                  )}
                </button>
              </div>
            </>
          ) : null}
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

export default JobDetails;
