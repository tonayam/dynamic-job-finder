import { useState } from 'react';
import signInUpImg from '../../assets/sign-in-img.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';
import loader from '../../assets/white-loader.svg';
import { toast } from 'react-toastify';

export const UserSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { baseURL } = useGlobalContext();
  const formik = useFormik({
    initialValues: {
      name: ``,
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Full name is required')
        .test(
          'at-least-two-names',
          'Full name must have at least two names',
          (value) => {
            const names = value ? value.trim().split(' ') : [];
            return names.length >= 2;
          }
        ),
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
      signUpUser();
    },
  });

  const signUpUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseURL}/auth/register`, {
        name: formik.values.name.toLocaleLowerCase(),
        email: formik.values.email.toLocaleLowerCase(),
        password: formik.values.password,
      });
      setLoading(false);
      sessionStorage.setItem(`userInfo`, JSON.stringify(data));
      toast.success(`Registration Successfull`);
      navigate(`/jobs`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

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
        <form action='' onSubmit={formik.handleSubmit}>
          <h2 className='title'>Sign Up</h2>

          <div className='options'>
            <h3 className='active'>Job seeker</h3>
            <h3 onClick={() => navigate(`/sign-up/employer`)}>Employer</h3>
          </div>

          {/* JOB SEEKER NAME */}
          <div className='form-control'>
            <label
              htmlFor='name'
              className={formik.errors.name && formik.touched.name && `error`}
            >
              {formik.errors.name && formik.touched.name
                ? formik.errors.name
                : `Name`}
            </label>
            <input
              type='name'
              id='name'
              name='name'
              placeholder='John Doe'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* EMAIL */}
          <div className='form-control'>
            <label
              htmlFor='email'
              className={formik.errors.email && formik.touched.email && `error`}
            >
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : `Email`}
            </label>
            <input
              type='email'
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
                formik.errors.password && formik.touched.password && `error`
              }
            >
              {formik.errors.password && formik.touched.password
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
            Sign Up {loading && <img src={loader} alt='' />}
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

export const EmployerSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { baseURL } = useGlobalContext();
  const formik = useFormik({
    initialValues: {
      companyName: ``,
      email: ``,
      password: ``,
      companyDesc: ``,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company name is required'),
      companyDesc: Yup.string().required('What does your company do?'),
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
      signUpEmployer();
    },
  });

  const signUpEmployer = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseURL}/auth/employer/register`, {
        companyName: formik.values.companyName.toLocaleLowerCase(),
        companyDesc: formik.values.companyDesc.toLocaleLowerCase(),
        email: formik.values.email.toLocaleLowerCase(),
        password: formik.values.password,
      });
      setLoading(false);
      console.log(data);
      sessionStorage.setItem(`userInfo`, JSON.stringify(data));
      toast.success(`Registration Successfull`);
      navigate(`/employer-profile`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <main className='sign-up-page employer-sign-up'>
      <div className='greeting'>
        <div className='img'>
          <img src={signInUpImg} alt='sign in' />
        </div>
        <h1>Welcome Aboard</h1>
        <p></p>
      </div>

      <div className='form-container'>
        <form action='' onSubmit={formik.handleSubmit}>
          <h2 className='title'>Sign Up</h2>

          <div className='options'>
            <h3 onClick={() => navigate(`/sign-up`)}>Job seeker</h3>
            <h3 className='active'>Employer</h3>
          </div>

          {/* COMPANY NAME */}
          <div className='form-control'>
            <label
              htmlFor='company-name'
              className={
                formik.errors.companyName &&
                formik.touched.companyName &&
                `error`
              }
            >
              {formik.errors.companyName && formik.touched.companyName
                ? formik.errors.companyName
                : `Company Name`}
            </label>
            <input
              type='name'
              id='company-name'
              name='companyName'
              placeholder='John Doe'
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* EMAIL */}
          <div className='form-control'>
            <label
              htmlFor='email'
              className={formik.errors.email && formik.touched.email && `error`}
            >
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : `Email`}
            </label>
            <input
              type='email'
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
                formik.errors.password && formik.touched.password && `error`
              }
            >
              {formik.errors.password && formik.touched.password
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

          {/* INFORMATION ABOUT THE COMPANY */}
          <div className='form-control'>
            <label
              htmlFor='company-desc'
              className={
                formik.errors.companyDesc &&
                formik.touched.companyDesc &&
                `error`
              }
            >
              {formik.errors.companyDesc && formik.touched.companyDesc
                ? formik.errors.companyDesc
                : `What does your company do?`}
            </label>
            <input
              type='name'
              id='company-desc'
              name='companyDesc'
              value={formik.values.companyDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type='submit' className='gold'>
            Sign Up {loading && <img src={loader} alt='' />}
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

export const UserSignIn = () => {
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
      const { data } = await axios.post(`${baseURL}/auth/login`, {
        email: formik.values.email.toLocaleLowerCase(),
        password: formik.values.password,
      });
      setLoading(false);
      sessionStorage.setItem(`userInfo`, JSON.stringify(data));
      toast.success(`Login Successfull`);
      navigate(`/jobs`);
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

          <div className='options'>
            <h3 className='active'>Job seeker</h3>
            <h3 onClick={() => navigate(`/sign-in/employer`)}>Employer</h3>
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

export const EmployerSignIn = () => {
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
      const { data } = await axios.post(`${baseURL}/auth/employer/login`, {
        email: formik.values.email.toLocaleLowerCase(),
        password: formik.values.password,
      });
      setLoading(false);
      sessionStorage.setItem(`userInfo`, JSON.stringify(data));
      toast.success(`Login Successfull`);
      navigate(`/employer-profile`);
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

          <div className='options'>
            <h3 onClick={() => navigate(`/sign-in`)}>Job seeker</h3>
            <h3 className='active'>Employer</h3>
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
