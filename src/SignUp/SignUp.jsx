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
        if ((!isConfirmationSent || isCodeExpired) && !isConfirmed) {
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
        <div>
            <form onSubmit={handleSubmit}>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <input
                    type="text"
                    placeholder="Your User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {isConfirmed ? <p>Confirmed</p> : <p>Please confirm your email before signup</p>}

                {/* Display email confirmation section */}
                <button onClick={handleEmailConfirmation}>Send Email</button>

                <div>
                    <input
                        type="text"
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                    <button onClick={handleConfirmationSubmit}>Check Confirmation</button>
                </div>

                <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
