import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate({});

  return (
    <aside className='sidebar'>
      <div className='my-profile'>
        <h2>My Information</h2>
        <Link
          to='/my-profile'
          className={activePage === `profile` ? `active` : null}
        >
          Profile
        </Link>
      </div>
      <div className='my-account'>
        <h2>My Account</h2>
        <Link
          to='/account-settings'
          className={activePage === `account-settings` ? `active` : null}
        >
          Account Settings
        </Link>
        <Link
          to='/email-notification'
          className={activePage === `email-notification` ? `active` : null}
        >
          Email Notification
        </Link>
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
    </aside>
  );
};

export default Sidebar;
