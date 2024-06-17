import React, { useEffect, useRef, useState } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from '../../services/api/apiClient';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../context/UseAuth';

const LOGIN_URL = '/api/account/login';

interface LoginProps {
  onForgotPassword: () => void;
  onSignup: () => void;
  onClose: () => void;
}

interface ErrorResponse {
  response?: {
    status?: number;
  };
}

const Login: React.FC<LoginProps> = ({ onForgotPassword, onSignup, onClose }) => {
  const { setAuth } = UseAuth();
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: user, password: pwd },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.token;
      const roles = response?.data?.role;
      setAuth(user, pwd, roles, accessToken);
      setUser('');
      setPwd('');
      navigate(0);
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      if (!error.response) {
        setErrMsg('Không có phản hồi từ máy chủ');
      } else if (error.response.status === 400) {
        setErrMsg('Yêu cầu không hợp lệ');
      } else if (error.response.status === 401) {
        setErrMsg('Password Or Email Not Valid');
      } else {
        setErrMsg('Đăng nhập thất bại');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/facebook';
  };

  const handleTwitterLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/twitter';
  };

  return (
    <div className='login-form'>
      <button className='close-btn' onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className='text-2xl font-bold mb-6'>Login</h2>
      {errMsg && <p ref={errRef} className='text-red-700 text-xs'>{errMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            required
            ref={userRef}
            value={user}
            autoComplete='on'
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className='form-group mb-4'>
          <label>Password:</label>
          <input
            type='password'
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
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
