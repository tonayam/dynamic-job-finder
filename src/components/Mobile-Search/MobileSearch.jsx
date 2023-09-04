import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import { RiSearch2Line } from 'react-icons/ri';
import axios from 'axios';

const MobileSearch = () => {
  const { searchTerm, setSearchTerm, baseURL, setSearchUrl } =
    useGlobalContext();
  const [inputFocus, setInputFocus] = useState(false);
  // const [resultsHover, setResultsHover] = useState(false);
  const [searchedjobs, setSearchedJobs] = useState([]);

  const handleFocus = () => {
    setInputFocus(true);
  };

  const searchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/jobs?jobTitle=${searchTerm}`
      );
      setSearchedJobs(data.jobs);
    } catch (error) {}
  };

  useEffect(() => {
    searchJobs();
    // eslint-disable-next-line
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchUrl(``);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className='mobile-search'>
      <input
        type='text'
        placeholder='Search for Job titles'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            setInputFocus(false);
          }, 1000);
        }}
      />
      <div className='search-btn'>
        <RiSearch2Line />
      </div>
      {inputFocus && (
        <div className='results'>
          {searchedjobs.length > 0 ? (
            <>
              {searchedjobs.slice(0, 4).map((job) => {
                const { jobTitle, _id } = job;
                return (
                  <div className='job' key={_id}>
                    <h3
                      onClick={(e) => {
                        setSearchTerm(e.target.textContent);
                        setSearchUrl(`?jobTitle=${e.target.textContent}`);
                        setInputFocus(false);
                      }}
                    >
                      {jobTitle}
                    </h3>
                  </div>
                );
              })}
            </>
          ) : (
            <div className='no-jobs'>
              <h3>No Jobs</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
