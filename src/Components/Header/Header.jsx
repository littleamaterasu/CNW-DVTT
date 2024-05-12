import React, { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category";
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Header.css';

const id = ['tung', 'cnweb36']

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
    }

    const DisableChat = () => {
        setEnableChat(false);
    }


    return (
        <div>
            <p>Header</p>
            <SearchBar />
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Register</button>
            </Link>
            {isAuthenticated && (
                <>
                    <Link to="/user/cart">
                        <button>Cart</button>
                    </Link>
                    <Link to="/user/changeInformation">
                        <button>Change User Information</button>
                    </Link>
                    <Link to="/user/FAQ">
                        <button>Need help?</button>
                    </Link>
                </>
            )}
            {isAuthenticated && (
                <>
                    <Link to="/order/list">
                        <button>Order List</button>
                    </Link>
                    <Link to="/payment/list">
                        <button>Payment List</button>
                    </Link>
                </>
            )}
            <button onClick={toggleCategory}>Categories</button>
            {showCategory && <Category />}
            <button onClick={EnableChat}>Chat</button>
            {enableChat &&
                <div className='chat'>
                    <div className='chat-text'>

                    </div>
                    <div className='chat-form'>
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            console.log('Sending message:', message);
                            setMessage('');
                        }}>
                            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>}
        </div>
    )
}

export default Header;
