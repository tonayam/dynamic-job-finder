import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { profileTabs } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { ProfileTab } from './Tabs/Tabs';

const Profile = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  return (
    <>
      <Navbar />
      <main className='profile-page'>
        {/* SIDEBAR */}
        <div className='tab'>
          {/* TAB OPTIONS FOR DESKTOP */}
          <div className='desktop-tabs'>
            <div className='my-profile'>
              <h2>My Information</h2>
              <h5 className='active'>Profile</h5>
            </div>
            <div className='my-account'>
              <h2>My Account</h2>
              <h5>Account Settings</h5>
              <h5>Email Notification</h5>
            </div>
            <ul className='logout'>
              <li
                onClick={() => {
                  navigate(`/`);
                  localStorage.removeItem(`userInfo`);
                }}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* TAB OPTIONS FOR MOBILE */}
          <select
            name='options'
            id='options'
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {profileTabs.map((tab, tabIndex) => {
              return (
                <option
                  key={tabIndex}
                  className={tabIndex === index ? `active-tab` : null}
                  value={tabIndex}
                >
                  {tab}
                </option>
              );
            })}
            <option>Logout</option>
          </select>
        </div>

        {/* TAB CONTENT */}
        <ProfileTab />
      </main>
    </>
  );
};

export default Profile;
