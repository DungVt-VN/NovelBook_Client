import React, { useState, useEffect, useRef } from 'react';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = 'http://localhost:5167/api/account/register';

interface RegisterProps {
  onLogin: () => void;
  onClose: () => void;
}


const Register: React.FC<RegisterProps> = ({ onClose, onLogin }) => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isMatch, setIsMatch] = useState(true);
  const [formErrors, setFormErrors] = useState({
    username: false,
    dateOfBirth: false,
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
  });
  const [errMsg, setErrMsg] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);


  useEffect(() => {
    setIsFormValid(Object.values(formErrors).every((error) => !error) && isMatch);
  }, [formErrors, isMatch]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/facebook';
  };

  const handleTwitterLogin = () => {
    window.location.href = 'http://localhost:5167/api/account/login/twitter';
  };
  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      username: !username,
      dateOfBirth: !dateOfBirth,
      firstName: !firstName,
      lastName: !lastName,
      email: !email,
      password: !password,
      confirmPassword: password !== confirmPassword,
      gender: !gender,
    };
    setFormErrors(errors);

    const isFormValid = Object.values(errors).every((error) => !error);
    if (isFormValid) {
      console.log("Register");
    } else {
      const invalidFields = document.querySelectorAll('.form-group.invalid');
      invalidFields.forEach((field) => {
        field.classList.add('shake');
        setTimeout(() => {
          field.classList.remove('shake');
        }, 500);
      });
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username: username,
          dateOfBirth: dateOfBirth,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // Handle successful registration
      console.log(response?.data);
      const accessToken = response?.data?.token;
      const roles = response?.data?.role;
      setAuth(roles, accessToken);
      setUsername('');
      setPassword('');
      navigate(0); // Redirect to the appropriate page after successful registration
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle HTTP response errors
        if (err.response) {
          const message = err.response.data[0]?.code;
          switch (err.response.status) {
            case 400:
              setErrMsg('Yêu cầu không hợp lệ');
              break;
            case 401:
              setErrMsg('Không được phép');
              break;
            case 404:
              setErrMsg('Không tìm thấy tài nguyên');
              break;
            default:
              // Handle specific error codes or messages
              if (message === 'DuplicateUserName') {
                setErrMsg('Username đã tồn tại');
              } else {
                setErrMsg('Email đã tồn tại');
              }
              break;
          }
        } else {
          setErrMsg('Không có phản hồi từ máy chủ');
        }
      } else {
        // Handle non-Axios errors
        console.error('Lỗi không xác định:', err);
        setErrMsg('Đã xảy ra lỗi không xác định');
      }

      if (errRef.current) {
        errRef.current.focus();
      }
    }


  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsMatch(e.target.value === confirmPassword);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      password: !e.target.value,
      confirmPassword: e.target.value !== confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsMatch(password === e.target.value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: password !== e.target.value,
    }));
  };

  return (
    <div className='register-form'>
      <button className='close-btn' onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      {errMsg && <p ref={errRef} className='message text-red-700 text-lg'>{errMsg}</p>}
      <form onSubmit={handleRegister}>
        <div className='form-row'>
          <div className={`form-group ${formErrors.username ? 'invalid' : ''}`}>
            <label>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={`form-group ${formErrors.dateOfBirth ? 'invalid' : ''}`}>
            <label>Date of Birth:</label>
            <input
              type='date'
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='form-row'>
          <div className={`form-group ${formErrors.firstName ? 'invalid' : ''}`}>
            <label>First Name:</label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={`form-group ${formErrors.lastName ? 'invalid' : ''}`}>
            <label>Last Name:</label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={`form-group ${formErrors.email ? 'invalid' : ''}`}>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${formErrors.password ? 'invalid' : ''}`}>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className={`form-group ${formErrors.confirmPassword ? 'invalid' : ''} mb-3`}>
          <label>Confirm Password:</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={`${!isMatch ? 'border-red-500' : ''}`}
          />
          {!isMatch && <p className="text-red-500 text-sm">Passwords do not match</p>}
        </div>
        <div className={`form-group ${formErrors.gender ? 'invalid' : ''}`}>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value=''>Select</option>
            <option value='0'>Male</option>
            <option value='1'>Female</option>
            <option value='2'>Other</option>
          </select>
        </div>
        <button
          type='submit'
          className={`register-btn ${isFormValid ? 'enabled' : 'disabled'}`}
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
      <div className='additional-options'>
        <span className='signup-prompt'>
          Bạn đã có tài khoản? <button className='signup-link' onClick={onLogin}>Đăng Nhập</button>
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

export default Register;
