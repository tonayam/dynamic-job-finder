import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showJobDetails, setShowJobDetails] = useState(false);

  return (
    <AppContext.Provider value={{ showJobDetails, setShowJobDetails }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
