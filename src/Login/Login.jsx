import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import { API_BASE_URL } from '../config';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(API_BASE_URL + '/account/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Gửi kèm cookie
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('CSRF', data.token);
            localStorage.setItem();
            navigate('/')

        } catch (error) {
            setError('Invalid username or password');
            toast.error('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className='login'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/signup">
                    <button>Register</button>
                </Link>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
}

export default Login;
