import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import loader from '../../assets/spinner-dual-ball.svg';
import { BsFilePost } from 'react-icons/bs';
import { GrDocumentVerified } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const EmployerJobs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myJobs, setMyJobs] = useState([]);
  const [myJobApplications, setMyJobApplications] = useState([]);

  const { baseURL } = useGlobalContext();
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const getMyJobs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/jobs/my-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setMyJobs(data);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTotalApplications = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/job-applications/my-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setMyJobApplications(data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyJobs();
    getTotalApplications();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <main className='employer-jobs-page'>
        {/* PAGE CONTENT */}
        {loading ? (
          <div className='page-loader'>
            <img src={loader} alt='' />
          </div>
        ) : (
          <>
            {/* SIDEBAR */}
            <Sidebar activePage={`jobs`} />

            <section className='page-content'>
              {/* TITLES */}
              <div className='titles-section'>
                <h2 className='title'>My Jobs</h2>
              </div>

              {/* CARDS */}
              <div className='cards'>
                <div className='card'>
                  <div className='icon'>
                    <BsFilePost />
                  </div>
                  <div className='info'>
                    <h3>{myJobs.count}</h3>
                    <p>Jobs Posted</p>
                  </div>
                </div>
                <div className='card'>
                  <div className='icon'>
                    <GrDocumentVerified />
                  </div>
                  <div className='info'>
                    <h3>{myJobApplications.count}</h3>
                    <p>Total Applications</p>
                  </div>
                </div>
              </div>

              {/* POST JOB */}
              <div className='post-job-btn'>
                <button className='blue' onClick={() => navigate(`/post-job`)}>
                  Post a Job
                </button>
              </div>

              {/* POSTED JOBS */}
              <div className='posted-jobs'>
                <div className='headers'>
                  <h4>Jobs Posted</h4>
                </div>

                <ol>
                  {myJobs.jobs.map((job) => {
                    const { jobTitle, _id } = job;
                    return (
                      <li className='job' key={_id}>
                        <h4 className='title'>{jobTitle}</h4>
                        <p></p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default EmployerJobs;
