'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MySwal = withReactContent(Swal);

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

const getUsers = async (isInitial = false) => {
  try {
    // ให้แสดงหน้า Loading เฉพาะตอนเข้าหน้าเว็บครั้งแรกเท่านั้น
    if (isInitial) setLoading(true); 
    
    const token = localStorage.getItem('token'); 
    const res = await fetch('https://backend-real68.vercel.app/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`, // สำคัญมาก: ต้องมี Bearer นำหน้า
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      setItems(data);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false); // ปิด loading เมื่อเสร็จสิ้น
  }
};

useEffect(() => {
  const checkAuth = () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem('token');

    // 1. เช็คว่ามี Token ไหม
    if (!token || !storedUser) {
      router.push('/Login');
      return false;
    }

    try {
      const user = JSON.parse(storedUser);
      // 2. เช็คว่าเป็น Admin ไหม
      if (user.role?.toLowerCase() !== 'admin') {
         Swal.fire({
            icon: 'error',
            title: 'Denyed Access',
            text: 'Sorry, You are not admin!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).routerPush('/');
          return false;
      }
      return true; // ผ่านการตรวจสอบ
    } catch (error) {
      router.push('/');
      return false;
    }
  };

  const authorized = checkAuth();
  
  if (authorized) {
    setIsAuthorized(true); // ยืนยันสิทธิ์
    getUsers(true); // โหลดข้อมูลครั้งแรก
    
    // ตั้งเวลาดึงข้อมูลใหม่ทุก 5 วินาที
    const interval = setInterval(() => getUsers(false), 5000);
    return () => clearInterval(interval); // Cleanup เมื่อออกจากหน้า
  }
}, [router]);
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  };

