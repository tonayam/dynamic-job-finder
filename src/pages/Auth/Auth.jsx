import { useState } from 'react';
import signInUpImg from '../../assets/sign-in-img.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';
import loader from '../../assets/white-loader.svg';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const [formType, setFormType] = useState(`job-seeker`);

  // const signUpUser = () => {
  //   try {
  //   } catch (error) {
  //     console.log(error.response.data.msg);
  //   }
  // };

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
  const [loading, setLoading] = useState(false);
  const { baseURL } = useGlobalContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      email: Yup.string().email(`Invalid email`).required(`Email is required`),
      password: Yup.string()
        .min(8, `Minimum of 8 characters`)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'At least 1 special character and a number'
        )
        .required('Password is required'),
    }),
    onSubmit() {
      signInUser();
    },
  });

  const signInUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseURL}/auth/login`, formik.values);
      setLoading(false);
      sessionStorage.setItem(`userInfo`, JSON.stringify(data));
      toast.success(`Login Successfull`);
      navigate(`/`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

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
        <form action='' onSubmit={formik.handleSubmit}>
          <h2 className='title'>Sign In</h2>

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
              type='emai'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* PASSWORD */}
          <div className='form-control'>
            <label
              htmlFor='password'
              className={
                formik.touched.password && formik.errors.password
                  ? `error`
                  : null
              }
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : `Password`}
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='**********'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type='submit' className='gold'>
            Sign In {loading && <img src={loader} alt='' />}
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
