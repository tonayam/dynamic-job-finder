import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const EmployerRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem(`userInfo`));
  return (user && user.role === `employer`) ||
    (user && user.role === `admin`) ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
};

export default EmployerRoutes;
