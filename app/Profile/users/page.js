'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, MapPin, Calendar, Shield, Hash,
  UserCircle, Activity, Edit, Lock, Gauge, AlertCircle, 
  Trash2, AlertTriangle
} from 'lucide-react';
import EditProfile from '@/components/EditProfile';
import ChangePassword from '@/components/ChangePassword';
import Swal from 'sweetalert2';

// --- ฟังก์ชันช่วยเหลือ (Utility Functions) ---
const formatDate = (dateString) => {
  if (!dateString) return 'Null';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return 'Wrong date!'; }
};

const getInitials = (firstname, lastname) => {
  if (!firstname || !lastname) return '??';
  return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
};

// --- CSS ปรับแต่งเพิ่มเติมสำหรับ Bootstrap ---
const customStyles = {
  headerCard: {
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  avatar: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    fontSize: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
  }
};

// --- Frame Animation Styles (แบบเด้งออกมา) ---
const frameAnimationStyles = `
  @keyframes ping-frame {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  @keyframes ping-frame-delayed {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      transform: scale(1.6);
      opacity: 0;
    }
  }

  @keyframes bounce-scale {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes status-ping {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .ping-frame-1 {
    animation: ping-frame 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .ping-frame-2 {
    animation: ping-frame-delayed 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    animation-delay: 0.5s;
  }

  .ping-frame-3 {
    animation: ping-frame 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    animation-delay: 1s;
  }

  .status-ping {
    animation: status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;

// --- Skeleton Component (ตอนกำลังโหลด) ---
const ProfileSkeleton = () => (
  <div className="container py-5">
    <div className="card p-4 mb-4 border-0 shadow-sm" style={{ borderRadius: '20px' }}>
      <div className="row align-items-center placeholder-glow">
        <div className="col-auto">
          <div className="placeholder rounded-circle" style={{ width: '120px', height: '120px' }}></div>
        </div>
        <div className="col text-center text-md-start">
          <div className="placeholder col-6 mb-3"></div>
          <div className="placeholder col-4 d-block"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- InfoRow Component ---
const InfoRow = ({ icon, label, value }) => (
  <div className="d-flex align-items-start gap-3 py-3 border-bottom border-light">
    <div className="text-secondary">{icon}</div>
    <div className="flex-grow-1">
      <div className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>{label}</div>
      <div className={value ? 'text-dark fw-medium' : 'text-muted fst-italic'}>{value || 'Null'}</div>
    </div>
  </div>
);

// --- Main Component ---
export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchUser = async () => {
          try {
            setLoading(true);
            
            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (!storedUser || !token) {
              router.push('/Login');
              return;
            }

            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser.id;

            const response = await fetch(`https://backend-real68.vercel.app/api/users/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (!response.ok) throw new Error('Failed to fetch user data');

            const data = await response.json();
            setUser(data);

          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, [router]);

  if (loading) return <ProfileSkeleton />;
  if (!user) return <div className="text-center py-5">Not found user!</div>;
  if (error) return (
    <div className="container py-5 text-center">
      <div className="alert alert-danger d-inline-block shadow-sm px-5">
        <AlertCircle className="mb-2" size={32} />
        <h4>Error</h4>
        <p>{error}</p>
        <button className="btn btn-danger btn-sm" onClick={() => window.location.reload()}>Try again!</button>
      </div>
    </div>
  );

  if (!user) return null;

  const fullName = `${user.prefix || ''} ${user.firstname} ${user.lastname} `.trim();

