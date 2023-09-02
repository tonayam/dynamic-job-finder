import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate({});
  const { role } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  return (
    <aside className='sidebar'>
      <div className='my-profile'>
        <Link
          to={role === `employer` ? `/employer-profile` : '/my-profile'}
          className={activePage === `profile` ? `active` : null}
        >
          Profile
        </Link>
      </div>
      <div className='my-account'>
        {role === `employer` ? (
          <Link
            to='/employer-jobs'
            className={activePage === `jobs` ? `active` : null}
          >
            My Jobs
          </Link>
        ) : null}
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
            sessionStorage.removeItem(`userInfo`);
          }}
        >
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
