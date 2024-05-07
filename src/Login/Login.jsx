import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Login.css";

function Login({ onLogin, onLogout }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/account/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Gửi kèm cookie
            });

            // Assuming your API returns a status code to indicate success or failure
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('CSRF', data.token);
            onLogin();

            navigate('/')

        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
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
    );
}

export default Login;