import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';
import Header from '../Components/Header/Header';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/changepassword`, { // Update endpoint if necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Password change failed');
            }

            if (response.status === 200) {
                toast.success('Change Password succesfully!')
            }
        } catch (error) {
            toast.error('Password change failed. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <Header />
            <div className="flex items-center justify-center mt-10">

                <ToastContainer />

                <form onSubmit={handleChangePassword} className="bg-white p-6 rounded shadow-md w-80">
                    <div className="flex justify-between mb-4">
                        <Link to="/">
                            <button type="button" className="text-blue-500">Home</button>
                        </Link>
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Change Password
                    </button>
                </form>
            </div>
        </div>

    );
}

export default ChangePassword;
