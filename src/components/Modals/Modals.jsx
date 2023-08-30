import { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import { FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import loader from '../../assets/white-loader.svg';

// MODAL FOR WHEN EMPLOYER WANT TO UPDATE THEIR INFO
export const UpdateEmployerInfoModal = ({
  setShowUpdateModal,
  employerDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const { baseURL } = useGlobalContext();
  const { token } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;

  const formik = useFormik({
    initialValues: {
      companyName: ``,
      companyDesc: ``,
      primaryIndustry: ``,
      industryCategory: ``,
      location: ``,
      noOfEmployees: ``,
    },
    onSubmit() {
      updateInfo();
    },
  });

  const updateInfo = async () => {
    const {
      companyDesc,
      companyName,
      industryCategory,
      location,
      noOfEmployees,
      primaryIndustry,
    } = formik.values;
    try {
      setLoading(true);
      await axios.patch(
        `${baseURL}/employers/${employerDetails._id}`,
        {
          companyName: companyName ? companyName : employerDetails.companyName,
          companyDesc: companyDesc ? companyDesc : employerDetails.companyDesc,
          primaryIndustry: primaryIndustry
            ? primaryIndustry
            : employerDetails.primaryIndustry,
          industryCategory: industryCategory
            ? industryCategory
            : employerDetails.industryCategory,
          location: location ? location : employerDetails.location,
          noOfEmployees: noOfEmployees
            ? noOfEmployees
            : employerDetails.noOfEmployees,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(`Information Updated`);
      setShowUpdateModal(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className='modal-container'>
      <div className='modal update-details'>
        <div className='title-btn'>
          <h2>Update Info</h2>
          <div className='close-btn'>
            <FaTimes
              onClick={() => {
                setShowUpdateModal(false);
              }}
            />
          </div>
        </div>

        {/* FORM */}
        <form action='' onSubmit={formik.handleSubmit}>
          <div className='form-control'>
            <label htmlFor='companyName'>Company Name</label>
            <input
              type='text'
              id='companyName'
              name='companyName'
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='companyDesc'>Description</label>
            <input
              type='text'
              id='companyDesc'
              name='companyDesc'
              value={formik.values.companyDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='primaryIndustry'>Primary Industry</label>
            <input
              type='text'
              id='primaryIndustry'
              name='primaryIndustry'
              value={formik.values.primaryIndustry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='industryCategory'>Industry Category</label>
            <input
              type='text'
              id='industryCategory'
              name='industryCategory'
              value={formik.values.industryCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='location'>Company Location</label>
            <input
              type='text'
              id='location'
              name='location'
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='noOfEmployees'>No of Employees</label>
            <input
              type='text'
              id='noOfEmployees'
              name='noOfEmployees'
              value={formik.values.noOfEmployees}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='btns'>
            <button className='blue' type='submit'>
              Save Changes
              {loading && <img src={loader} alt='' />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
