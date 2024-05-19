import React, { useState, useEffect } from 'react';
import Header from "../Components/Header/Header";
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangeInformation() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Fetch placeholder value for user information from the API when the component mounts
        async function fetchData() {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getUser?id=${localStorage.getItem('id')}`, {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                console.log(data)
                setUsername(data.username);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/changeInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: JSON.stringify({
                    password: password,
                    email: email,
                    phone: phone,
                    address: address,
                })
            });
            if (response.ok) {
                toast.success('Information updated successfully!');
            } else {
                toast.error('Failed to update information.');
            }
        } catch (error) {
            toast.error('Error submitting data.');
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <Header />
            <ToastContainer />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700">Username</label>
                    <input
                        id="userName"
                        type="text"
                        value={username}
                        placeholder={username}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={email}
                        value={email}
                        readOnly
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder={phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input
                        id="address"
                        type="text"
                        placeholder={address}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <input
                    type="submit"
                    value="Submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                />
            </form>
        </div>
    );
}

export default ChangeInformation;
