import React from 'react';
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-900">
      <div className="footer-content text-center py-6">
        <p className="text-gray-400">&copy; 2024 MangaReader. All rights reserved.</p>
        <div className="social-media mt-4 flex justify-center space-x-4">
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl" />
          </a>
          <a href="#" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl" />
          </a>
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
