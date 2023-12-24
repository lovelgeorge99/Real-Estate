import React from 'react';
import { useSelector } from 'react-redux'

import useAuth from './useAuth'
import { useLocation,Navigate,Outlet } from 'react-router-dom'

const  RequireAuth=()=> {
  const { currentUser} = useSelector((state) => state.user);
  const location = useLocation()
  const content =(
    currentUser === null ?
    <Navigate to="/sign-in" state={{from:location}} replace />
    : currentUser.role == "admin" ?
    <Outlet />
    :
    <Navigate to="/error" state={{from:location}} replace />
  )

  
  // const isAdmin=useAuth();
  // const content = (
  //   isAdmin ?<Outlet />
  //   :<Navigate to="/sign-in" state={{from:location}} replace />

  // )
  return content
}

export default RequireAuth