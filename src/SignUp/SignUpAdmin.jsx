import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const baseUrl = 'http://172.11.1.117:8081/account/signup/admin';

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (role === '') {
            toast.error("Please select a role!");
            return;
        }

        console.log(baseUrl + role)

        try {
            const response = await axios.post(baseUrl + role, {
                username,
                password,

            }, {
                headers: {
                    'X-CSRFTOKEN': '5beb102a-7d8a-48b1-b55b-6112485c0ac1' // Add CSRF Token to headers
                },
                withCredentials: true, // Send cookies

            });

            // Assuming your API returns a status code to indicate success or failure
            if (response.status !== 200) {
                console.log(response)
                throw new Error('Signup failed');
            }

            if (response.data.id === -1) {
                toast.error(response.data.content); // Display error message
            } else {
                toast.success('Signup successful'); // Display success message
            }
        } catch (error) {
            console.log(error)
            toast.error('Signup failed. Please check your information and try again.'); // Display error message
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="1"
                            checked={role === '1'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Role 1
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="2"
                            checked={role === '2'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Role 2
                    </label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignUpAdmin;
