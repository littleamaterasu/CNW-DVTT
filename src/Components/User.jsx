import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function User({ id }) {
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: '',
        image: '',
        phoneNumber: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getUser?id=${id}`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUserDetails({
                    name: data.name,
                    username: data.username,
                    image: data.image,
                    phoneNumber: data.phoneNumber,
                    email: data.email
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4 border rounded shadow-md">
            <img src={userDetails.image} alt="User Profile" className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold mb-2">{userDetails.name}</h2>
            <p className="text-gray-700 mb-2">Username: {userDetails.username}</p>
            <p className="text-gray-700 mb-2">Email: {userDetails.email}</p>
            <p className="text-gray-700 mb-2">Phone Number: {userDetails.phoneNumber}</p>
        </div>
    );
}

export default User;
