import React, { useState } from 'react';
import { RiCloseFill, RiMenu4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import headerImg from '../../assets/loops.webp';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className='home-page'>
      <Navbar />
      <header className='header'>
        <div className='info'>
          <h1>Your Dream Career Is Waiting</h1>
          <p>
            Discover your dream job effortlessly. Explore diverse opportunities,
            apply with ease, and propel your career forward on our user-friendly
            job posting platform.
          </p>
          <button className='gold' onClick={() => navigate(`/sign-in`)}>
            Explore Jobs
          </button>
        </div>
        <div className='img'>
          <img src={headerImg} alt='header' />
        </div>
      </header>
    </main>
  );
};

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className='home-nav'>
      {/* MOBILE */}
      <div className='mobile'>
        <div className='company-logo'>
          <h2>Dynamic Job Finder</h2>
        </div>
        <div className='hamburger'>
          {showNav ? (
            <RiCloseFill onClick={() => setShowNav(false)} />
          ) : (
            <RiMenu4Line onClick={() => setShowNav(true)} />
          )}
        </div>
        <div className={`links ${showNav ? `show` : ``}`}>
          <Link to='/about-us'>About Us</Link>
          <Link to='/contact-us'>Contact Us</Link>
          <Link to='/sign-in'>Log in</Link>
        </div>
      </div>

      {/* DESKTOP */}
      <div className='desktop'>
        <div className='company-logo'>
          <h2>Dynamic Job Finder</h2>
        </div>
        <div className='links'>
          <Link to='/about-us'>About Us</Link>
          <Link to='/contact-us'>Contact Us</Link>
          <Link to='/sign-in'>Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Home;
