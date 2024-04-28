import SearchBar from "../SearchBar/SearchBar"
import { Link } from 'react-router-dom';

function Header() {
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
        </div>
    )
}

export default Header