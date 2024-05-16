import React, { useState, useEffect } from 'react';
import Header from "../Components/Header/Header";
import { API_BASE_URL } from '../config';

function ChangeInformation() {
    const [userName, setUserName] = useState('');
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        // Fetch placeholder value for userName and CSRF token from the API when the component mounts
        async function fetchData() {
            try {

                const placeholderResponse = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getUser?id=${localStorage.getItem('id')}`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                });
                const placeholderData = await placeholderResponse.json();
                setUserName(placeholderData.name);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implement logic to handle form submission
    };

    const handleInputChange = (event) => {
        setNewUserName(event.target.value);
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <input
                    type="text"
                    placeholder={userName}
                    value={newUserName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:bg-blue-600" />
            </form>
        </div>
    );
}

export default ChangeInformation;
