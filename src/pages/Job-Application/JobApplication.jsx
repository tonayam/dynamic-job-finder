import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useGlobalContext } from '../../context/context';
import { RiCloseFill } from 'react-icons/ri';
import MobileJobInfo from '../../components/Job-Application-Job-Info/MobileJobInfo';
import loader from '../../assets/white-loader.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const JobApplication = () => {
  const { applicationStep } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [applicationStep]);

  return (
    <>
      <Navbar />
      <main className='job-application-page'>
        <div className='application-steps'>
          {applicationStep === 1 ? (
            <ApplicationStep1 />
          ) : applicationStep === 2 ? (
            <ApplicationStep2 />
          ) : applicationStep === 3 ? (
            <ApplicationStep3 />
          ) : null}
        </div>
        <MobileJobInfo />
        <DesktopJobInfo />
      </main>
    </>
  );
};

const DesktopJobInfo = () => {
  const { activeJob, baseURL } = useGlobalContext();
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/jobs/${activeJob}`);
      setJobDetails(data.job);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [activeJob]);
  return (
    <div className='desktop-job-info'>
      <div className='container'>
        {loading ? (
          <div className='loader'>
            <img src={loader} alt='' />
          </div>
        ) : (
          <>
            <div className='job-company'>
              <h3>{jobDetails.jobTitle}</h3>
              <p>{jobDetails.companyName}</p>
            </div>
            {/* FULL JOB DESCRIPTION */}
            <div className='full-description'>
              <h2 className='title'>Job Description</h2>
              <div dangerouslySetInnerHTML={{ __html: jobDetails.desc }}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// APPLICATIONS STEPS
const ApplicationStep1 = () => {
  const { setApplicationStep, setJobApplicationInfo, jobApplicationInfo } =
    useGlobalContext();

  const formik = useFormik({
    initialValues: {
      firstName: ``,
      lastName: ``,
      email: ``,
      city: ``,
      phone: ``,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(`First name is required`),
      lastName: Yup.string().required(`Last name is required`),
      email: Yup.string()
        .email(`Provide a valid email`)
        .required(`Email is required`),
      city: Yup.string(),
      phone: Yup.string(),
    }),
    onSubmit() {
      const { firstName, city, email, lastName, phone } = formik.values;
      setJobApplicationInfo({
        ...jobApplicationInfo,
        firstName,
        lastName,
        email,
        city,
        phone,
      });
      setApplicationStep(2);
    },
  });

  return (
    <section className='application-step-one'>
      <h2 className='title'>Add your contact information</h2>
      <form action='' onSubmit={formik.handleSubmit}>
        {/* FIRST NAME */}
        <div className='form-control'>
          <label
            htmlFor='first-name'
            className={
              formik.touched.firstName && formik.errors.firstName
                ? `error`
                : null
            }
          >
            {formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : `First Name`}
          </label>
          <input
            type='text'
            id='first-name'
            name='firstName'
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>

        {/* LAST NAME */}
        <div className='form-control'>
          <label
            htmlFor='last-name'
            className={
              formik.touched.lastName && formik.errors.lastName ? `error` : null
            }
          >
            {formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : `  Last Name`}
          </label>
          <input
            type='text'
            id='last-name'
            name='lastName'
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>

        {/* EMAIL */}
        <div className='form-control'>
          <label
            htmlFor='email'
            className={
              formik.touched.email && formik.errors.email ? `error` : null
            }
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ` Email`}
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>

        {/* CITY */}
        <div className='form-control'>
          <label
            htmlFor='city'
            className={
              formik.touched.city && formik.errors.city ? `error` : null
            }
          >
            City <span>(not required)</span>{' '}
          </label>
          <input
            type='text'
            id='city'
            name='city'
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>

        {/* PHONE NUMBER */}
        <div className='form-control'>
          <label
            htmlFor='phone-number'
            className={
              formik.touched.phone && formik.errors.phone ? `error` : null
            }
          >
            Phone Number <span>(not required)</span>{' '}
          </label>
          <input
            type='tel'
            id='phone-number'
            name='phone'
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <button className='blue' type='submit'>
          Continue
        </button>
      </form>
    </section>
  );
};

const ApplicationStep2 = () => {
  const { setApplicationStep, setJobApplicationInfo, jobApplicationInfo } =
    useGlobalContext();
  const [resume, setResume] = useState({ name: `` });

  return (
    <section className='application-step-two'>
      <h2 className='title'>Add a resume for the employer</h2>
      <div className='upload-resume'>
        <label htmlFor='resume-uploader'>Upload resume</label>
        <p>Use a pdf, docx, doc, rtf and txt</p>
        <input
          type='file'
          id='resume-uploader'
          accept='.pdf, .doc, .docx'
          onChange={(e) => setResume(e.target.files[0])}
        />
        {resume.name && (
          <div className='file'>
            <p className='file-name'>{resume.name}</p>
            <RiCloseFill onClick={() => setResume({})} />
          </div>
        )}
      </div>
      <div className='btns'>
        <button className='transparent' onClick={() => setApplicationStep(1)}>
          Go back
        </button>
        <button
          className='blue'
          disabled={resume.name ? false : true}
          onClick={() => {
            setJobApplicationInfo({ ...jobApplicationInfo, resume });
            setApplicationStep(3);
          }}
        >
          Continue
        </button>
      </div>
    </section>
  );
};

const ApplicationStep3 = () => {
  const navigate = useNavigate();
  const { setJobApplicationInfo, jobApplicationInfo, baseURL } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`));

  const formik = useFormik({
    initialValues: {
      coverLetter: ``,
      expectedSalary: ``,
      noticePeriod: ``,
      applicationReason: ``,
    },
    onSubmit() {
      const { coverLetter, applicationReason, expectedSalary, noticePeriod } =
        formik.values;
      setJobApplicationInfo({
        ...jobApplicationInfo,
        coverLetter,
        expectedSalary,
        noticePeriod,
        applicationReason,
      });
      submitApplication();
    },
  });

  const submitApplication = async () => {
    try {
      const formData = new FormData();
      formData.append(`job`, jobApplicationInfo.job);
      formData.append(`employer`, jobApplicationInfo.employer);
      formData.append(`firstName`, jobApplicationInfo.firstName);
      formData.append(`lastName`, jobApplicationInfo.lastName);
      formData.append(`email`, jobApplicationInfo.email);
      formData.append(`city`, jobApplicationInfo.city);
      formData.append(`phone`, jobApplicationInfo.phone);
      formData.append(`coverLetter`, jobApplicationInfo.coverLetter);
      formData.append(`expectedSalary`, jobApplicationInfo.expectedSalary);
      formData.append(`noticePeriod`, jobApplicationInfo.noticePeriod);
      formData.append(
        `applicationReason`,
        jobApplicationInfo.applicationReason
      );
      formData.append(`resume`, jobApplicationInfo.resume);
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/job-applications`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className='application-step-three'>
      <h2 className='title'>Additional Information for Employer</h2>

      <div className='additional-info'>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* COVER LETTER */}
          <div className='form-control'>
            <label htmlFor='cover-letter'>
              Cover letter <span>(optional)</span>
            </label>
            <textarea
              id='cover-letter'
              name='coverLetter'
              value={formik.values.coverLetter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>

          {/* EXPECTED SALARY */}
          <div className='form-control'>
            <label htmlFor='expected-salary'>
              Expected Salary <span>(optional)</span>
            </label>
            <input
              type='text'
              id='expected-salary'
              name='expectedSalary'
              value={formik.values.expectedSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* NOTICE PERIOD/AVAILABILITY */}
          <div className='form-control'>
            <label htmlFor='notice-period'>
              Notice Period / Availability <span>(optional)</span>
            </label>
            <select
              name='noticePeriod'
              id='notice-period'
              value={formik.values.noticePeriod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option defaultChecked hidden>
                Select an option
              </option>
              <option value='available immediately'>
                Available Immediately
              </option>
              <option value='1 week'>1 Week</option>
              <option value='2 weeks'>2 Weeks</option>
              <option value='1 month'>1 Month</option>
            </select>
          </div>

          {/* REASON FOR APPLYING */}
          <div className='form-control'>
            <label htmlFor='why-apply'>
              Why you are applying for this role? <span>(optional)</span>
            </label>
            <input
              type='text'
              id='why-apply'
              name='applicationReason'
              value={formik.values.applicationReason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='btns'>
            <button className='transparent' onClick={() => navigate(`/`)}>
              Cancel
            </button>
            <button
              className='blue'
              // onClick={() => navigate(`/job-application/application-sent`)}
              type='submit'
            >
              Submit Application {loading && <img src={loader} alt='' />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobApplication;
