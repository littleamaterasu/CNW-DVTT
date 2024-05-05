import React, { useState, useEffect } from 'react';
import Header from "../Components/Header/Header";

function ChangeInformation() {
    const [userName, setUserName] = useState('');
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        // Fetch placeholder value for userName and CSRF token from the API when the component mounts
        async function fetchData() {
            try {

                const placeholderResponse = await fetch('http://localhost:8081/account/getUser?id=1', {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
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

    };

    const handleInputChange = (event) => {
        setNewUserName(event.target.value);
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={userName}
                    value={newUserName}
                    onChange={handleInputChange}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default ChangeInformation;
