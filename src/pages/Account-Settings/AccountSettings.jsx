import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useGlobalContext } from '../../context/context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import loader from '../../assets/white-loader.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const { baseURL, revealPassword } = useGlobalContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const formik = useFormik({
    initialValues: {
      oldPassword: ``,
      newPassword: ``,
      confirmPassword: ``,
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, `Minimum of 8 characters`)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'At least 1 special character and a number'
        )
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit() {
      updatePassword();
    },
  });

  const updatePassword = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${baseURL}/users/update-password`,
        {
          oldPassword: formik.values.oldPassword,
          newPassword: formik.values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(`Password Updated`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <Navbar />
      <main className='account-settings-page'>
        <Sidebar activePage={`account-settings`} />
        <div className='page-content'>
          <div className='page-title'>
            <h2>Account Settings</h2>
          </div>

          {/* EMAIL */}
          {/* <div className='email'>
            <p>johndoe@gmail.com</p>
            <button className='transparent'>Change</button>
          </div> */}

          {/* PASSWORD RESET */}
          <div className='password-reset'>
            <h3 className='title'>Password Reset</h3>
            <form action='' onSubmit={formik.handleSubmit}>
              <div className='form-control'>
                <label htmlFor='oldPassword'>Current Password</label>
                <input
                  type='text'
                  id='oldPassword'
                  name='oldPassword'
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {/* NEW PASSWORD */}
              <div className='form-control'>
                <label
                  htmlFor='newPassword'
                  className={
                    formik.touched.newPassword && formik.errors.newPassword
                      ? `error`
                      : null
                  }
                >
                  {formik.touched.newPassword && formik.errors.newPassword
                    ? formik.errors.newPassword
                    : `New Password`}
                </label>
                <div className='password-cont'>
                  <input
                    type='password'
                    id='password'
                    name='newPassword'
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p
                    className='reveal-btn'
                    onClick={() => {
                      revealPassword();
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className='form-control'>
                <label
                  htmlFor='confirmPassword'
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? `error`
                      : null
                  }
                >
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : `Confirm New Password`}
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button className='blue' type='submit'>
                Update Password
                {loading ? <img src={loader} alt='' /> : null}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountSettings;
