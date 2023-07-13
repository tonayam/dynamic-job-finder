import React, { useState } from 'react';
import {
  RiMenu4Line,
  RiCloseFill,
  RiSearch2Line,
  RiUserLine,
} from 'react-icons/ri';
import { mobileNavLinksBatch1, mobileNavLinksBatch2 } from '../../data/data';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfileLinks, setShowProfileLinks] = useState(false);

  return (
    <nav className='navbar' onMouseLeave={() => setShowProfileLinks(false)}>
      <Link to="/" className='logo'></Link>

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
              {mobileNavLinksBatch1.map((item, linkIndex) => {
                const { link, name } = item;
                return (
                  <li key={linkIndex}>
                    <Link to={link}>{name}</Link>
                  </li>
                );
              })}
            </ul>
            <div className='divider'></div>
            <ul>
              {mobileNavLinksBatch2.map((item, linkIndex) => {
                const { link, name } = item;
                return (
                  <li key={linkIndex}>
                    <Link to={link}>{name}</Link>
                  </li>
                );
              })}
            </ul>
            <p>Sign Out</p>
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
          {mobileNavLinksBatch1.map((item, linkIndex) => {
            const { link, name } = item;
            return (
              <li key={linkIndex}>
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
        <div className='divider'></div>
        <ul>
          {mobileNavLinksBatch2.map((item, linkIndex) => {
            const { link, name } = item;
            return (
              <li key={linkIndex}>
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
        <p>Sign Out</p>
      </div>
    </nav>
  );
};

export default Navbar;
