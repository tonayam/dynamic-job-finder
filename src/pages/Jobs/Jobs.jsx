import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { JobListingJob } from '../../components/Jobs/Jobs';
import JobDetails from '../../components/Job-Details/JobDetails';
import JobFilters from '../../components/Job-Filters/JobFilters';
import { useGlobalContext } from '../../context/context';
import { JobCardSkeleton } from '../../components/Skeleton-Loaders/SkeletonLoaders';

const Jobs = () => {
  const { allJobs, fetchAllJobs } = useGlobalContext();

  useEffect(() => {
    fetchAllJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <main className='jobs-page'>
      <Navbar />
      <section className='available-jobs-container'>
        <div className='box'>
          {/* JOB FILTERS */}
          {/* <JobFilters /> */}

          {/* JOB LISTINGS AND INFORMATIONS */}
          <div className='jobs'>
            <div className='jobs-list'>
              {allJobs.length > 0 ? (
                <>
                  {allJobs.map((job) => {
                    const {
                      companyName,
                      location,
                      jobTitle,
                      createdAt,
                      id: jobId,
                    } = job;
                    const datePosted = new Date(createdAt).toLocaleDateString();
                    return (
                      <JobListingJob
                        key={jobId}
                        company={companyName}
                        location={location}
                        position={jobTitle}
                        timePosted={datePosted}
                        id={jobId}
                      />
                    );
                  })}
                </>
              ) : (
                <JobCardSkeleton cards={10} />
              )}
            </div>

            {/* JOB DETAILS */}
            <JobDetails />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Jobs;
