import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CKEditor } from 'ckeditor4-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import loader from '../../assets/white-loader.svg';

const CreateJob = () => {
  const { baseURL } = useGlobalContext();
  const [desc, setDesc] = useState(``);
  const [loading, setLoading] = useState(false);
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`));

  const formik = useFormik({
    initialValues: {
      companyName: ``,
      jobTitle: ``,
      offeredSalary: ``,
      gender: ``,
      experience: ``,
      qualification: ``,
      jobExpiration: ``,
      location: ``,
      keywords: ``,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required(`Please provide company name`),
      jobTitle: Yup.string().required(`Please provide job title`),
      offeredSalary: Yup.string().required(`Please provide offered salary`),
      gender: Yup.string().required(`Please provide accepted gender for role`),
      experience: Yup.string().required(`Please provide minimum experience`),
      qualification: Yup.string().required(`Please provide job qualification `),
      jobExpiration: Yup.string().required(
        `Please provide job posting expiration`
      ),
      location: Yup.string().required(`Please provide job location`),
      keywords: Yup.string().required(`Please provide job keyword(s)`),
    }),
    onSubmit() {
      console.log(formik.values);
      postJob();
    },
  });

  const postJob = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/jobs`,
        {
          ...formik.values,
          desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className='create-job-page'>
        <form action='' onSubmit={formik.handleSubmit}>
          <h1 className='title'>Create Job</h1>
          {/* COMPANY NAME */}
          <div className='form-control'>
            <label
              htmlFor='company-name'
              className={
                formik.errors.companyName && formik.touched.companyName
                  ? `error`
                  : ``
              }
            >
              {formik.errors.companyName && formik.touched.companyName
                ? formik.errors.companyName
                : `Company Name`}
            </label>
            <input
              type='text'
              id='company-name'
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='companyName'
            />
          </div>

          {/* JOB TITLE */}
          <div className='form-control'>
            <label
              htmlFor='job-title'
              className={
                formik.errors.jobTitle && formik.touched.jobTitle ? `error` : ``
              }
            >
              {formik.errors.jobTitle && formik.touched.jobTitle
                ? formik.errors.jobTitle
                : `Job Title`}
            </label>
            <input
              type='text'
              id='job-title'
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='jobTitle'
            />
          </div>

          {/* JOB LOCATION */}
          <div className='form-control'>
            <label
              htmlFor='job-location'
              className={
                formik.errors.location && formik.touched.location ? `error` : ``
              }
            >
              {formik.errors.location && formik.touched.location
                ? formik.errors.location
                : `Job Location`}
            </label>
            <input
              type='text'
              id='job-location'
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='location'
            />
          </div>

          {/* JOB DESCRIPTION */}
          <div className='form-control'>
            <label htmlFor='job-description' className={desc ? `` : `error`}>
              {desc ? `Please provide job descriptions` : `Job Description`}
            </label>
            <CKEditor
              data='<p>Initial content</p>'
              onChange={(event) => setDesc(event.editor.getData())}
            />
          </div>
          {/* OFFERED SALARY */}
          <div className='form-control'>
            <label
              htmlFor='offered-salary'
              className={
                formik.errors.offeredSalary && formik.touched.offeredSalary
                  ? `error`
                  : ``
              }
            >
              {formik.errors.offeredSalary && formik.touched.offeredSalary
                ? formik.errors.offeredSalary
                : `Offered Salary`}
            </label>
            <input
              type='text'
              id='offered-salary'
              value={formik.values.offeredSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='offeredSalary'
            />
          </div>

          {/* GEDNER */}
          <div className='form-control'>
            <label
              htmlFor='gender'
              className={
                formik.errors.gender && formik.touched.gender ? `error` : ``
              }
            >
              {formik.errors.gender && formik.touched.gender
                ? formik.errors.gender
                : `Gender`}
            </label>
            <input
              type='text'
              id='gender'
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='gender'
            />
          </div>

          {/* EXPERIENCE */}
          <div className='form-control'>
            <label
              htmlFor='experience'
              className={
                formik.errors.experience && formik.touched.experience
                  ? `error`
                  : ``
              }
            >
              {formik.errors.experience && formik.touched.experience
                ? formik.errors.experience
                : `Experience`}
            </label>
            <input
              type='text'
              id='experience'
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='experience'
            />
          </div>

          {/* QUALIFICATION */}
          <div className='form-control'>
            <label
              htmlFor='qualification'
              className={
                formik.errors.qualification && formik.touched.qualification
                  ? `error`
                  : ``
              }
            >
              {formik.errors.qualification && formik.touched.qualification
                ? formik.errors.qualification
                : `Qualification`}
            </label>
            <input
              type='text'
              id='qualification'
              value={formik.values.qualification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='qualification'
            />
          </div>

          {/* KEYWORDS */}
          <div className='form-control'>
            <label
              htmlFor='keywords'
              className={
                formik.errors.keywords && formik.touched.keywords ? `error` : ``
              }
            >
              {formik.errors.keywords && formik.touched.keywords
                ? formik.errors.keywords
                : `Keywords`}
            </label>
            <input
              type='text'
              id='keywords'
              value={formik.values.keywords}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='keywords'
            />
          </div>

          {/* JOB APPLICATION EXPIRATION DATE */}
          <div className='form-control'>
            <label
              htmlFor='expriration-date'
              className={
                formik.errors.jobExpiration && formik.touched.jobExpiration
                  ? `error`
                  : ``
              }
            >
              {formik.errors.jobExpiration && formik.touched.jobExpiration
                ? formik.errors.jobExpiration
                : `Job Application Expiration Date`}
            </label>
            <input
              type='datetime-local'
              id='expriration-date'
              value={formik.values.jobExpiration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='jobExpiration'
            />
          </div>

          {/* SUBMIT BNT */}
          <button className='blue' type='submit'>
            Submit {loading && <img src={loader} alt='' />}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateJob;
