import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/authContext';

function ProtectedRoute({children}) {
  const {token} = useAuth();
  console.log(token);

    if (token === null) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute