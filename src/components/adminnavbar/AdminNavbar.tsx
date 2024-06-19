import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import './AdminNavbar.scss';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const LOGOUT_URL = 'http://localhost:5167/api/account/logout';

const AdminNavbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const handleLogout = async () => {
        try {
            const response = await axios.post(
                LOGOUT_URL,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data)
            logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin">
                        <FaTachometerAlt className="icon" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users">
                        <FaUser className="icon" />
                        <span>Manage Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="/logout">
                        <FaSignOutAlt className="icon" />
                        <span onClick={handleLogout}>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminNavbar;
