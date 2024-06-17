// src/components/Navbar.tsx

import React, { Fragment, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.scss'; // Import CSS/SCSS file
import Login from '../login/Login';
import Register from '../register/Register';
import ForgotPassword from '../forgotPW/FogotPW';
import UseAuth from '../../context/UseAuth';
import Logout from '../logout/Logout';

const Navbar: React.FC = () => {
  const { isAuthenticated } = UseAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowForgotPassword(false);
  };

  const handleShowForgotPassword = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgotPassword(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgotPassword(false);
  }


  return (
    <Fragment>
      <nav className='navbar bg-gradient-to-r from-purple-500 to-pink-500'>

        <div className='container flex justify-between items-center'>
          {/* Logo */}
          <div className='logo'>
            <Link to={'/'} className='logo-link text-2xl font-bold'>
              MangaReader
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='nav-links'>
            <ul className='flex space-x-4'>
              <li><Link to='#' className='normal-link'>Manga</Link></li>
              <li><Link to='#' className='normal-link'>Light Novel</Link></li>
              <li><Link to='#' className='normal-link'>Web Novel</Link></li>
            </ul>
          </div>

          {/* Search Box */}
          <div className='search-box'>
            <input type='text' placeholder='Tìm kiếm...' className='search-input' />
            <button className='search-button'>
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z' />
              </svg>
            </button>
          </div>

          {/* Notification Icon */}
          <div className='notification-icon'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
            </svg>
          </div>

          {/* Theme Change Icon */}
          <div className='theme-icon'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7'></path>
            </svg>
          </div>

          {/* Auth Links */}
          {!isAuthenticated ? (
            <div className='auth-links space-x-4'>
              <div className="auth-link" onClick={handleShowLogin}>Đăng Nhập</div>
              <div className="auth-link" onClick={handleShowRegister}>Đăng Ký</div>
            </div>
          ) : (
            <div className='auth-link'>
              <Logout />
              
            </div>
          )
          }

        </div>
      </nav>

      <Outlet />


      {
        showLogin && (
          <div className='overlay flex justify-center items-center'>
            <div className='overlay-content'>
              <Login onForgotPassword={handleShowForgotPassword} onSignup={handleShowRegister} onClose={handleClose} />
            </div>
          </div>
        )
      }
      {
        showRegister && (
          <div className='overlay flex justify-center items-center'>
            <div className='overlay-content'>
              <Register onLogin={handleShowLogin} onClose={handleClose} />
            </div>
          </div>
        )
      }
      {
        showForgotPassword && (
          <div className='overlay flex justify-center items-center'>
            <div className='overlay-content'>
              {showForgotPassword && <ForgotPassword onClose={handleClose} />}
            </div>
          </div>
        )
      }

    </Fragment>
  );
};
export default Navbar;
