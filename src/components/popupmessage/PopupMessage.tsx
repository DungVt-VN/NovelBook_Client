import React, { useEffect } from 'react';
import './PopupMessage.scss';

interface PopupMessageProps {
  message: string;
  onClose: () => void; // Callback để đóng popup
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Đóng popup sau 3 giây
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="popup-message">
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
