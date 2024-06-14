// src/components/Navbar.tsx

import React from 'react';
import './Navbar.scss'; // Import CSS/SCSS file

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="container">
        <div className="logo">MangaReader</div>
        <ul className="flex space-x-4">
          <li><a href="#">Home</a></li>
          <li><a href="#">Genres</a></li>
          <li><a href="#">Latest</a></li>
          <li><a href="#">Popular</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
