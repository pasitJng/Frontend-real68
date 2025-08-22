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

  const getUsers = async () => {
    try {
      const res = await fetch('/api/users', { cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch data');
        return;
      }
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login');
      return;
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
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
    // ถ้ามี selectedIds อยู่แล้ว ให้ลบทั้งหมด ไม่งั้นลบเฉพาะ id ที่กด
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
      try {
        await Promise.all(
          idsToDelete.map((uid) =>
            fetch(`https://backend-nextjs-virid.vercel.app/api/users/${uid}`, {
              method: 'DELETE',
            })
          )
        );
        MySwal.fire('Deleted!', 'Selected users have been deleted.', 'success');
        setSelectedIds([]);
        getUsers();
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
          <p><i class="bi bi-person"></i> <strong>Username:</strong> ${item.username}</p>
          <p><i class="bi bi-card-text"></i> <strong>Prefix:</strong> ${item.firstname}</p>
          <p><i class="bi bi-person-bounding-box"></i> <strong>Firstname:</strong> ${item.fullname}</p>
          <p><i class="bi bi-person-bounding-box"></i> <strong>Lastname:</strong> ${item.lastname}</p>
          <p><i class="bi bi-key"></i> <strong>Password:</strong> ${item.password}</p>
          <p><i class="bi bi-geo-alt"></i> <strong>Address:</strong> ${item.address}</p>
        </div>
      `,
      background: '#fff',
      showCloseButton: true,
      showConfirmButton: false,
      width: '90%',
      customClass: {
        popup: 'responsive-popup'
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3 fw-semibold">Loading users...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card border-0 shadow-lg">
          {/* Header */}
          <div className="card-header bg-dark text-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <span className="fw-bold fs-5">
              <i className="bi bi-people-fill me-2"></i> Users List
            </span>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleSelectAll}
              >
                <i className="bi bi-check2-square me-1"></i>
                {selectedIds.length === items.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="card-body bg-white">
            <div className="table-responsive">
              <table className="table table-hover text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '5%' }}>
                      <input
                        type="checkbox"
                        className="form-check-input checkbox-red"
                        onChange={handleSelectAll}
                        checked={items.length > 0 && selectedIds.length === items.length}
                      />
                    </th>
                    <th style={{ width: '10%' }}>#</th>
                    <th style={{ width: '45%' }}>Username</th>
                    <th style={{ width: '40%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input checkbox-red"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                        />
                      </td>
                      <td>
                        <span className="badge bg-secondary">{index + 1}/ {item.id}</span>
                      </td>
                      <td className="text-capitalize fw-semibold">
                        <i className="bi bi-person-circle me-1"></i> {item.username}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          {/* View Button */}
                          <button
                            className="btn btn-outline-warning btn-sm action-btn"
                            onClick={() => showUserDetail(item)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          {/* Edit Button */}
                          <a
                            href={`/admin/users/edit/${item.id}`}
                            className="btn btn-outline-danger btn-sm action-btn"
                            title="Edit User"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </a>

                          {/* Delete Button */}
                          <button
                            className="btn btn-outline-secondary btn-sm action-btn"
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
        </div>
      </div>

      <style jsx>{`
        .delete-btn {
          border-radius: 20px;
          padding: 5px 15px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .delete-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .table tbody tr:hover {
          background-color: rgba(220, 53, 69, 0.05);
        }
        .checkbox-red:checked {
          accent-color: #dc3545;
        }
        .action-btn {
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .action-btn:hover {
          box-shadow: 0 4px 10px rgba(220, 53, 69, 0.25);
        }
      `}</style>
    </>
  );
}
