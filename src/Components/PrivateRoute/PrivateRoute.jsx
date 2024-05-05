import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ auth, children }) => {
    console.log(auth)
    console.log(children)
    return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
