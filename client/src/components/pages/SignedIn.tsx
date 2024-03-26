import React from 'react'
import { useAuth } from '../context/auth-provider'
import { Navigate } from 'react-router-dom';

const SignedIn = ({children}: {
  children: React.ReactNode
}) => {
  const {user}= useAuth();
  const isSignedIn = user?.isAuthenticated;
  return isSignedIn ? children  : <Navigate to="/login" />;
}

export default SignedIn