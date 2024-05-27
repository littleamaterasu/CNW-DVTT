import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminChat from '../Components/Chat/AdminChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faBook, faTags, faTicketAlt, faQuestionCircle, faUsers, faChartLine, faComments } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config';

function Admin() {
    const navigate = useNavigate();
    const [chat, setChat] = useState(false);

    if (localStorage.getItem('role') === 'ROLE_USER') navigate('/');

    const HandleSwitchPage = (dir) => {
        navigate('/admin' + dir);
    };

    const handleLogout = () => {
        const handleLogout = async () => {
            try {
                const id = localStorage.getItem("id"); // Lấy id từ localStorage
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
        localStorage.setItem('id', '');
        localStorage.setItem('CSRF', '');
        localStorage.setItem('role', '');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('../../Bookswall_generated.jpg')" }}>
            <div className="bg-black bg-opacity-50 min-h-screen p-4">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setChat(true)} className="text-white bg-blue-500 px-4 py-2 rounded-full flex items-center hover:bg-blue-600">
                        <FontAwesomeIcon icon={faComments} className="mr-2" /> Chat
                    </button>
                    <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">Log out</button>
                </div>
                {chat && <AdminChat setShowChat={() => setChat(false)} />}
                <div className="grid grid-cols-2 gap-4">
                    <div onClick={() => HandleSwitchPage('/create')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 ml-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faUserShield} className="mr-2" /> Admin Accounts
                    </div>
                    <div onClick={() => HandleSwitchPage('/books')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 mr-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faBook} className="mr-2" /> Books
                    </div>
                    <div onClick={() => HandleSwitchPage('/category')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 ml-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faTags} className="mr-2" /> Category
                    </div>
                    <div onClick={() => HandleSwitchPage('/coupon')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 mr-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faTicketAlt} className="mr-2" /> Coupon
                    </div>
                    <div onClick={() => HandleSwitchPage('/users')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 ml-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faUsers} className="mr-2" /> User Accounts
                    </div>
                    <div onClick={() => HandleSwitchPage('/statistic')} className="bg-white bg-opacity-65 text-3xl text-black p-20 mb-10 mr-20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                        <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Statistic
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
