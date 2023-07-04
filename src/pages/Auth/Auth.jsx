import { useState } from 'react';
import signInUpImg from '../../assets/sign-in-img.png';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const [formType, setFormType] = useState(`job-seeker`);

  return (
    <main className='sign-up-page'>
      <div className='greeting'>
        <div className='img'>
          <img src={signInUpImg} alt='sign in' />
        </div>
        <h1>Welcome Aboard</h1>
        <p></p>
      </div>

      <div className='form-container'>
        <form action=''>
          <h2 className='title'>Sign Up</h2>

          <div className='options'>
            <h3
              className={formType === `job-seeker` && `active`}
              onClick={() => setFormType(`job-seeker`)}
            >
              Job seeker
            </h3>
            <h3
              className={formType === `employer` && `active`}
              onClick={() => setFormType(`employer`)}
            >
              Employer
            </h3>
          </div>

          {/* JOB SEEKER NAME/COMPANY NAME */}
          <div className='form-control'>
            <label htmlFor='name'>
              {formType === `job-seeker` ? `Name` : `Company Name`}
            </label>
            <input type='name' id='name' name='name' placeholder='John Doe' />
          </div>

          {/* EMAIL */}
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
            />
          </div>

          {/* PASSWORD */}
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='**********'
            />
          </div>

          {/* INFORMATION ABOUT THE COMPANY */}
          {formType === `employer` && (
            <div className='form-control'>
              <label htmlFor='company-info'>What does your Company do?</label>
              <input type='text' id='comapany-info' name='comapany-info' />
            </div>
          )}

          <button type='submit' className='gold'>
            Sign In
          </button>

          {/* KEEP ME SIGNED IN/FORGOT PASSWORD */}
          <div className='container'>
            <div className='remember-me'>
              <input type='checkbox' id='remember' name='remember' />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <p className='forgot-password'>Forgot password?</p>
          </div>

          <p className='existing-account'>
            Already have an account? <Link to='/sign-in'>Sign In</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export const SignIn = () => {
  return (
    <main className='sign-in-page'>
      <div className='greeting'>
        <div className='img'>
          <img src={signInUpImg} alt='sign in' />
        </div>
        <h1>Welcome Back</h1>
        <p>Login to continue using our awesome platform</p>
      </div>

      <div className='form-container'>
        <form action=''>
          <h2 className='title'>Sign In</h2>

          {/* EMAIL */}
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='emai'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
            />
          </div>

          {/* PASSWORD */}
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='**********'
            />
          </div>

          <button type='submit' className='gold'>
            Sign In
          </button>

          {/* KEEP ME SIGNED IN/FORGOT PASSWORD */}
          <div className='container'>
            <div className='remember-me'>
              <input type='checkbox' id='remember' name='remember' />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <p className='forgot-password'>Forgot password?</p>
          </div>

          <p className='existing-account'>
            New to our platform? <Link to='/sign-up'>Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};