const handleDeleteAccount = async () => {

      if (user.role?.toLowerCase() === 'admin') {
         await Swal.fire({
          icon : 'error',
          title : 'Access Denied', 
          text : 'Admin accounts cannot be deleted.', 
          showConfirmButton : false,
          timer : 2000,
          timerProgressBar : true,
        });
        return;
      }
      // 1. เรียก Swal แบบมี Input
      const result = await Swal.fire({
        title: 'Are you absolutely sure?',
        html: `
          <div style="text-align: left; font-size: 0.95rem; color: #555;">
            <p>This action cannot be undone. This will permanently delete the 
            <strong style="color: #d33;">${user.username}</strong> account and remove your data from our servers.</p>
            <p class="mb-2">Please type <strong>${user.username}</strong> to confirm.</p>
          </div>
        `,
        input: 'text',
        inputPlaceholder: user.username, // Placeholder เป็นชื่อ User
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'I understand, delete this account',
        showLoaderOnConfirm: true, // แสดง Loading ตอนกด
        
        // 2. ตรวจสอบว่าพิมพ์ถูกไหมก่อนกด OK
        preConfirm: (inputValue) => {
          if (inputValue !== user.username) {
            Swal.showValidationMessage(`Please type "${user.username}" to confirm.`);
            return false; // ห้ามผ่าน
          }
          return true; // ผ่าน
        }
      });
  
      // 3. ถ้าพิมพ์ถูกและกด Confirm ให้เริ่มลบ
      if (result.isConfirmed) {
        try {
          // แสดง Loading ระหว่างลบจริง (กัน User กดซ้ำ)
          Swal.fire({
            title: 'Deleting account...',
            text: 'Please wait',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
          });

          const token = localStorage.getItem("token");
          const res = await fetch(`https://backend-real68.vercel.app/api/users/${user.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (res.ok) {
            await Swal.fire({
               icon: 'success',
               title: 'Deleted!',
               text: 'Your account has been deleted.',
               timer: 2000,
               showConfirmButton: false,
               timerProgressBar: true,
            });
            
            // ล้างข้อมูลและเด้งไปหน้า Login
            localStorage.clear();
            window.location.href = '/Login';
          } else {
            throw new Error('Failed to delete');
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong.', 'error');
        }
      }
    };

  return (
    <>
      <style>{frameAnimationStyles}</style>
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: '900px' }}>
            
            {/* Header Card */}
            <div className="card mb-4 p-4 p-md-5 position-relative border-0 shadow-sm" style={customStyles.headerCard}>
              <div className="row align-items-center position-relative">
                <div className="col-12 col-md-auto text-center mb-4 mb-md-0">
                  <div className="position-relative d-inline-block">
                    
                    
                    {/* Avatar with Bounce */}
                    <div className="bounce-scale rounded-circle text-white fw-bold shadow-lg mx-auto position-relative" style={{...customStyles.avatar, zIndex: 1}}>
                      {getInitials(user.firstname, user.lastname)}
                    </div>
                    
                    {/* Status Dot with Ping Effect */}
                      {user.status === 'active' && (() => {
                        // กำหนดสีตาม Role
                        const roleColor = user.role?.toLowerCase() === 'admin' ? 'bg-danger' : 'bg-primary';

                        return (
                          <div className="position-absolute" style={{ bottom: '0', right: '0', zIndex: 2 }}>
                            {/* Ping Effect */}
                            <span 
                              className={`position-absolute status-ping rounded-circle ${roleColor}`}
                              style={{
                                width: '27px',
                                height: '27px',
                                bottom: '0',
                                right: '10px',
                                opacity: 0.6 // ปรับให้จางลงนิดนึงเพื่อให้ดูเหมือนเงาสะท้อน
                              }}
                            ></span>
                            
                            {/* Static Dot */}
                            <span 
                              className={`position-relative border border-4 border-white rounded-circle shadow-sm d-block ${roleColor}`}
                              style={{
                                width: '27px',
                                height: '27px',
                                bottom: '0',
                                right: '10px',
                              }}
                            ></span>
                          </div>
                        );
                      })()}
                  </div>
                </div>

                <div className="col text-center text-md-start">
                  <h1 className="display-6 fw-bold text-dark mb-1">{fullName}</h1>
                  <p className="text-secondary d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                    <UserCircle size={18} /> @{user.username}
                  </p>
                  <p className="text-secondary d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
                    <Mail size={18} /> {user.email}
                  </p>

                  <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mb-4">
                    <span className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${user.role === 'admin' ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-primary-subtle text-primary border border-primary-subtle'}`}>
                      <Shield size={14} /> {user.role.toUpperCase()}
                    </span>
                    <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success border border-success-subtle d-flex align-items-center gap-2">
                      <Activity size={14} /> {user.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
                    <button 
                        onClick={() =>  setShowEditModal(true)} 
                        className="btn btn-outline-dark px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-decoration-none"
                      >
                        <Edit size={18} /> Edit Profile
                    </button>
                    <button  
                    onClick={() =>  setShowPasswordModal(true)} 
                    className="btn btn-outline-danger px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm"
                    >
                      <Lock size={18} /> Change Password 
                    </button>
                    {user.role?.toLowerCase() === 'admin' &&
                      <Link 
                          href="/admin/users" 
                          className="btn btn-outline-primary px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-smtext-decoration-none"
                        >
                          <i className="bi bi-speedometer2" size={18} /> Admin Dashboard
                      </Link>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-danger">
                    <Shield size={20} /> About Account
                  </h5>
                  <InfoRow icon={<Hash size={18} />} label="User ID" value={user.id} />
                  <InfoRow icon={<User size={18} />} label="Username" value={user.username} />
                  <InfoRow icon={<Mail size={18} />} label="Email" value={user.email} />
                  <InfoRow icon={<Shield size={18} />} label="Role" value={user.role} />
                  <InfoRow icon={<Activity size={18} />} label="Status" value={user.status} />
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-danger">
                    <UserCircle size={20} /> Personal details
                  </h5>
                  <InfoRow icon={<User size={18} />} label="Full Name" value={fullName} />
                  <InfoRow icon={<User size={18} />} label="Gender" value={user.gender} />
                  <InfoRow icon={<Calendar size={18} />} label="Date of Birth" value={formatDate(user.birthdate)} />
                  <InfoRow icon={<MapPin size={18} />} label="Address" value={user.address} />
                </div>
              </div>
            </div>

            <div className="card mt-4 border-danger shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
              <div className="card-header bg-danger-subtle text-danger fw-bold border-bottom border-danger-subtle d-flex align-items-center gap-2 p-3">
                <AlertTriangle size={20} /> Delete Account
              </div>
              <div className="card-body p-4">
                <div className="row align-items-center g-3">
                    {/* Text Column */}
                    <div className="col-12 col-md-8 text-center text-md-start">
                        <h6 className="fw-bold text-dark mb-1">Delete this account</h6>
                        <p className="text-secondary small mb-0">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                    </div>
                    {/* Button Column */}
                    <div className="col-12 col-md-4 text-center text-md-end">
                        <button 
                        onClick={handleDeleteAccount}
                        className="btn btn-outline-danger w-100 w-md-auto d-inline-flex align-items-center justify-content-center gap-2 rounded-3 fw-medium"
                        disabled ={user.role?.toLowerCase() === 'admin'}
                        style={{ cursor: user.role?.toLowerCase() === 'admin' ? 'not-allowed' : 'pointer' }}
                        >
                        <Trash2 size={18} /> {user.role?.toLowerCase() === 'admin' ? 'Admin Cannot Delete' : 'Delete Account'}
                        
                        </button>
                    </div>
                </div>
              </div>
            </div>

                  <EditProfile
                    show={showEditModal} 
                    onClose={() => setShowEditModal(false)} 
                    onSuccess={() => window.location.reload()} 
                  />

                  {showPasswordModal &&(
                    <ChangePassword 
                      show={showPasswordModal} 
                      onClose={() => setShowPasswordModal(false)} 
                    />
                  )}
          </div>
        </div>
      </div>
    </>
  );
}