import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);

  return (
    <AppContext.Provider
      value={{
        showJobDetails,
        setShowJobDetails,
        applicationStep,
        setApplicationStep,
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
