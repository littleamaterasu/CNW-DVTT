import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import User from '../../Components/User';
import { API_BASE_URL } from '../../config';

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getAllUser`, {
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserClick = (id) => {
        setSelectedUserId(id);
    };

    const handleDeleteUser = async (id) => {
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

            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const handleSendEmail = async () => {
        try {
            const user = users.find(user => user.id === currentUserId);

            await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/checkMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: user.email,
                    otp: `send to ${user.name}: ${otp}`,
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

    const openModal = (id) => {
        setCurrentUserId(id);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 bg-dark-blue min-h-screen text-white">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={() => navigate('/admin')}
                >
                    Go to Admin
                </button>
                <button
                    className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={fetchUsers}
                >
                    <FontAwesomeIcon icon={faSync} className="mr-2" />
                    Reload
                </button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-gray-800 p-4 border rounded cursor-pointer hover:bg-gray-700"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <p className="text-gray-400">{user.email}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteUser(user.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(user.id);
                                    }}
                                >
                                    Send Email
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedUserId && (
                <div className="mt-4">
                    <User id={selectedUserId} onClose={() => setSelectedUserId(null)} />
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg">
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

export default UserList;
