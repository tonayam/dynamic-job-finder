import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const baseURL = `https://dynamic-job-finder-api.onrender.com/api/v1`;
  // const baseURL = ` http://localhost:5000/api/v1`;
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [lastRoute, setLastRoute] = useState(``);
  const [allJobs, setAllJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(``);
  const [activeAppliedJob, setActiveAppliedJob] = useState({});
  const [activeSavedJob, setActiveSavedJob] = useState({});
  const [showModal, setShowModal] = useState(``);
  const [searchTerm, setSearchTerm] = useState(``);
  const [searchUrl, setSearchUrl] = useState(``);

  const [jobApplicationInfo, setJobApplicationInfo] = useState({
    job: ``,
    employer: ``,
    firstName: ``,
    lastName: ``,
    email: ``,
    city: ``,
    phone: ``,
    resume: ``,
    coverLetter: ``,
    expectedSalary: ``,
    noticePeriod: ``,
    applicationReason: ``,
  });

  const fetchAllJobs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/jobs${searchUrl}`);
      setAllJobs(data.jobs);
      setActiveJob(data.jobs[0]._id);
    } catch (error) {}
  };

  // FUNCTION TO REVEAL PASSWORD
  const revealPassword = () => {
    const passwordInput = document.querySelector(`#password`);
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  useEffect(() => {
    fetchAllJobs();
    // eslint-disable-next-line
  }, [searchUrl]);

  return (
    <AppContext.Provider
      value={{
        baseURL,
        showJobDetails,
        setShowJobDetails,
        applicationStep,
        setApplicationStep,
        lastRoute,
        setLastRoute,
        allJobs,
        fetchAllJobs,
        activeJob,
        setActiveJob,
        activeAppliedJob,
        setActiveAppliedJob,
        activeSavedJob,
        setActiveSavedJob,
        jobApplicationInfo,
        setJobApplicationInfo,
        showModal,
        setShowModal,
        revealPassword,
        searchTerm,
        setSearchTerm,
        searchUrl,
        setSearchUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
