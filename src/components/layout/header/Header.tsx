import React from 'react';
import './Header.scss'; // Import Tailwind and custom styles
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="headerContent">
        <nav className="nav">
          <a href="#" className="nav-item">Home</a>
          <a href="#" className="nav-item">Hot</a>
          <div className="dropdown">
            <button className="nav-item">Thể loại</button>
            <div className="dropdown-content">
              <a href="#">Thể loại 1</a>
              <a href="#">Thể loại 2</a>
            </div>
          </div>
          <a href="#" className="nav-item">Lịch sử</a>
          <Link to={'/Followed'} className="nav-item">Theo dõi</Link>
          <div className="dropdown">
            <button className="nav-item">Xếp hạng</button>
            <div className="dropdown-content">
              <a href="#">Xếp hạng 1</a>
              <a href="#">Xếp hạng 2</a>
            </div>
          </div>
          <a href="#" className="nav-item">Yêu cầu truyện</a>
          <a href="#" className="nav-item">Thảo luận</a>
          <a href="#" className="nav-item">Fanpage</a>
          <a href="#" className="nav-item">Group</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
