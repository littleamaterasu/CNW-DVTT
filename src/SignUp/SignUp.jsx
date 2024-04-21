import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://172.11.1.117:8081/account/signup/user", {
                username,
                password,
                name,
                email,
                phoneNumber,
                address
            });

            // Assuming your API returns a status code to indicate success or failure
            if (response.status !== 200) {
                throw new Error('Signup failed');
            }

            if (response.data.id === -1) {
                toast.error(response.data.content); // Display error message
            } else {
                toast.success('Signup successful'); // Display success message
            }
        } catch (error) {
            toast.error('Signup failed. Please check your information and try again.'); // Display error message
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
