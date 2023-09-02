import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiUser } from 'react-icons/bi';
import { RiEditCircleFill } from 'react-icons/ri';
import { UpdateEmployerInfoModal } from '../../components/Modals/Modals';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import loader from '../../assets/spinner-dual-ball.svg';

const EmployerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [employerDetails, setEmployerDetails] = useState({ companyName: `` });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { baseURL } = useGlobalContext();
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const getUpdatedDetails = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/employers/show-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setEmployerDetails(data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpdatedDetails();
    // eslint-disable-next-line
  }, [showUpdateModal]);

  return (
    <>
      <Navbar />
      <main className='employer-profile-page'>
        {/* PAGE CONTENT */}
        {loading ? (
          <div className='page-loader'>
            <img src={loader} alt='' />
          </div>
        ) : (
          <>
            {/* SIDEBAR */}
            <Sidebar activePage={`profile`} />

            <section className='page-content'>
              {/* TITLES */}
              <div className='titles-section'>
                <h2 className='title'>Profile</h2>
              </div>

              {/* USER PROFILE IMAGE AND NAME */}
              <div className='user'>
                <div className='img'>
                  <BiUser />
                  <RiEditCircleFill className='edit' />
                </div>
                <div className='name'>
                  <h2>{employerDetails.companyName}</h2>
                </div>
              </div>

              {/* SUBSCRIPTION STATUS */}
              <div className='subscription-status'>
                <span>Subscription Status</span>
                <h3>
                  {employerDetails.isSubscribed
                    ? `Subscribed`
                    : `Not Subscribed`}
                </h3>
              </div>

              {/* RELEVANT INFO */}
              <div className='relevant-info'>
                <div className='item'>
                  <h4 className='title'>Primary Industry</h4>
                  <div className='info'>
                    <p>Tech</p>
                  </div>
                </div>
                <div className='item'>
                  <h4 className='title'>Industry Category</h4>
                  <div className='info'>
                    <p>Engineering</p>
                  </div>
                </div>
                <div className='item'>
                  <h4 className='title'>Company Location</h4>
                  <div className='info'>
                    <p>{employerDetails.location}</p>
                  </div>
                </div>
                <div className='item'>
                  <h4 className='title'>No of Employees</h4>
                  <div className='info'>
                    <p>
                      {employerDetails.noOfEmployees
                        ? `0 - ${employerDetails.noOfEmployees}`
                        : `0`}
                    </p>
                  </div>
                </div>

                <div className='btn'>
                  <button
                    className='blue'
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Update Info
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
        {showUpdateModal ? (
          <UpdateEmployerInfoModal
            setShowUpdateModal={setShowUpdateModal}
            employerDetails={employerDetails}
          />
        ) : null}
      </main>
    </>
  );
};

export default EmployerProfile;
