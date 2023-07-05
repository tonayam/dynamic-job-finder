import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Jobs from '../../components/Jobs/Jobs';

const Home = () => {
  return (
    <main className='home-page'>
      <Navbar />
      <Jobs />
    </main>
  );
};

export default Home;
