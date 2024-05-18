import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    useEffect(() => {
        let timer;
        if (otp) {
            timer = setTimeout(() => {
                setOtp('');
                toast.error('OTP has expired. Please request a new one.');
            }, 300000); // 5 minutes in milliseconds
        }

        return () => clearTimeout(timer);
    }, [otp]);

    const handleSendOtp = async () => {
        try {
            // API?
            const response = await fetch(`${API_BASE_URL}/...`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    // body?
                    // id: localStorage.getItem('id'),
                    // currentPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Current password validation failed');
            }

            const data = await response.json();

            if (!data.success) {
                toast.error(data.message || 'Current password is incorrect.');
                return;
            }

            const otpCode = Math.floor(100000 + Math.random() * 900000);
            setOtp(otpCode);

            const emailResponse = await fetch(`${API_BASE_URL}/checkmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    username: data.email,
                    otp: otpCode,
                }),
            });

            if (!emailResponse.ok) {
                throw new Error('Failed to send OTP email');
            }

            setIsOtpSent(true);
            toast.success('OTP has been sent to your email.');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = () => {
        if (otp.toString() === inputOtp) {
            setIsOtpVerified(true);
            toast.success('OTP verified successfully.');
        } else {
            toast.error('Invalid OTP. Please try again.');
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match.');
            return;
        }

        try {

            // API?
            const response = await fetch(`${API_BASE_URL}/...`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    // body ?
                    // id: localStorage.getItem('id'),
                    // newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Password change failed');
            }

            const data = await response.json();

            if (data.success) {
                toast.success('Password changed successfully.');
            } else {
                toast.error(data.message || 'Password change failed.');
            }
        } catch (error) {
            toast.error('Password change failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <form onSubmit={handleChangePassword} className="bg-white p-6 rounded shadow-md w-80">
                <div className="flex justify-between mb-4">
                    <Link to="/">
                        <button type="button" className="text-blue-500">Home</button>
                    </Link>
                </div>
                {!isOtpSent && (
                    <>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button type="button" onClick={handleSendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
                            Validate Password and Send OTP
                        </button>
                    </>
                )}
                {isOtpSent && !isOtpVerified && (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={inputOtp}
                                onChange={(e) => setInputOtp(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button type="button" onClick={handleVerifyOtp} className="w-full bg-green-500 text-white p-2 rounded">
                            Verify OTP
                        </button>
                    </>
                )}
                {isOtpVerified && (
                    <>
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
                    </>
                )}
            </form>
        </div>
    );
}

export default ChangePassword;
