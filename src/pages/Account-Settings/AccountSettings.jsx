import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const AccountSettings = () => {
  return (
    <>
      <Navbar />
      <main className='account-settings-page'>
        <Sidebar activePage={`account-settings`} />
        <div className='page-content'>
          <div className='page-title'>
            <h2>Account Settings</h2>
          </div>

          {/* EMAIL */}
          <div className='email'>
            <p>johndoe@gmail.com</p>
            <button className='transparent'>Change</button>
          </div>

          {/* SOCIAL CONNECTIONS */}
          <div className='social-connections'>
            <h4 className='title'>
              <span>Social Connections</span> - For quick and easy access, use
              your social accounts.
            </h4>

            <div className='connect google'>
              <div className='img'></div>
              <div className='info'>
                <h5>Not Connected</h5>
                <p>Continue with google</p>
              </div>
            </div>
          </div>

          {/* PASSWORD RESET */}
          <div className='password-reset'>
            <h3 className='title'>Password Reset</h3>
            <form action=''>
              <div className='form-control'>
                <label htmlFor='current-password'>Current Password</label>
                <input type='password' id='current-password' />
              </div>
              <div className='form-control'>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' />
              </div>
              <div className='form-control'>
                <label htmlFor='confirm-password'>Confirm New Password</label>
                <input type='password' id='confirm-password' />
              </div>
              <button className='blue'>Save Changes</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountSettings;
