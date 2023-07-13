import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useGlobalContext } from '../../context/context';
import MobileJobInfo from '../../components/Job-Application-Job-Info/MobileJobInfo';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div className='desktop-job-info'>
      <div className='container'>
        <div className='job-company'>
          <h3>Frontend Developer (React)</h3>
          <p>Revent Technologies - Lagos</p>
        </div>
        {/* FULL JOB DESCRIPTION */}
        <div className='full-description'>
          <h2 className='title'>Job Description</h2>
          <h4>About us</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            corrupti exercitationem quae omnis perspiciatis error debitis
            dolorem incidunt. Corporis harum sunt repellat sed assumenda,
            incidunt quia sapiente odit ea ut.
          </p>

          <h4>Duties And Responsibilities</h4>
          <ul>
            <li>Develop new user-facing features using React.js.</li>
            <li>
              Make your products easy to use, fast, stable and accessible.
            </li>
            <li>Use feedback from users to improve the product. </li>
            <li>Build products to match design and specified requirements.</li>
            <li>
              Make your product work across multiple devices and operating
              systems.
            </li>
          </ul>
          <h4>Skills And Abilities</h4>
          <ol>
            <li>Develop new user-facing features using React.js.</li>
            <li>
              Make your products easy to use, fast, stable and accessible.
            </li>
            <li>Use feedback from users to improve the product. </li>
            <li>Build products to match design and specified requirements.</li>
            <li>
              Make your product work across multiple devices and operating
              systems.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

// APPLICATIONS STEPS
const ApplicationStep1 = () => {
  const { setApplicationStep } = useGlobalContext();

  return (
    <section className='application-step-one'>
      <h2 className='title'>Add your contact information</h2>
      <form action=''>
        <div className='form-control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' />
        </div>
        <div className='form-control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' />
        </div>
        <div className='form-control'>
          <label htmlFor='city'>
            City <span>(not required)</span>{' '}
          </label>
          <input type='text' id='city' />
        </div>
        <div className='form-control'>
          <label htmlFor='phone-number'>
            Phone Number <span>(not required)</span>{' '}
          </label>
          <input type='tel' id='phone-number' />
        </div>
        <button className='blue' onClick={() => setApplicationStep(2)}>
          Continue
        </button>
      </form>
    </section>
  );
};

const ApplicationStep2 = () => {
  const { setApplicationStep } = useGlobalContext();

  return (
    <section className='application-step-two'>
      <h2 className='title'>Add a resume for the employer</h2>
      <div className='upload-resume'>
        <h5>Upload resume</h5>
        <p>Use a pdf, docx, doc, rtf and txt</p>
      </div>
      <div className='btns'>
        <button className='transparent' onClick={() => setApplicationStep(1)}>
          Go back
        </button>
        <button className='blue' onClick={() => setApplicationStep(3)}>
          Continue
        </button>
      </div>
    </section>
  );
};

const ApplicationStep3 = () => {
  const navigate = useNavigate();

  return (
    <section className='application-step-three'>
      <h2 className='title'>Additional Information for Employer</h2>

      <div className='additional-info'>
        <form action=''>
          <div className='form-control'>
            <label htmlFor='cover-letter'>
              Cover letter <span>(optional)</span>
            </label>
            <textarea id='cover-letter'></textarea>
          </div>
          <div className='form-control'>
            <label htmlFor='expected-salary'>
              Expected Salary <span>(optional)</span>
            </label>
            <input type='text' id='expected-salary' />
          </div>
          <div className='form-control'>
            <label htmlFor='expected-salary'>
              Notice Period / Availability <span>(optional)</span>
            </label>
            <select name='notice-period' id='notice-period'>
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
          <div className='form-control'>
            <label htmlFor='why-apply'>
              Why you are applying for this role? <span>(optional)</span>
            </label>
            <input type='text' id='why-apply' />
          </div>
        </form>
      </div>

      <div className='btns'>
        <button className='transparent' onClick={() => navigate(`/`)}>
          Cancel
        </button>
        <button className='blue'>Submit Application</button>
      </div>
    </section>
  );
};

export default JobApplication;
