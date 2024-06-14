import { Link } from 'react-router-dom';
import './NotFound.scss'; // Thêm file scss của bạn ở đây
import notFoundImage from '../../assets/images/Error-404.png';
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="Page Not Found" className="not-found-image" />
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-button">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
