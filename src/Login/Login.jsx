import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";

function Login({ onLogin, onLogout }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://172.11.1.117:8081/account/login", {
                username,
                password
            }, {
                withCredentials: true // Allow Axios to send and receive cookies
            });

            // Assuming your API returns a status code to indicate success or failure
            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            console.log(response.headers); // Check the response headers

            // If login is successful, you might want to redirect the user or update the UI accordingly
            console.log('Login successful');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
