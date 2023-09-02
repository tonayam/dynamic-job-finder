import { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import { FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import loader from '../../assets/white-loader.svg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

export const UpdateEmployeeInfo = ({
  labelName,
  infoToUpdate,
  oldInfo,
  setOldInfo,
}) => {
  const { showModal, setShowModal, baseURL } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(oldInfo || ``);
  const { token, userId } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;
  const handleClose = () => setShowModal(``);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `90%`,
    maxWidth: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
    outline: `none`,
  };

  const formData = new FormData();
  formData.append(`${infoToUpdate}`, info);

  const updateInfo = async () => {
    try {
      setLoading(true);
      await axios.patch(`${baseURL}/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(true);
      setLoading(false);
      toast.success(`Info Updated`);
      setShowModal(``);
      setOldInfo(``);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo();
  };

  return (
    <div>
      <Modal
        open={showModal === `update info` && true}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='update-location'
      >
        <Box sx={style} className='box'>
          <form action='' onSubmit={handleSubmit}>
            <div className='form-control'>
              <label htmlFor='current-location'>{labelName}</label>
              <input
                type='text'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>
            <div className='btn-right'>
              <button className='blue' type='submit'>
                Update {loading && <img src={loader} alt='' />}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateEmployeeInfoPrimaryIndustry = ({
  infoToUpdate,
  oldInfo,
  setOldInfo,
}) => {
  const { showModal, setShowModal, baseURL } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(oldInfo || ``);
  const { token, userId } = JSON.parse(sessionStorage.getItem(`userInfo`))
    ? JSON.parse(sessionStorage.getItem(`userInfo`))
    : ``;
  const handleClose = () => setShowModal(``);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `90%`,
    maxWidth: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
    outline: `none`,
  };

  const formData = new FormData();
  formData.append(`${infoToUpdate}`, info);

  const updateInfo = async () => {
    try {
      setLoading(true);
      await axios.patch(`${baseURL}/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(true);
      setLoading(false);
      toast.success(`Info Updated`);
      setShowModal(``);
      setOldInfo(``);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo();
  };

  return (
    <div>
      <Modal
        open={showModal === `update info select` && true}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='update-location'
      >
        <Box sx={style} className='box'>
          <form action='' onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, my: 3 }} fullWidth variant='standard'>
              <InputLabel
                htmlFor='primaryIndustry'
                id='demo-multiple-name-label'
              >
                Primary Industry
              </InputLabel>

              <Select
                labelId='primaryIndustry'
                id='demo-customized-select'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              >
                <MenuItem value='none'>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='engineering'>Engineering</MenuItem>
                <MenuItem value='product panagement'>
                  Product Management
                </MenuItem>
                <MenuItem value='sale'>Sales</MenuItem>
                <MenuItem value='data science'>Data Science</MenuItem>
                <MenuItem value='marketing'>Marketing</MenuItem>
                <MenuItem value='operations'>Operations</MenuItem>
                <MenuItem value='design'>Design</MenuItem>
                <MenuItem value='talent management'>Talent Management</MenuItem>
                <MenuItem value='recruitment'>Recruitment</MenuItem>
                <MenuItem value='human resources'>Human Resources</MenuItem>
                <MenuItem value='project management'>
                  Project Management
                </MenuItem>
              </Select>
            </FormControl>

            <div className='btn-right'>
              <button className='blue' type='submit'>
                Update {loading && <img src={loader} alt='' />}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
