import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const LOGOUT_URL = 'http://localhost:5167/api/account/logout';


const Logout: React.FC = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
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
        <div>
            <h6 onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Đăng xuất
            </h6>
        </div>
    );
};

export default Logout;
