'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Eye, EyeOff, Lock, KeyRound, ShieldCheck, Send, MailCheck, ArrowLeft, CheckCircle, User } from 'lucide-react';

const PasswordInput = ({ label, value, name, isRed = false, showPassword, toggleVisibility, setPasswords, passwords, icon: Icon = Lock }) => (
  <div className="mb-4">
    <label className={`form-label fw-semibold mb-2 ${isRed ? 'text-danger' : 'text-secondary'}`}>{label}</label>
    <div className="input-group">
      <span className={`input-group-text bg-white border-end-0 ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'}`}>
        <Icon size={18} className={isRed ? 'text-danger' : 'text-secondary'} />
      </span>
      <input 
        type={showPassword && showPassword[name] ? "text" : "password"} 
        className={`form-control border-start-0 ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'} border-end-0`}
        style={{ boxShadow: 'none', transition: 'all 0.2s ease' }}
        value={value}
        onChange={e => setPasswords({...passwords, [name]: e.target.value})} 
        required 
        placeholder="••••••••"
      />
      <button 
        className={`btn ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'} border-start-0 bg-white`} 
        type="button" 
        onClick={() => toggleVisibility(name)}
        style={{ boxShadow: 'none', transition: 'all 0.2s ease' }}
      >
        {showPassword && showPassword[name] ? <EyeOff size={18} className="text-secondary" /> : <Eye size={18} className="text-secondary" />}
      </button>
    </div>
  </div>
);

