import React from 'react';
import './Header.scss'; // Import Tailwind and custom styles

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
          <a href="#" className="nav-item">Theo dõi</a>
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
