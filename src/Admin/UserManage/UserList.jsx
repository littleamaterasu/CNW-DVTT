import React, { useState, useEffect } from 'react';
import User from '../../Components/User';
import { API_BASE_URL } from '../../config';

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getAllUsers`, {
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

        fetchUsers();
    }, []);

    const handleUserClick = (id) => {
        setSelectedUserId(id);
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/...`, {
                // Method?
                method: '',
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.userId !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSendEmail = async (id) => {
        try {
            const user = users.find(user => user.userId === id);

            await fetch(`${API_BASE_URL[import.meta.env.MODE]}/checkMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: user.email,
                    otp: '',
                }),
            });

            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="p-4">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div
                            key={user.userId}
                            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => handleUserClick(user.userId)}
                        >
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <p className="text-gray-700">{user.email}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteUser(user.userId);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSendEmail(user.userId);
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
                    <User id={selectedUserId} />
                </div>
            )}
        </div>
    );
}

export default UserList;
