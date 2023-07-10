import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <main className='contact-us-page'>
        <div className='header'>
          <h1>Contact us</h1>
        </div>

        <form action=''>
          <h5 className='title'>
            Please fill in the form below so we can respond to your inquiry
          </h5>
          <div className='form-control'>
            <label htmlFor='subject'>
              Subject <span>*</span>
            </label>
            <input type='text' id='subject' />
          </div>
          <div className='form-control'>
            <label htmlFor='first-name'>
              First Name <span>*</span>
            </label>
            <input type='text' id='first-name' />
          </div>
          <div className='form-control'>
            <label htmlFor='last-name'>
              Last Name <span>*</span>
            </label>
            <input type='text' id='last-name' />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>
              Email <span>*</span>
            </label>
            <input type='email' id='email' />
          </div>
          <div className='form-control'>
            <label htmlFor='message'>
              Message <span>*</span>
            </label>
            <textarea name='message' id='message'></textarea>
          </div>

          <button className='blue'>Submit</button>
        </form>
      </main>
    </>
  );
};

export default ContactUs;
