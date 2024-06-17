import React, { useState } from 'react';
import './FogetPW.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const FOGOTPW_URL = "http://localhost:5167/api/forgotpassword";
const Verifying_URL = "http://localhost:5167/api/verifyresetcode";

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        FOGOTPW_URL,
        {
          email: email,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setMessage(`A reset code has been sent to ${email}.`);
      setStep(2);
      console.log('Success: Reset code sent'); // Debug log
    } catch (error: unknown) {
      setMessage("Email khong ton tai!");
    }
    console.log('Form submission completed'); // Debug log
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("test");
      await axios.post(
        Verifying_URL,
        {
          Code: code,
          NewPassword:  newPassword,
          Email: email,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setMessage('');
      setStep(3);
    } catch (error: unknown) {
      setMessage("Invalid reset code or the reset code has expired.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className='forgot-password-form'>
      <button className='close-btn' onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className='text-2xl font-bold mb-6'>Forgot Password</h2>
      {message && <p className='text-red-600 text-xs m-2'>{message}</p>}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='forgot-password-btn'>Send Reset Link</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <div className='form-group'>
            <label>Reset Code:</label>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>New Password:</label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='forgot-password-btn'>Reset Password</button>
        </form>
      )}
      {step === 3 && (
        <div>
          <p>Your password has been reset successfully.</p>
          <button onClick={handleClose} className='forgot-password-btn'>Close</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;