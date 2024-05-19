import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import AdminChat from '../Components/Chat/AdminChat';

function Admin() {
    const navigate = useNavigate();
    const [chat, setChat] = useState(false);

    if (localStorage.getItem('role') === 'ROLE_USER') navigate('/');

    const HandleSwitchPage = (dir) => {
        navigate('/admin' + dir);
    };

    const handleLogout = () => {
        localStorage.setItem('id', '');
        localStorage.setItem('CSRF', '');
        localStorage.setItem('role', '');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="p-4">
            <button onClick={() => setChat(true)}>Chat</button>
            {chat && <AdminChat setShowChat={() => setChat(false)} />}
            <div className="text-right mb-4">
                <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">Log out</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div onClick={() => HandleSwitchPage('/create')} className="bg-blue-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    Admin Accounts
                </div>
                <div onClick={() => HandleSwitchPage('/books')} className="bg-green-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    Books
                </div>
                <div onClick={() => HandleSwitchPage('/category')} className="bg-green-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    Category
                </div>
                <div onClick={() => HandleSwitchPage('/coupon')} className="bg-green-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    Coupon
                </div>
                <div onClick={() => HandleSwitchPage('/FAQs')} className="bg-yellow-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    FAQs
                </div>
                <div onClick={() => HandleSwitchPage('/users')} className="bg-purple-500 text-white p-8 rounded flex items-center justify-center cursor-pointer">
                    User Accounts
                </div>
            </div>
        </div>
    );
}

export default Admin;

// Placeholder components for routes
function CreateAdmin() {
    return <div>Create Admin Page</div>;
}

function BooksAndAuthors() {
    return <div>Books and Authors Page</div>;
}

function FAQs() {
    return <div>FAQs Page</div>;
}

function UserAccounts() {
    return <div>User Accounts Page</div>;
}

function DefaultAdminPage() {
    return <div>Welcome to the Admin Dashboard</div>;
}
