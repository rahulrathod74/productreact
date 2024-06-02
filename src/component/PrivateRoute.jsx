import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {auth}=useContext(AuthContext)
    if(!auth.isLoggedIn){
       return <Navigate to="/login"/>
    }
  return children
}

export default PrivateRoute