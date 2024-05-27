import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('id')) {
            toast.error('You have already logged in!')
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(`${API_BASE_URL[import.meta.env.MODE]}/account/signin`)

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Send cookies
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('CSRF', data.token);
            localStorage.setItem('id', data.userId);
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', username)
            navigate('/');

        } catch (error) {
            setError('Invalid username or password');
            toast.error('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('../../Bookswall_generated.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded shadow-md w-80">
                <div className="flex justify-between mb-4">
                    <Link to="/">
                        <button type="button" className="text-blue-500">Home</button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" className="text-blue-500">Register</button>
                    </Link>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
                {error && <div className="mt-2 text-red-500">{error}</div>}
                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
                </div>
            </form>

        </div>
    );
}

export default Login;