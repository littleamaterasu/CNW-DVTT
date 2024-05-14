import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isCodeExpired, setIsCodeExpired] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCodeExpired(true);
        }, 300000); // 5 minutes in milliseconds

        return () => clearTimeout(timer);
    }, [confirmationCode]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isConfirmed) {
            toast.error('Please check your email and confirm before signing up.');
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_BASE_API_URL + "/account/signup/user", {
                username,
                password,
                name,
                email,
                phoneNumber,
                address
            });

            if (response.status !== 200) {
                throw new Error('Signup failed');
            }

            if (response.data.id === -1) {
                toast.error(response.data.content);
            } else {
                toast.success('Signup successful');
            }
        } catch (error) {
            toast.error('Signup failed. Please check your information and try again.');
        }
    };

    const handleEmailConfirmation = () => {
        if ((!isCodeExpired || !isConfirmed)) {
            // Generate random confirmation code
            const code = Math.floor(100000 + Math.random() * 900000);

            // Save confirmation code
            setConfirmationCode(code);

            // Send confirmation email (API call)

            // -----------------------------------

            setIsCodeExpired(false);
        } else {
            toast.error('Confirmation code has already been sent. Please check your email.');
        }
    };

    const handleConfirmationSubmit = () => {
        if (isConfirmed) {
            toast.error('Already confirmed!');
            return;
        }

        if (confirmationCode === parseInt(confirmationCode, 10)) {
            setIsConfirmed(true);
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
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
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
                        value={phoneNumber}
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
            </form>
        </div>
    );
}

export default SignUp;
