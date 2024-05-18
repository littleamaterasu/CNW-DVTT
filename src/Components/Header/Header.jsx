import React, { useState, useEffect, useRef } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category";
import { Link, useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';

function Header({ isAuthenticated }) {
    const [showCategory, setShowCategory] = useState(false);
    const [enableChat, setEnableChat] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const userMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

    const toggleCategory = () => {
        setShowCategory(!showCategory);
    };

    const EnableChat = () => {
        setEnableChat(true);
    };

    const disableChat = () => {
        setEnableChat(false);
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        localStorage.setItem('id', '');
        localStorage.setItem('CSRF', '');
        localStorage.setItem('role', '');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
                    <span onClick={toggleCategory} className="text-gray-800 hover:text-gray-900 cursor-pointer">Categories</span>
                </div>
                <SearchBar />
                <div className="flex space-x-4">
                    <span onClick={EnableChat} className="text-teal-500 hover:text-teal-700 cursor-pointer">Chat</span>
                    <Link to="/user/FAQ" className="text-purple-500 hover:text-purple-700">FAQs</Link>
                    {localStorage.getItem('id') ? (
                        <>
                            <Link to="/user/cart" className="text-gray-500 hover:text-gray-700">Cart</Link>
                            <span onClick={toggleUserMenu} className="text-yellow-500 hover:text-yellow-700 cursor-pointer">User</span>
                            {showUserMenu && (
                                <div ref={userMenuRef} className="absolute bg-white shadow-md mt-2 rounded p-2">
                                    <Link to="/user/changeInformation" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Change Information</Link>
                                    <Link to="/user/changePassword" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Change Password</Link>
                                    <Link to="/order/list" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Order List</Link>
                                    <Link to="/payment/list" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Payment List</Link>
                                    <span onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200 cursor-pointer">Logout</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign In</Link>
                            <Link to="/signup" className="text-green-500 hover:text-green-700">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
            {showCategory && <Category />}
            {enableChat && (
                <div>
                    <Chat setShowChat={disableChat} />

                </div>
            )}
        </div>
    );
}

export default Header;
