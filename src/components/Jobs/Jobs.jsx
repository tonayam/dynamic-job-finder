import { useGlobalContext } from '../../context/context';

// JOB COMPONENT ON JOB LISTING PAGE (HOME PAGE)
export const JobListingJob = ({ company, position, location, timePosted }) => {
  const { setShowJobDetails } = useGlobalContext();

  return (
    <div className='job-listing-job' onClick={() => setShowJobDetails(true)}>
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
};

// JOB COMPONENT FOR APPLIED JOBS
export const AppliedJob = ({ company, position, location, timePosted }) => {
  const { setShowJobDetails } = useGlobalContext();

  return (
    <div className='applied-job' onClick={() => setShowJobDetails(true)}>
      <div className='company-status'>
        <h2>{company}</h2>
        <select name='status' id='status'>
          <option value='applied'>Applied</option>
          <option value='applied'>Heard Back</option>
          <option value='applied'>Interviewing</option>
          <option value='applied'>Got Offer</option>
          <option value='applied'>Landed Job</option>
        </select>
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
};

// JOB COMPONENT FOR SAVED JOBS
export const SavedJob = ({ company, position, location, timePosted }) => {
  const { setShowJobDetails } = useGlobalContext();

  return (
    <div className='saved-job' onClick={() => setShowJobDetails(true)}>
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
};
