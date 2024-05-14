import React, { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category";
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

function Header({ isAuthenticated }) {
    const [showCategory, setShowCategory] = useState(false);
    const [enableChat, setEnableChat] = useState(false);
    const [message, setMessage] = useState('');

    const socket = io();

    const toggleCategory = () => {
        setShowCategory(!showCategory);
    };

    const EnableChat = () => {
        setEnableChat(true);
    };

    const disableChat = () => {
        setEnableChat(false);
    };

    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <SearchBar />
                <div className="flex space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Register</button>
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/user/cart">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cart</button>
                            </Link>
                            <Link to="/user/changeInformation">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Change User Information</button>
                            </Link>
                            <Link to="/user/FAQ">
                                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">Need help?</button>
                            </Link>
                            <Link to="/order/list">
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Order List</button>
                            </Link>
                            <Link to="/payment/list">
                                <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">Payment List</button>
                            </Link>
                        </>
                    )}
                    <button onClick={toggleCategory} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">Categories</button>
                    <button onClick={EnableChat} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">Chat</button>
                </div>
            </div>
            {showCategory && <Category />}
            {enableChat && (
                <div className="chat bg-gray-100 p-4 mt-4 rounded shadow-lg">
                    <div className="chat-text h-40 overflow-y-auto p-2 mb-2 border border-gray-300 rounded">
                        {/* Chat messages will be displayed here */}
                    </div>
                    <div className="chat-form">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Sending message:', message);
                            socket.emit('message', { id, message });
                            setMessage('');
                        }}>
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                            />
                            <input
                                type="submit"
                                value="Send"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            />
                        </form>
                    </div>
                    <button onClick={disableChat} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2">Close Chat</button>
                </div>
            )}
        </div>
    );
}

export default Header;
