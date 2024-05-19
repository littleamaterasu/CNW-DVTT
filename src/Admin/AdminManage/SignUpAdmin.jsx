import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';

function SignUpAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any field is empty
        if (!username || !password || !name || !email || !phone || !address || !role) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/signup/admin${role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF')
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                    phone,
                    address
                })
            });

            const data = await response.json();

            if (response.status !== 200) {
                throw new Error(data.message || 'Signup failed');
            }

            if (data.id === -1) {
                toast.error(data.content);
            } else {
                toast.success('Signup successful');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Signup failed. Please check your information and try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Sign Up</h2>
                <input
                    type="text"
                    placeholder="Your User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="mb-4">
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="1"
                            checked={role === '1'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-2"
                        />
                        Role 1
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="2"
                            checked={role === '2'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-2"
                        />
                        Role 2
                    </label>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignUpAdmin;
