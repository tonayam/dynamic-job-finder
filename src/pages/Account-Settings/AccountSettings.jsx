import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const AccountSettings = () => {
  return (
    <>
      <Navbar />
      <main className='account-settings-page'>
        <Sidebar activePage={`account-settings`} />
      </main>
    </>
  );
};

export default AccountSettings;
