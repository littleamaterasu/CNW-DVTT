import React, { useState, useEffect, useRef } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category";
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Chat from '../Chat/Chat';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faListAlt } from '@fortawesome/free-solid-svg-icons/faListAlt';

function Header({ }) {
    const [showCategory, setShowCategory] = useState(false);
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/get`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchCategories();
    }, []);

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

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/signout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": localStorage.getItem("CSRF")
                },
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error("Failed to logout");
            }

            // Xóa thông tin đăng nhập từ local storage
            localStorage.setItem("id", "");
            localStorage.setItem("CSRF", "");
            localStorage.setItem("role", "");

            // Điều hướng người dùng đến trang đăng nhập
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Home <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <span onClick={toggleCategory} className="text-gray-800 hover:text-gray-900 cursor-pointer">Categories <FontAwesomeIcon icon={faListAlt} /></span>
                </div>
                <SearchBar />
                <div className="flex space-x-4">

                    {localStorage.getItem('id') ? (
                        <>

                            <Link to="/user/cart" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faCartShopping} /> Cart</Link>

                            <span onClick={EnableChat} className="text-teal-500 hover:text-teal-700 cursor-pointer">
                                <FontAwesomeIcon icon={faComments} /> Chat with admin
                            </span>
                            <span onClick={toggleUserMenu} className="text-yellow-500 hover:text-yellow-700 cursor-pointer">
                                <FontAwesomeIcon icon={faUser} /> User
                            </span>
                            {showUserMenu && (
                                <div ref={userMenuRef} className="absolute bg-white shadow-md rounded">

                                    <Link to="/user/changeInformation" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Change Information</Link>
                                    <Link to="/user/changePassword" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Change Password</Link>
                                    <Link to="/order/list" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Order List</Link>
                                    <Link to="/payment/list" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Payment List</Link>
                                    <Link to="/order/boughtproducts" className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Bought Products</Link>
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
            {showCategory && <Category toggleCategory={toggleCategory} categories={categories} />}
            {enableChat && localStorage.getItem('username') && (
                <div>
                    <Chat setShowChat={disableChat} />
                </div>
            )}
        </div>
    );
}

export default Header;
