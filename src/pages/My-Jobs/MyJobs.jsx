import React, { useState } from 'react';
import { AppliedJob, SavedJob } from '../../components/Jobs/Jobs';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import { useEffect } from 'react';
import { JobCardSkeleton } from '../../components/Skeleton-Loaders/SkeletonLoaders';
import AppliedJobDetails from '../../components/Applied-Job-Details/AppliedJobDetails';
import JobDetails from '../../components/Job-Details/JobDetails';

const MyJobs = () => {
  const [currentTab, setCurrentTab] = useState(`saved`);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobsLoading, setSavedJobsLoading] = useState(true);
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(true);
  const { baseURL, setActiveAppliedJob, setActiveJob } = useGlobalContext();
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  // FETCH JOBS SAVE
  const fetchSavedJobs = async () => {
    try {
      setSavedJobsLoading(true);
      const { data } = await axios.get(`${baseURL}/saved-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedJobs(data.savedJobs);
      setActiveJob(data.savedJobs[0].job._id);
      setSavedJobsLoading(false);
    } catch (error) {
      setSavedJobsLoading(false);
    }
  };

  // FETCH JOBS APPLIED FOR
  const fetchAppliedJobs = async () => {
    try {
      setAppliedJobsLoading(true);
      const { data } = await axios.get(`${baseURL}/job-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(data.appliedJobs);
      setActiveAppliedJob(data.appliedJobs[0].job._id);
      setAppliedJobsLoading(false);
    } catch (error) {
      setAppliedJobsLoading(false);
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
    fetchSavedJobs();
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
            {savedJobsLoading ? 0 : savedJobs.length} Saved
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
            savedJobsLoading ? (
              <JobCardSkeleton cards={5} />
            ) : (
              savedJobs.map((job) => {
                const { _id, job: savedJob } = job;
                return (
                  <SavedJob
                    key={_id}
                    id={savedJob._id}
                    company={savedJob.companyName}
                    location={savedJob.location}
                    position={savedJob.jobTitle}
                    timePosted={new Date(
                      savedJob.createdAt
                    ).toLocaleDateString()}
                  />
                );
              })
            )
          ) : appliedJobsLoading ? (
            <JobCardSkeleton cards={5} />
          ) : (
            appliedJobs.map((job) => {
              const { job: jobDetails, _id } = job;

              return (
                <AppliedJob
                  key={_id}
                  id={jobDetails._id}
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
        {currentTab === `saved` ? <JobDetails /> : <AppliedJobDetails />}
      </div>
    </main>
  );
};

export default MyJobs;
