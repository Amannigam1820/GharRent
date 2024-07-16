import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthProtectedRoute = ({ element: Component }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate to="/" /> : <Component />;
};

export default AuthProtectedRoute;