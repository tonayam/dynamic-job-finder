import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiUser } from 'react-icons/bi';
import { RiEditCircleFill } from 'react-icons/ri';
import { RxPlusCircled } from 'react-icons/rx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGlobalContext } from '../../context/context';
import { UpdateEmployeeInfo } from '../../components/Modals/Modals';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import loader from '../../assets/spinner-dual-ball.svg';
import { toast } from 'react-toastify';

const Profile = () => {
  const [employementStatus, setEmployement] = useState('');
  const { showModal, setShowModal, baseURL } = useGlobalContext();
  const [labelText, setLabelText] = useState(``);
  const [infoToUpdate, setInfoToUpdate] = useState(``);
  const [oldInfo, setOldInfo] = useState(``);
  const [loading, setLoading] = useState(true);
  const [jobSeekerDetails, setJobSeekerDetails] = useState({});

  const { token, userId } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const handleChange = (event) => {
    setEmployement(event.target.value);
  };

  const getUpdatedDetails = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/users/show-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setJobSeekerDetails(data);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateEmploymentStatus = async () => {
    try {
      await axios.patch(
        `${baseURL}/users/${userId}`,
        { employmentStatus: employementStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Info Updated`);
      getUpdatedDetails();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpdatedDetails();
    // eslint-disable-next-line
  }, [showModal]);

  useEffect(() => {
    if (employementStatus) {
      updateEmploymentStatus();
    }
    // eslint-disable-next-line
  }, [employementStatus]);

  return (
    <>
      <Navbar />
      <main className='profile-page'>
        {loading ? (
          <div className='page-loader'>
            <img src={loader} alt='' />
          </div>
        ) : (
          <>
            {/* SIDEBAR */}
            <Sidebar activePage={`profile`} />

            {/* PAGE CONTENT */}
            <section className='page-content'>
              {/* TITLES */}
              <div className='titles-section'>
                <h2 className='title'>Profile</h2>
                <h2 className='sub-title'>Community Profile</h2>
                <p>
                  This is how you will appear when you participate in
                  conversations on Dynamic Job Finder
                </p>
              </div>

              {/* USER PROFILE IMAGE AND NAME */}
              <div className='user'>
                <div className='img'>
                  <BiUser />
                  <RiEditCircleFill className='edit' />
                </div>
                <div className='name'>
                  <h2>John Doe</h2>
                </div>
              </div>

              {/* EMPLOYMENT STATUS */}
              <div className='employment-status'>
                <FormControl variant='standard' sx={{ m: 1, width: 200 }}>
                  <InputLabel>Employement Status</InputLabel>
                  <Select
                    value={
                      employementStatus || jobSeekerDetails.employmentStatus
                    }
                    onChange={handleChange}
                    autoWidth
                    label='Age'
                  >
                    <MenuItem value='employed'>Employed</MenuItem>
                    <MenuItem value='unemployed'>Unemployed</MenuItem>
                  </Select>
                </FormControl>
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

                {/* current job title */}
                {jobSeekerDetails.currentJobTitle ? (
                  <div className='item'>
                    <h4 className='title'>
                      Current Job Title{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Current Job Title`);
                          setInfoToUpdate(`currentJobTitle`);
                          setOldInfo(jobSeekerDetails.currentJobTitle);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.currentJobTitle}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Current Job Title`);
                        setInfoToUpdate(`currentJobTitle`);
                      }}
                    >
                      Add Current Job Title
                    </span>
                  </div>
                )}

                {/* current company */}
                {jobSeekerDetails.currentCompany ? (
                  <div className='item'>
                    <h4 className='title'>
                      Current Company{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Current Company`);
                          setInfoToUpdate(`currentCompany`);
                          setOldInfo(jobSeekerDetails.currentCompany);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.currentCompany}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Current Company`);
                        setInfoToUpdate(`currentCompany`);
                      }}
                    >
                      Add Current Company
                    </span>
                  </div>
                )}

                {/* location */}
                {jobSeekerDetails.currentLocation ? (
                  <div className='item'>
                    <h4 className='title'>
                      Location{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Location`);
                          setInfoToUpdate(`currentLocation`);
                          setOldInfo(jobSeekerDetails.currentLocation);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.currentLocation}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Location`);
                        setInfoToUpdate(`currentLocation`);
                      }}
                    >
                      Add Location
                    </span>
                  </div>
                )}
              </div>

              {/* RELEVANT LINKS */}
              <div className='relevant-links'>
                <h3 className='title'>Relevant Links</h3>

                {/* github */}
                {jobSeekerDetails.githubLink ? (
                  <div className='item'>
                    <h4 className='title'>
                      GitHub Link{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`GitHub Link`);
                          setInfoToUpdate(`githubLink`);
                          setOldInfo(jobSeekerDetails.githubLink);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.githubLink || `Link`}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`GitHub Link`);
                        setInfoToUpdate(`githubLink`);
                      }}
                    >
                      Add GitHub Link
                    </span>
                  </div>
                )}

                {/* portfolio */}
                {jobSeekerDetails.portfolioLink ? (
                  <div className='item'>
                    <h4 className='title'>
                      Portfolio Link{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Portfolio Link`);
                          setInfoToUpdate(`portfolioLink`);
                          setOldInfo(jobSeekerDetails.portfolioLink);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.portfolioLink || `Link`}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Portfolio Link`);
                        setInfoToUpdate(`portfolioLink`);
                      }}
                    >
                      Add Portfolio Link
                    </span>
                  </div>
                )}

                {/* linkendin */}
                {jobSeekerDetails.linkendinLink ? (
                  <div className='item'>
                    <h4 className='title'>
                      Linkendin Link{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Linkendin Link`);
                          setInfoToUpdate(`linkendinLink`);
                          setOldInfo(jobSeekerDetails.linkendinLink);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.linkendinLink}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Linkendin Link`);
                        setInfoToUpdate(`linkendinLink`);
                      }}
                    >
                      Add Linkendin Link
                    </span>
                  </div>
                )}
              </div>

              {/* JOB PREFERENCES */}
              <div className='job-preferences'>
                <h3 className='title'>Job Preferences</h3>
                <p className='customize'>
                  Tell us what you're looking for so we can customize your job
                  hunting experience!
                </p>

                {/* preferred job title */}
                {jobSeekerDetails.preferredJobTitle ? (
                  <div className='item'>
                    <h4 className='title'>
                      Preferred Job Title{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Preferred Job Title`);
                          setInfoToUpdate(`preferredJobTitle`);
                          setOldInfo(jobSeekerDetails.preferredJobTitle);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.preferredJobTitle}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Preferred Job Title`);
                        setInfoToUpdate(`preferredJobTitle`);
                      }}
                    >
                      Add Preferred Job Title
                    </span>
                  </div>
                )}

                {/* desired job location */}
                {jobSeekerDetails.desiredJobLocation ? (
                  <div className='item'>
                    <h4 className='title'>
                      Desired Job Location{' '}
                      <FaEdit
                        onClick={() => {
                          setShowModal(`update info`);
                          setLabelText(`Desired Job Location`);
                          setInfoToUpdate(`desiredJobLocation`);
                          setOldInfo(jobSeekerDetails.desiredJobLocation);
                        }}
                      />
                    </h4>
                    <div className='info'>
                      <p>{jobSeekerDetails.desiredJobLocation}</p>
                    </div>
                  </div>
                ) : (
                  <div className='link'>
                    <RxPlusCircled />
                    <span
                      onClick={() => {
                        setShowModal(`update info`);
                        setLabelText(`Desired Job Location`);
                        setInfoToUpdate(`desiredJobLocation`);
                      }}
                    >
                      Add Desired Job Location
                    </span>
                  </div>
                )}
              </div>
            </section>
            {showModal === `update info` && (
              <UpdateEmployeeInfo
                labelName={labelText}
                infoToUpdate={infoToUpdate}
                oldInfo={oldInfo}
                setOldInfo={setOldInfo}
              />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Profile;
