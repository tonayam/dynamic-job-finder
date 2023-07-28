import React, { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';
import loader from '../../assets/purple-loader.svg';

const MobileJobInfo = () => {
  const [jobDetails, setJobDetails] = useState(false);
  const { activeJob, baseURL } = useGlobalContext();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/jobs/${activeJob}`);
      setDetails(data.job);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [activeJob]);
  return (
    <div className='mobile-job-info'>
      {loading ? (
        <div className='loader'>
          <img src={loader} alt='' />
        </div>
      ) : (
        <>
          <div className='job-company'>
            <h3>{details.jobTitle}</h3>
            <p>{details.companyName}</p>
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
        </>
      )}

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
          <div dangerouslySetInnerHTML={{ __html: details.desc }}></div>
        </div>
      </div>
    </div>
  );
};

export default MobileJobInfo;
