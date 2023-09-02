import React, { useState } from 'react';
import {
  RiMenu4Line,
  RiCloseFill,
  RiSearch2Line,
  RiUserLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const userInfo = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  return (
    <nav className='navbar' onMouseLeave={() => setShowProfileLinks(false)}>
      <Link to='/jobs' className='company-logo'>
        <h2>Dynamic Job Finder</h2>
      </Link>

      {/* DESKTOP NAV ITEMS */}
      <div className='desktop-search'>
        <input
          type='text'
          placeholder='Search for Job titles, companies or keywords'
        />
        <div className='search-btn'>
          <RiSearch2Line />
        </div>
      </div>
      <div className='desktop-nav-items'>
        <div className='profile' onMouseEnter={() => setShowProfileLinks(true)}>
          <RiUserLine />
          <div className={`items ${showProfileLinks ? `show` : null}`}>
            <ul>
              <li>
                <Link to='/jobs'>Jobs</Link>
              </li>
              <div className='divider'></div>
              {userInfo && (
                <li>
                  <Link
                    to={
                      userInfo.role === `employer`
                        ? `/employer-profile`
                        : '/my-profile'
                    }
                  >
                    Profile
                  </Link>
                </li>
              )}
              {userInfo && (
                <li>
                  <Link
                    to={
                      userInfo.role === `employer`
                        ? `/employer-account-settings`
                        : '/account-settings'
                    }
                  >
                    Account Settings
                  </Link>
                </li>
              )}
              <li>
                <Link to='/contact-us'>Contact us</Link>
              </li>
            </ul>
            {userInfo ? (
              <p
                onClick={() => {
                  sessionStorage.removeItem(`userInfo`);
                  navigate(`/`);
                }}
              >
                Sign Out
              </p>
            ) : (
              <ul>
                <li>
                  <Link to='/sign-in'>Sign In</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV ITEMS */}
      <div className='hamburger'>
        <RiMenu4Line onClick={() => setShowNav(true)} />
      </div>
      <div className={`mobile-nav-items ${showNav ? `show` : null}`}>
        <div className='close-btn'>
          <RiCloseFill onClick={() => setShowNav(false)} />
        </div>

        <ul>
          <li>
            <Link to='/jobs'>Jobs</Link>
          </li>
          <div className='divider'></div>
          {userInfo && (
            <li>
              <Link
                to={
                  userInfo.role === `employer`
                    ? `/employer-profile`
                    : '/my-profile'
                }
              >
                Profile
              </Link>
            </li>
          )}
          {userInfo && (
            <li>
              <Link
                to={
                  userInfo.role === `employer` ? `/employer-jobs` : '/my-jobs'
                }
              >
                My jobs
              </Link>
            </li>
          )}
          {userInfo && (
            <li>
              <Link to='/account-settings'>Account Settings</Link>
            </li>
          )}
          <li>
            <Link to='/contact-us'>Contact us</Link>
          </li>
        </ul>
        {userInfo ? (
          <p
            onClick={() => {
              sessionStorage.removeItem(`userInfo`);
              navigate(`/`);
            }}
          >
            Sign Out
          </p>
        ) : (
          <ul>
            <li>
              <Link to='/sign-in'>Sign In</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
