import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CKEditor } from 'ckeditor4-react';

const CreateJob = () => {
  return (
    <>
      <Navbar />
      <main className='create-job-page'>
        <form action=''>
        <h1 className='title'>Create Job</h1>
          <div className='form-control'>
            <label htmlFor='company-name'>Company Name</label>
            <input type='text' id='company-name' />
          </div>
          <div className='form-control'>
            <label htmlFor='job-title'>Job Title</label>
            <input type='text' id='job-title' />
          </div>
          <div className='form-control'>
            <label htmlFor='job-location'>Job Location</label>
            <input type='text' id='job-location' />
          </div>
          <div className='form-control'>
            <label htmlFor='job-description'>Job Description</label>
            <CKEditor
              data='<p>Initial content</p>'
              onChange={(event) => console.log(event.editor.getData())}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='offered-salary'>Offered Salary</label>
            <input type='text' id='offered-salary' />
          </div>
          <div className='form-control'>
            <label htmlFor='gender'>Gender</label>
            <input type='text' id='gender' />
          </div>
          <div className='form-control'>
            <label htmlFor='experience'>Experience</label>
            <input type='text' id='experience' />
          </div>
          <div className='form-control'>
            <label htmlFor='qualification'>Qualification</label>
            <input type='text' id='qualification' />
          </div>
          <div className='form-control'>
            <label htmlFor='expriration-date'>
              Job Application Expiration Date
            </label>
            <input type='datetime-local' id='expriration-date' />
          </div>
          <button className='blue'>Submit</button>
        </form>
      </main>
    </>
  );
};

export default CreateJob;
