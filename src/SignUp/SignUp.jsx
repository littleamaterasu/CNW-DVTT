import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [inputConfirmationCode, setInputConfirmationCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isCodeExpired, setIsCodeExpired] = useState(true);

    useEffect(() => {
        let timer;
        if (confirmationCode) {
            timer = setTimeout(() => {
                setIsCodeExpired(true);
            }, 300000); // 5 minutes in milliseconds
        }

        return () => clearTimeout(timer);
    }, [confirmationCode]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isConfirmed) {
            toast.error('Please check your email and confirm before signing up.');
            return;
        }

        try {
            const response = await fetch(API_BASE_URL[import.meta.env.MODE] + "/account/signup/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                    phone,
                    address
                }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();

            if (data.id === -1) {
                toast.error(data.content);
            } else {
                toast.success('Signup successful');
            }
        } catch (error) {
            toast.error('Signup failed. Please check your information and try again.');
        }
    };

    const handleEmailConfirmation = async () => {
        if (!isCodeExpired && confirmationCode) {
            toast.error('Confirmation code has already been sent. Please check your email.');
            return;
        }

        try {
            const code = Math.floor(100000 + Math.random() * 900000);
            setConfirmationCode(code);

            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/checkMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    otp: code
                }),
                credentials: 'include' // Send cookies
            });

            if (!response.ok) {
                throw new Error('Failed to send confirmation email');
            }

            setIsCodeExpired(false);
            toast.success('Confirmation code sent to your email.');
        } catch (error) {
            toast.error('Failed to send confirmation email. Please try again.');
        }
    };

    const handleConfirmationSubmit = () => {
        if (isConfirmed) {
            toast.error('Already confirmed!');
            return;
        }

        if (confirmationCode.toString() === inputConfirmationCode) {
            setIsConfirmed(true);
            toast.success('Email confirmed!');
        } else {
            toast.error('Invalid confirmation code. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
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
                        placeholder="Your User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {isConfirmed ? <p className="text-green-500">Confirmed</p> : <p className="text-red-500">Please confirm your email before signup</p>}

                {/* Display email confirmation section */}
                <button type="button" onClick={handleEmailConfirmation} className="w-full bg-blue-500 text-white p-2 rounded mb-4">
                    Send Email
                </button>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Confirmation Code"
                        value={inputConfirmationCode}
                        onChange={(e) => setInputConfirmationCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="button" onClick={handleConfirmationSubmit} className="w-full bg-green-500 text-white p-2 rounded mt-2">
                        Check Confirmation
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign Up
                </button>
                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
