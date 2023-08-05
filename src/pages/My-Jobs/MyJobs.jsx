import React, { useState } from 'react';
import { AppliedJob, SavedJob } from '../../components/Jobs/Jobs';
import { miniJobs } from '../../data/data';
import Navbar from '../../components/Navbar/Navbar';
import JobDetails from '../../components/Job-Details/JobDetails';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import { useEffect } from 'react';
import { AppliedJobSkeleton } from '../../components/Skeleton-Loaders/SkeletonLoaders';

const MyJobs = () => {
  const [currentTab, setCurrentTab] = useState(`saved`);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(true);
  const { baseURL } = useGlobalContext();
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const fetchAppliedJobs = async () => {
    try {
      setAppliedJobsLoading(true);
      const { data } = await axios.get(`${baseURL}/job-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(data.appliedJobs);
      setAppliedJobsLoading(false);
    } catch (error) {
      setAppliedJobsLoading(false);
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
    // eslint-disable-next-line
  }, []);

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
            {appliedJobsLoading ? 0 : appliedJobs.length} Applied
          </li>
        </ul>
      </div>

      <div className='jobs-container'>
        <div className='jobs-list'>
          {currentTab === `saved` ? (
            miniJobs.map((job, jobIndex) => {
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
          ) : appliedJobsLoading ? (
            <AppliedJobSkeleton cards={5} />
          ) : (
            appliedJobs.map((job) => {
              const { job: jobDetails, _id } = job;
              return (
                <AppliedJob
                  key={_id}
                  company={jobDetails.companyName}
                  location={jobDetails.location}
                  position={jobDetails.jobTitle}
                  timePosted={new Date(
                    jobDetails.createdAt
                  ).toLocaleDateString()}
                />
              );
            })
          )}
        </div>
        {/* JOB DETAILS */}
        <JobDetails />
      </div>
    </main>
  );
};

export default MyJobs;
