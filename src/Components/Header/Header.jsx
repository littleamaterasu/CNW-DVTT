import React, { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category";
import { Link } from 'react-router-dom';

function Header() {
    const [showCategory, setShowCategory] = useState(false);

    const toggleCategory = () => {
        setShowCategory(!showCategory);
    };

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
            <Link to="/user/cart">
                <button>Cart</button>
            </Link>
            <Link to="/user/changeInformation">
                <button>Change User Information</button>
            </Link>
            <Link to="/user/FAQ">
                <button>Need help?</button>
            </Link>
            <button onClick={toggleCategory}>Categories</button>
            {showCategory && <Category />}
        </div>
    )
}

export default Header;
