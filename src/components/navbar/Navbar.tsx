// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'; // Import CSS/SCSS file

const Navbar: React.FC = () => {
  return (
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
        <div className='auth-links space-x-4'>
          <Link to='#' className='normal-link'>Đăng nhập</Link>
          <Link to='#' className='normal-link'>Đăng ký</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
