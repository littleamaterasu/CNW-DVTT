import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    if (!role) {
        return <Navigate to="/login" />;
    }
    if (role && role.includes('ROLE_ADMIN')) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateAdminRoute;
