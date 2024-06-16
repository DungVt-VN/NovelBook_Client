import React from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface LoginProps {
  onForgotPassword: () => void;
  onSignup: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onForgotPassword, onSignup, onClose }) => {

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log("Facebook login");
  };

  const handleTwitterLogin = () => {
    // Handle Twitter login logic here
    console.log("Twitter login");
  };

  return (
    <div className='login-form'>
      <button className='close-btn' onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className='text-2xl font-bold mb-6'>Login</h2>
      <form>
        <div className='form-group'>
          <label>Email:</label>
          <input type='email' required />
        </div>
        <div className='form-group mb-4'>
          <label>Password:</label>
          <input type='password' required />
        </div>
        <button type='submit' className='login-btn'>Login</button>
      </form>
      <div className='additional-options'>
        <button className='forgot-password' onClick={onForgotPassword}>Quên mật khẩu?</button>
        <span className='signup-prompt'>
          Bạn chưa có tài khoản? <button className='signup-link' onClick={onSignup}>Đăng ký</button>
        </span>
      </div>
      <div className='social-login'>
        <button className='social-btn google' onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} size="lg" />
        </button>
        <button className='social-btn facebook' onClick={handleFacebookLogin}>
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </button>
        <button className='social-btn twitter' onClick={handleTwitterLogin}>
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Login;
