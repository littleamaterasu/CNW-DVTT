import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role && role.includes('ROLE_ADMIN')) {
            navigate('/admin');
        }
    }, [navigate]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to the Home Page</h2>
                <p className="text-lg text-center text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula ex quis ultricies fermentum.</p>
            </div>
        </div>
    );
}

export default Home;
