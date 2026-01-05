'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Eye, EyeOff, Lock, KeyRound, ShieldCheck } from 'lucide-react';

const PasswordInput = ({ 
  label, 
  value, 
  name, 
  isRed = false, 
  showPassword, 
  toggleVisibility,
  setPasswords, 
  passwords,
  icon: Icon = Lock
}) => {
  return (
    <div className="mb-4">
      <label className={`form-label fw-semibold mb-2 ${isRed ? 'text-danger' : 'text-secondary'}`}>
        {label}
      </label>
      <div className="input-group">
        <span className={`input-group-text bg-white border-end-0 ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'}`}>
          <Icon size={18} className={isRed ? 'text-danger' : 'text-secondary'} />
        </span>
        <input 
          type={showPassword && showPassword[name] ? "text" : "password"} 
          className={`form-control border-start-0 ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'} border-end-0`}
          style={{ 
            boxShadow: 'none',
            transition: 'all 0.2s ease'
          }}
          value={value}
          onChange={e => setPasswords({...passwords, [name]: e.target.value})} 
          required 
          placeholder="Enter your password"
        />
        <button 
          className={`btn ${isRed ? 'border-danger-subtle' : 'border-secondary-subtle'} border-start-0 bg-white`}
          style={{ 
            boxShadow: 'none',
            transition: 'all 0.2s ease'
          }}
          type="button"
          onClick={() => toggleVisibility(name)}
          title={showPassword && showPassword[name] ? "Hide password" : "Show password"}
        >
          {showPassword && showPassword[name] ? 
            <EyeOff size={18} className="text-secondary" /> : 
            <Eye size={18} className="text-secondary" />
          }
        </button>
      </div>
    </div>
  );
};

export default function ChangePassword({ show, onClose }) {
  const [passwords, setPasswords] = useState({ old: '', newP: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({
    old: false,
    newP: false,
    confirm: false
  });

  if (!show) return null;
  
  const toggleVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

const [loading, setLoading] = useState(false);

const handleUpdatePassword = async (e) => {
  e.preventDefault();

  // 1. Client-side Validation: Match Check
  if (passwords.newP !== passwords.confirm) {
    return Swal.fire({
      icon: 'warning',
      title: 'Validation Failed',
      text: 'The new passwords do not match. Please re-enter them.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }

  try {
    // Retrieve Auth Credentials from Storage
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user')); // Adjust key based on your setup

    if (!token || !userData?.id) {
      throw new Error("Your session has expired. Please log in again.");
    }

    // 2. API Request: Targeting PUT /api/users/{id}
    const response = await fetch(`https://backend-real68.vercel.app/api/users/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        oldPassword: passwords.old, // Matches Backend 'oldPassword'
        password: passwords.newP,    // Matches Backend 'password' (new password)
      }),
    });

    const result = await response.json();

    // 3. Error Handling based on Backend Responses
    if (!response.ok) {
      throw new Error(result.error || result.message || 'An unexpected error occurred.');
    }

    // 4. Success Handling
    await Swal.fire({
      icon: 'success',
      title: 'Password Updated',
      text: 'Your Password have been successfully changed.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      
    });

    onClose(); // Reset state and close modal

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: error.message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
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
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
        .form-control:focus,
        .btn:focus {
          box-shadow: none !important;
        }
        .form-control:focus {
          border-color: #dc3545 !important;
        }
        .btn-danger:hover {
          background-color: #bb2d3b;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .btn-light:hover {
          background-color: #e9ecef;
          transform: translateY(-1px);
        }
        .btn {
          transition: all 0.2s ease;
        }
      `}</style>
      
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* Header */}
          <div 
            className="modal-header border-0 pb-3" 
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              borderRadius: '1rem 1rem 0 0'
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="bg-danger bg-opacity-10 p-2 rounded-3 me-3"
                style={{ border: '1px solid rgba(220, 53, 69, 0.3)' }}
              >
                <ShieldCheck size={24} className="text-danger" />
              </div>
              <div>
                <h5 className="modal-title text-white mb-0 fw-bold">Change Password</h5>
                <small className="text-white-50">Secure your account</small>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              style={{ 
                opacity: 0.7,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
            ></button>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdatePassword}>
            <div className="modal-body p-4" style={{ backgroundColor: '#fafafa' }}>
              {/* Current Password */}
              <div className="bg-white rounded-3 p-3 mb-3 shadow-sm">
                <PasswordInput 
                  label="Current Password" 
                  value={passwords.old} 
                  name="old" 
                  showPassword={showPassword}
                  toggleVisibility={toggleVisibility}
                  setPasswords={setPasswords}
                  passwords={passwords}
                  icon={Lock}
                />
              </div>

              {/* Divider */}
              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#e0e0e0' }}></div>
                <span className="px-3 text-muted small">New Credentials</span>
                <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#e0e0e0' }}></div>
              </div>

              {/* New Passwords */}
              <div className="bg-white rounded-3 p-3 shadow-sm" style={{ border: '1px solid rgba(220, 53, 69, 0.1)' }}>
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

              {/* Password hint */}
              <div className="mt-3 p-3 bg-light rounded-3 border border-secondary-subtle">
                <small className="text-secondary">
                  <strong>💡 Security Tip:</strong> Use at least 8 characters, combining uppercase, lowercase, numbers, and symbols for a strong password.
                </small>
              </div>
            </div>
            
            {/* Footer */}
            <div className="modal-footer border-0 p-4 pt-3 bg-white rounded-bottom-4">
              <button 
                type="button" 
                className="btn btn-light px-4 py-2 rounded-3 fw-semibold" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-danger px-4 py-2 fw-semibold rounded-3"
              >
                <KeyRound size={18} className="me-2" style={{ marginTop: '-2px' }} />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}