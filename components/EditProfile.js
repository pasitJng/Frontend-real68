'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { User, UserCircle, Mail, Calendar, MapPin, Users } from 'lucide-react';

export default function EditProfile({ show, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    prefix: '',
    firstname: '',
    lastname: '',
    username: '',
    gender: '',
    birthdate: '',
    address: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchCurrentUserData();
    }
  }, [show]);

  const fetchCurrentUserData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem('token');
      
      if (!user.id) return;

      const res = await fetch(`https://backend-real68.vercel.app/api/users/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const userData = Array.isArray(data) ? data[0] : data;
        setFormData({
          prefix: userData.prefix || '',
          firstname: userData.firstname || '',
          lastname: userData.lastname || '',
          username: userData.username || '',
          gender: userData.gender || '',
          birthdate: userData.birthdate ? userData.birthdate.slice(0, 10) : '',
          address: userData.address || '',
          email: userData.email || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`https://backend-real68.vercel.app/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: user.id, ...formData }),
      });

      if (res.ok) {
        const updatedLocal = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedLocal));

      await Swal.fire({
                icon: 'success',
                title: 'Updated Successfully!',
                text: 'Your profile has been updated',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });

              // หลังจาก Swal ปิดลงแล้ว ถึงจะทำงาน 2 บรรทัดนี้
              onSuccess();
              onClose();
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Unable to connect to server',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          }
        };

  if (!show) return null;

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
        .form-select:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);
        }
        .form-check-input:checked {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .form-check-input:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);
        }
        .btn-danger:hover {
          background-color: #bb2d3b;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .btn-secondary:hover {
          background-color: #5c636a;
          transform: translateY(-1px);
        }
        .btn {
          transition: all 0.2s ease;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          pointer-events: none;
          z-index: 10;
        }
        .form-control-icon {
          padding-left: 40px;
        }
      `}</style>
      
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
                <UserCircle size={24} className="text-danger" />
              </div>
              <div>
                <h5 className="modal-title text-white mb-0 fw-bold">Edit Profile</h5>
                <small className="text-white-50">Update your personal information</small>
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
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4" style={{ backgroundColor: '#fafafa' }}>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-3">Loading profile data...</p>
                </div>
              ) : (
                <div className="row g-3">
                  {/* Username Section */}
                  <div className="col-12">
                    <div className="bg-white rounded-3 p-3 shadow-sm">
                      <div className="d-flex align-items-center mb-3">
                        <User size={18} className="text-danger me-2" />
                        <span className="text-uppercase fw-bold text-secondary small">Account Information</span>
                      </div>

                      <div className="position-relative">
                        <User size={18} className="input-icon" style={{
                                                                                
                                                                                top: '72%',
                                                                                left: '12px',
                                                                                transform: 'translateY(-50%)',
                                                                                zIndex: 10,
                                                                                color: '#adb5bd'
                                                                              }}/>
                        <label className="form-label fw-semibold text-secondary small mb-2">Username</label>
                        <input 
                          type="text" 
                          className="form-control form-control-icon bg-light border-secondary-subtle text-secondary" 
                          value={formData.username} 
                          disabled 
                          style={{ cursor: 'not-allowed' }}
                        />
                      </div>

                      <div className="position-relative">
                        <Mail size={18} className="input-icon" style={{
                                                                                
                                                                                top: '72%',
                                                                                left: '12px',
                                                                                transform: 'translateY(-50%)',
                                                                                zIndex: 10,
                                                                                color: '#adb5bd'
                                                                              }}/>
                        <label className="form-label fw-semibold text-secondary small mb-1 mt-2">Email</label>
                        <input 
                          type="text" 
                          className="form-control form-control-icon bg-light border-secondary-subtle text-secondary" 
                          value={formData.email} 
                          disabled 
                          style={{ cursor: 'not-allowed' }}
                        />
                        </div>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="col-12">
                    <div className="bg-white rounded-3 p-3 shadow-sm">
                      <div className="d-flex align-items-center mb-3">
                        <UserCircle size={18} className="text-danger me-2" />
                        <span className="text-uppercase fw-bold text-secondary small">Personal Information</span>
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-3">
                          <label className="form-label fw-semibold text-secondary small mb-2">Prefix</label>
                          <select 
                            className="form-select border-secondary-subtle" 
                            value={formData.prefix} 
                            onChange={e => setFormData({...formData, prefix: e.target.value})}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                          </select>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label fw-semibold text-secondary small mb-2">First Name</label>
                          <input 
                            type="text" 
                            className="form-control border-secondary-subtle" 
                            value={formData.firstname} 
                            onChange={e => setFormData({...formData, firstname: e.target.value})} 
                            placeholder="Enter first name"
                            required 
                          />
                        </div>

                        <div className="col-md-5">
                          <label className="form-label fw-semibold text-secondary small mb-2">Last Name</label>
                          <input 
                            type="text" 
                            className="form-control border-secondary-subtle" 
                            value={formData.lastname} 
                            onChange={e => setFormData({...formData, lastname: e.target.value})} 
                            placeholder="Enter last name"
                            required 
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-secondary small mb-2 d-flex align-items-center">
                            <Users size={16} className="me-2" />
                            Gender
                          </label>
                          <div className="d-flex gap-3 mt-2">
                            {['Male', 'Female', 'LGBTQ+'].map(g => (
                              <div key={g} className="form-check">
                                <input 
                                  className="form-check-input" 
                                  type="radio" 
                                  name="gender" 
                                  id={`gender-${g}`}
                                  value={g} 
                                  checked={formData.gender === g} 
                                  onChange={e => setFormData({...formData, gender: e.target.value})} 
                                />
                                <label className="form-check-label" htmlFor={`gender-${g}`}>
                                  {g}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-secondary small mb-2 d-flex align-items-center">
                            <Calendar size={16} className="me-2" />
                            Birthdate
                          </label>
                          <input 
                            type="date" 
                            className="form-control border-secondary-subtle" 
                            value={formData.birthdate} 
                            onChange={e => setFormData({...formData, birthdate: e.target.value})} 
                            required 
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold text-secondary small mb-2 d-flex align-items-center">
                            <MapPin size={16} className="me-2" />
                            Address
                          </label>
                          <textarea 
                            className="form-control border-secondary-subtle" 
                            rows="3" 
                            value={formData.address} 
                            onChange={e => setFormData({...formData, address: e.target.value})} 
                            placeholder="Enter your full address"
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Note */}
                  <div className="col-12">
                    <div className="p-3 bg-light rounded-3 border border-danger-subtle">
                      <small className="text-secondary">
                        <strong className='text-danger'> &gt; Note :</strong> Contact Admin to change your username or email.
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="modal-footer border-0 p-4 pt-3 bg-white rounded-bottom-4">
              <button 
                type="button" 
                className="btn btn-secondary px-4 py-2 rounded-3 fw-semibold" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-danger px-4 py-2 fw-semibold rounded-3"
                disabled={loading}
              >
                <UserCircle size={18} className="me-2" style={{ marginTop: '-2px' }} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}