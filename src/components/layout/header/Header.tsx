import React from 'react';
import './Header.scss'; // Import Tailwind and custom styles
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Header: React.FC = () => {
  const { roles } = useAuth();
  // lỗi thì dùng cái này wtf
  const rolesArray: string[] = ['Guest'].concat(roles || []);
  const isCreator = rolesArray.some((role: string) => role.toLowerCase() === "creator"); 
  // const isCreator = roles.some((role: string) => role.toLowerCase() === "creator");
  

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
          { isCreator && <Link to={'/creator/mybooks'}>Truyện của tôi</Link>}
          { isCreator && <Link to={'/creator/requests'}>Truyện được yêu cầu</Link>}
          <a href="#" className="nav-item">Thảo luận</a>
          <a href="#" className="nav-item">Fanpage</a>
          <a href="#" className="nav-item">Nhóm chat</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
