/* import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = () => {

  const location = useLocation();
  const auth = true;

  return auth ? <Navigate to="/sign-in" /> : <Navigate to="/sign-up" />;

}

export default ProtectedRoute;
 */

import React from 'react';
import {Navigate } from "react-router-dom";

const RequireAuth = ({ loggedIn, children  }) => {
  return loggedIn ? children : <Navigate to="/sign-up" />
  }

export default RequireAuth;