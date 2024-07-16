import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useSelector((state) => state.auth);

  
  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = ({children,user,redirect="/login"}) => {
//   if(!user) return <Navigate to={redirect}/>
//   return  children //? children : <Outlet/>
// }

// export default ProtectedRoute