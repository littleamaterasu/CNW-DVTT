import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function User({ id, onClose }) {
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: '',
        image: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState('');

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
                    phone: data.phone,
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

    const getInitials = (name) => {
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials;
    };

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/delete?id=${id}`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            toast.success('User deleted successfully');
            onClose();
        } catch (error) {
            toast.error('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const handleSendEmail = async () => {
        try {
            await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/checkMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: userDetails.email,
                    otp: `send to ${userDetails.name}: ${otp}`,
                }),
            });

            toast.success('Email sent successfully');
            setIsModalOpen(false); // Close the modal after sending email
            setOtp(''); // Reset OTP input
        } catch (error) {
            toast.error('Error sending email');
            console.error('Error sending email:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <ToastContainer />
            <div className="bg-white p-6 rounded shadow-lg relative text-black">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>
                {userDetails.image ? (
                    <img src={userDetails.image} alt="User Profile" className="w-24 h-24 rounded-full mb-4" />
                ) : (
                    <div className="w-24 h-24 rounded-full mb-4 bg-gray-500 flex items-center justify-center text-white text-2xl font-bold">
                        {getInitials(userDetails.name)}
                    </div>
                )}
                <h2 className="text-xl font-bold mb-2">{userDetails.name}</h2>
                <p className="text-black mb-2">Username: {userDetails.username}</p>
                <p className="text-black mb-2">Email: {userDetails.email}</p>
                <p className="text-black mb-2">Phone Number: {userDetails.phone}</p>
                <div className="flex space-x-2 mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Send Email
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className="flex space-x-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleSendEmail}
                            >
                                Send Email
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
