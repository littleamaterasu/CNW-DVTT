import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate();
    if (localStorage.getItem('role') === 'ROLE_USER') navigate('/');
    const HandleSwitchPage = (dir) => {
        navigate('/admin' + dir);
    }

    return (
        <div>
            <div onClick={() => HandleSwitchPage('/create')}>Admin Accounts</div>
            <div onClick={() => HandleSwitchPage('/books')}>Books and Authors</div>
            <div onClick={() => HandleSwitchPage('/FAQs')}>FAQs</div>
            <div onClick={() => HandleSwitchPage('/users')}>User Accounts</div>
        </div>
    )
}

export default Admin;