export default function ForgotPassword({ show, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({ newP: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ newP: false, confirm: false });
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const toggleVisibility = (field) => setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://backend-real68.vercel.app/api/forgot-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Email not found');
      
      // บันทึก username ที่ได้จาก API response
      if (data.username) {
        setUsername(data.username);
      }
      
      Swal.fire({ 
        icon: 'success', 
        title: 'OTP Sent!', 
        text: 'Please check your email for the verification code.', 
        timer: 2000,
        showConfirmButton: false,
      });
      setStep(2);
    } catch (err) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: err.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } finally { setLoading(false); }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://backend-real68.vercel.app/api/forgot-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error('Invalid OTP code');
      
      Swal.fire({ 
        icon: 'success', 
        title: 'Verified!', 
        text: 'OTP code is correct. You can now reset your password.', 
        timer: 2000,
        showConfirmButton: false,
      });
      setStep(3);
    } catch (err) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Invalid Code', 
        text: 'The OTP you entered is incorrect. Please try again.',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwords.newP !== passwords.confirm) {
      return Swal.fire({ 
        icon: 'warning', 
        title: 'Password Mismatch', 
        text: 'The passwords you entered do not match!',
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setLoading(true);
    try {
      const res = await fetch('https://backend-real68.vercel.app/api/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: passwords.newP }),
      });
      if (!res.ok) throw new Error('Failed to reset password');

      await Swal.fire({ 
        icon: 'success', 
        title: 'Password Reset Successfully!', 
        text: 'You can now login with your new password.',
        timer: 2000,
        showConfirmButton: false,
      });
      
      setEmail('');
      setUsername('');
      setOtp('');
      setPasswords({ newP: '', confirm: '' });
      setStep(1);
      onClose();
    } catch (err) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: err.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } finally { setLoading(false); }
  };

  return (
    <div 
      className="modal d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        zIndex: 1050, 
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            transform: translateY(20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);
        }
        .btn-danger:hover {
          background-color: #bb2d3b;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .btn-link:hover {
          transform: translateX(-2px);
        }
        .btn {
          transition: all 0.2s ease;
        }
        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        .step-dot.active {
          background-color: white;
          width: 24px;
          border-radius: 4px;
        }
        .otp-input {
          letter-spacing: 0.5rem;
        }
        .user-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, #dc3545 0%, #a71d2a 100%);
          color: white;
          border-radius: 20px;
          font-weight: 600;
          margin: 12px 0;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
        }
        .email-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 12px;
          font-size: 0.875rem;
          color: #495057;
          font-weight: 500;
          margin-top: 8px;
        }

       /* Responsive Design */
        @media (max-width: 576px) {
          .modal-dialog {
            margin: 0.5rem;
          }
          .otp-input {
            font-size: 1.5rem !important;
            letter-spacing: 0.3rem;
          }
          h4 {
            font-size: 1.25rem;
          }
        }
      `}</style>
      
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Header */}
          <div 
            className="p-4 text-white text-center position-relative" 
            style={{ 
              background: 'linear-gradient(135deg, #dc3545 0%, #a71d2a 100%)'
            }}
          >
            {step > 1 && (
              <button 
                className="btn btn-link text-white position-absolute start-0 top-50 translate-middle-y ps-3"
                onClick={() => setStep(step - 1)}
                style={{ textDecoration: 'none' }}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            
            <div className="mb-3">
              <ShieldCheck size={48} className="mb-2" style={{ animation: 'pulse 2s infinite' }} />
            </div>
            <h4 className="fw-bold mb-2">Reset Your Password</h4>
            <p className="small mb-3 opacity-75">
              {step === 1 && 'Enter your email to receive a verification code'}
              {step === 2 && 'Verify the code sent to your email'}
              {step === 3 && 'Create a new secure password'}
            </p>
            
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
            </div>
          </div>

          <div className="modal-body p-4" style={{ backgroundColor: '#fafafa' }}>
            {/* Step 1: Input Email */}
            {step === 1 && (
              <form onSubmit={handleRequestOTP}>
                <div className="bg-white rounded-3 p-4 shadow-sm mb-3">
                  <label className="form-label fw-semibold text-secondary mb-3">
                    <MailCheck size={18} className="text-danger me-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="form-control border-secondary-subtle py-2" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    placeholder="Enter your email address"
                    style={{ fontSize: '1rem' }}
                  />
                  <small className="text-muted d-block mt-2">
                    We'll send a 6-digit verification code to this email address.
                  </small>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-danger w-100 py-3 fw-bold shadow-sm rounded-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="me-2" style={{ marginTop: '-2px' }} />
                      Send Verification Code
                    </>
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-link w-100 mt-3 text-secondary text-decoration-none" 
                  onClick={onClose}
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Step 2: Input OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <div className="bg-white rounded-3 p-4 shadow-sm text-center mb-3">
                  <div className="mb-4">
                    <div 
                      className="bg-danger bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3"
                      style={{ border: '2px solid rgba(220, 53, 69, 0.3)' }}
                    >
                      <MailCheck size={40} className="text-danger" />
                    </div>
                    
                    {/* Username Greeting */}
                    {username && (
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2 text-secondary">Hello,</h6>
                        <div className="user-badge">
                          <User size={18} />
                          <span>{username}</span>
                        </div>
                      </div>
                    )}
                    
                    <h6 className="fw-bold mb-2">Verification Code</h6>
                    <p className="small text-muted mb-2">
                      We've sent a 6-digit verification code to:
                    </p>
                    <div className="email-badge">
                      <MailCheck size={14} className="me-1" style={{ marginTop: '-2px' }} />
                      {email}
                    </div>
                  </div>
                  
                  <input 
                    type="text" 
                    className="form-control text-center fw-bold border-danger-subtle otp-input mb-3" 
                    maxLength="6" 
                    placeholder="- - - - - -" 
                    value={otp} 
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} 
                    required 
                    style={{ 
                      fontSize: '2rem',
                      padding: '1rem'
                    }}
                  />
                  
                  <small className="text-muted">
                    Didn't receive the code? Check your spam folder
                  </small>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-danger w-100 py-3 fw-bold shadow-sm rounded-3" 
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} className="me-2" style={{ marginTop: '-2px' }} />
                      Verify Code
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="bg-white rounded-3 p-4 shadow-sm mb-3" style={{ border: '1px solid rgba(220, 53, 69, 0.1)' }}>
                  <PasswordInput 
                    label="New Password" 
                    value={passwords.newP} 
                    name="newP" 
                    isRed={true} 
                    showPassword={showPassword} 
                    toggleVisibility={toggleVisibility} 
                    setPasswords={setPasswords} 
                    passwords={passwords} 
                    icon={KeyRound} 
                  />
                  <PasswordInput 
                    label="Confirm New Password" 
                    value={passwords.confirm} 
                    name="confirm" 
                    isRed={true} 
                    showPassword={showPassword} 
                    toggleVisibility={toggleVisibility} 
                    setPasswords={setPasswords} 
                    passwords={passwords} 
                    icon={ShieldCheck} 
                  />
                </div>
                
                <div className="p-3 bg-light rounded-3 border border-secondary-subtle mb-3">
                  <small className="text-secondary">
                    <strong>💡 Password Requirements:</strong>
                    <ul className="mb-0 mt-2 ps-3">
                      <li>At least 8 characters long</li>
                      <li>Include uppercase and lowercase letters</li>
                      <li>Include numbers and special characters</li>
                    </ul>
                  </small>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-danger w-100 py-3 fw-bold shadow-sm rounded-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} className="me-2" style={{ marginTop: '-2px' }} />
                      Reset My Password
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}