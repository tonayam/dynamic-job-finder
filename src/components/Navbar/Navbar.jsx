import React, { useEffect, useState } from 'react';
import {
  RiMenu4Line,
  RiCloseFill,
  RiSearch2Line,
  RiUserLine,
} from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const [searchedjobs, setSearchedJobs] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [resultsHover, setResultsHover] = useState(false);
  const { searchTerm, setSearchTerm, baseURL, setSearchUrl } =
    useGlobalContext();
  const userInfo = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const searchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/jobs?jobTitle=${searchTerm}`
      );
      setSearchedJobs(data.jobs);
    } catch (error) {}
  };

  useEffect(() => {
    searchJobs();
    // eslint-disable-next-line
  }, [searchTerm]);

  const handleFocus = () => {
    setInputFocus(true);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchUrl(``);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <nav className='navbar' onMouseLeave={() => setShowProfileLinks(false)}>
      <Link to='/jobs' className='company-logo'>
        <h2>Dynamic Job Finder</h2>
      </Link>

      {pathname === `/jobs` && (
        <>
          {/* DESKTOP NAV ITEMS */}
          <div className='desktop-search'>
            <input
              type='text'
              placeholder='Search for Job titles'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleFocus}
              onBlur={() => {
                if (!resultsHover) {
                  setInputFocus(false);
                }
              }}
            />
            <div className='search-btn'>
              <RiSearch2Line />
            </div>
            {inputFocus && (
              <div
                className='results'
                onMouseEnter={() => setResultsHover(true)}
                onMouseLeave={() => {
                  setResultsHover(false);
                  setInputFocus(false);
                }}
              >
                {searchedjobs.length > 0 ? (
                  <>
                    {searchedjobs.slice(0, 4).map((job) => {
                      const { jobTitle, _id } = job;
                      return (
                        <div className='job' key={_id}>
                          <h3
                            onClick={(e) => {
                              setSearchTerm(e.target.textContent);
                              setSearchUrl(`?jobTitle=${e.target.textContent}`);
                            }}
                          >
                            {jobTitle}
                          </h3>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className='no-jobs'>
                    <h3>No Jobs</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
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
                        ? `/employer-jobs`
                        : '/my-jobs'
                    }
                  >
                    My jobs
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
