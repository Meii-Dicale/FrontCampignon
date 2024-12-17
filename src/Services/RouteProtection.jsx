import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated || !allowedRoles.includes(user?.role)) {

    // Redirige vers la page de connexion ou non autorisé
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
