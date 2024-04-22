import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container">
            <h2>Welcome to the Home Page</h2>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