const handleDeleteOne = async (id) => {
    const idsToDelete = selectedIds.length > 0 ? selectedIds : [id];

    const confirm = await MySwal.fire({
      title: 'Confirm Delete',
      html: `<span style="font-size:1.1rem;">You are about to delete <b>${idsToDelete.length}</b> user(s).</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '<i class="bi bi-trash"></i> Delete',
    });

    if (confirm.isConfirmed) {
      const token = localStorage.getItem("token");

      try {
        await Promise.all(
          idsToDelete.map((uid) =>
            fetch(`/api/users?id=${uid}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
          )
        );

        MySwal.fire('Deleted!', 'Selected users have been deleted.', 'success');
        setSelectedIds([]);
        getUsers(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
        
      } catch (err) {
        console.error('Delete error:', err);
        MySwal.fire('Error', 'Failed to delete users.', 'error');
      }
    }
  };

  const showUserDetail = (item) => {
    MySwal.fire({
      title: `<strong class="text-danger"><i class="bi bi-person-circle"></i> User Details</strong>`,
      html: `
        <div style="text-align: left; font-size: 1rem; line-height: 1.7;">
          <p><i class="bi bi-person text-danger"></i> <strong>Username:</strong> ${item.username}</p>
          <p><i class="bi bi-envelope text-danger"></i> <strong>Email:</strong> ${item.email}</p>
          <p><i class="bi bi-card-text text-danger"></i> <strong>Prefix:</strong> ${item.prefix}</p>
          <p><i class="bi bi-person-bounding-box text-danger"></i> <strong>Firstname:</strong> ${item.firstname}</p>
          <p><i class="bi bi-person-bounding-box text-danger"></i> <strong>Lastname:</strong> ${item.lastname}</p>
          <p><i class="bi bi-key text-danger"></i> <strong>Password:</strong> ******** </p>
          <p><i class="bi bi-geo-alt text-danger"></i> <strong>Address:</strong> ${item.address}</p>
        </div>
      `,
      background: '#ffffff',
      showCloseButton: true,
      showConfirmButton: false,
      width: window.innerWidth > 768 ? '20%' : '90%',
      customClass: {
        popup: 'responsive-popup border border-danger'
      }
    });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="text-center">
          <div className="spinner-border text-danger mb-3" role="status" style={{width: '3rem', height: '3rem'}}></div>
          <p className="fw-bold text-dark fs-5">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        {/* Header Section */}
        <div className="bg-dark text-white py-4 shadow-sm">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="h3 mb-0 fw-bold">
                  <i className="bi bi-speedometer2 text-danger me-2"></i>
                  Admin Dashboard
                </h1>
                <p className="mb-0 text-light opacity-75">
                  <i className="bi bi-people me-1"></i>
                  Manage your users efficiently
                </p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <span className="badge bg-danger fs-6 px-3 py-2">
                  <i className="bi bi-person-check me-1"></i>
                  {items.length} Total Users
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100 bg-white">
                <div className="card-body text-center">
                  <div className="text-danger mb-2">
                    <i className="bi bi-people-fill" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h5 className="card-title text-dark fw-bold">{items.length}</h5>
                  <p className="card-text text-muted small">Total Users</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100 bg-white">
                <div className="card-body text-center">
                  <div className="text-danger mb-2">
                    <i className="bi bi-check2-square" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h5 className="card-title text-dark fw-bold">{selectedIds.length}</h5>
                  <p className="card-text text-muted small">Selected Users</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100 bg-white">
                <div className="card-body text-center">
                  <div className="text-danger mb-2">
                    <i className="bi bi-shield-check" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h5 className="card-title text-dark fw-bold">Active</h5>
                  <p className="card-text text-muted small">System Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="card border-0 shadow-lg bg-white">
            {/* Table Header */}
            <div className="card-header bg-gradient" style={{background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'}}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                <div className="text-white">
                  <h5 className="mb-1 fw-bold">
                    <i className="bi bi-table me-2"></i>
                    Users Management
                  </h5>
                  <small className="opacity-75">Manage and monitor user accounts</small>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {selectedIds.length > 0 && (
                    <button
                      className="btn btn-outline-light btn-sm fw-bold shadow-sm"
                      onClick={() => handleDeleteOne(selectedIds[0])}
                      style={{borderRadius: '25px'}}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete Selected ({selectedIds.length})
                    </button>
                  )}

                  <button
                    className="btn btn-light btn-sm fw-bold shadow-sm"
                    onClick={handleSelectAll}
                    style={{borderRadius: '25px'}}
                  >
                    <i className="bi bi-check-all me-1 text-danger"></i>
                    {selectedIds.length === items.length ? 'Deselect All' : 'Select All'}
                  </button>
                  
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-center" style={{ width: '5%' }}>
                        <input
                          type="checkbox"
                          className="form-check-input checkbox-red"
                          onChange={handleSelectAll}
                          checked={items.length > 0 && selectedIds.length === items.length}
                        />
                      </th>
                      <th className="text-center" style={{ width: '10%' }}>
                        <i className="bi bi-hash me-1"></i>ID
                      </th>
                      <th style={{ width: '45%' }}>
                        <i className="bi bi-person me-1"></i>Username
                      </th>
                      <th className="text-center" style={{ width: '40%' }}>
                        <i className="bi bi-gear me-1"></i>Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="table-row-hover">
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className="form-check-input checkbox-red"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelect(item.id)}
                          />
                        </td>
                        <td className="text-center">
                          <span className="badge bg-light text-dark border fw-bold">
                            {index + 1} / {item.id}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-3">
                              <i className="bi bi-person-fill text-white"></i>
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{item.username}</div>
                              <small className="text-muted">User Account</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="btn-group shadow-sm" role="group">
                            <button
                              className="btn btn-outline-info btn-sm action-btn"
                              onClick={() => showUserDetail(item)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <a
                              href={`/admin/users/edit/${item.id}`}
                              className="btn btn-outline-warning btn-sm action-btn"
                              title="Edit User"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </a>
                            <button
                              className="btn btn-outline-danger btn-sm action-btn"
                              onClick={() => handleDeleteOne(item.id)}
                              title="Delete User"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer bg-light text-center py-3">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Total {items.length} users found | {selectedIds.length} selected
              </small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkbox-red:checked {
          accent-color: #dc3545;
          border-color: #dc3545;
        }

        .action-btn {
          border-radius: 8px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .table-row-hover:hover {
          background-color: rgba(220, 53, 69, 0.05);
          transition: background-color 0.3s ease;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-2px);
        }

        .bg-gradient {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
        }

        .btn-group .btn {
          border-radius: 8px !important;
          margin: 0 1px;
        }

        .table thead th {
          border: none;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-size: 0.9rem;
        }

        .table tbody td {
          border-color: #f8f9fa;
          padding: 1rem 0.75rem;
        }

        .badge {
          font-size: 0.8rem;
          padding: 0.4em 0.8em;
        }

        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
            width: 100%;
          }
          
          .action-btn {
            width: 100%;
            border-radius: 4px !important;
            margin: 1px 0 !important;
          }
        }
      `}</style>
    </>
  );
}