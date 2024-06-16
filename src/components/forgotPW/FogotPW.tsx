import React, { useState } from 'react';
import './FogetPW.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
      // Assume we have a function sendResetEmail that sends the reset email
      await sendResetEmail(email);
      setMessage('A reset code has been sent to your email address.');
      setStep(2);
    } catch (error) {
      setMessage('An error occurred while sending the reset code. Please try again.');
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assume we have a function verifyResetCode that verifies the reset code
      await verifyResetCode(email, code, newPassword);
      setMessage('Your password has been reset successfully.');
      setStep(3);
    } catch (error) {
      setMessage('An error occurred while resetting your password. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  const sendResetEmail = async (email: string) => {
    // Placeholder for sending email logic
    // You can integrate your backend or email service here
    console.log(`Sending reset email to ${email}`);
    return Promise.resolve();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const verifyResetCode = async (email: string, code: string, _newPassword: string) => {
    // Placeholder for verifying reset code and setting new password
    // You can integrate your backend or authentication service here
    console.log(`Verifying code ${code} for email ${email} and setting new password`);
    return Promise.resolve();
  };

  return (
    <div className='forgot-password-form'>
      <button className='close-btn' onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className='text-2xl font-bold mb-6'>Forgot Password</h2>
      {message && <p className='message'>{message}</p>}
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