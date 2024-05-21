import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpConfirm, setOtpConfirm] = useState('');

    const handleSendOtp = async () => {
        if (!email) {
            toast.error('Please enter your email.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getOTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            setOtpSent(true);
            toast.success('OTP sent to your email.');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const CheckOTP = async () => {
        try {

            // API?
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getpass/mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    username: email,
                    password: otpConfirm
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
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <form className="bg-white p-6 rounded shadow-md w-80">
                <div className="flex justify-between mb-4">
                    <Link to="/">
                        <button type="button" className="text-blue-500">Home</button>
                    </Link>
                    <Link to="/login">
                        <button type="button" className="text-blue-500">Login</button>
                    </Link>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="button" onClick={handleSendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
                    Send OTP
                </button>
                {otpSent &&
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="OTP"
                            value={otpConfirm}
                            onChange={(e) => setOtpConfirm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button onClick={CheckOTP}>Submit OTP</button>
                    </div>
                }
            </form>
        </div>
    );
}

export default ForgotPassword;
