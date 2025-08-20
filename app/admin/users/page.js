'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';

const MySwal = withReactContent(Swal);

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        cache: 'no-store', // ป้องกันการ cache
      });
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
      router.push('/Login'); // ถ้าไม่มี token → กลับไปหน้า Login
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

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
      MySwal.fire('No Selection', 'Please select users to delete.', 'info');
      return;
    }

    const confirm = await MySwal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${selectedIds.length} user(s)!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete them!',
    });

    if (confirm.isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) =>
            fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
              method: 'DELETE',
            })
          )
        );
        MySwal.fire('Deleted!', 'Selected users have been deleted.', 'success');
        setSelectedIds([]);
      } catch (err) {
        console.error('Delete error:', err);
        MySwal.fire('Error', 'Failed to delete users.', 'error');
      }
    }
  };

  const showUserDetail = (item) => {
    MySwal.fire({
      title: `<strong style="color:#dc3545;">User Details</strong>`,
      html: `
        <div style="text-align: left; font-size: 1rem; line-height: 1.7;">
          <p><strong>Username:</strong> ${item.username}</p>
          <p><strong>Prefix:</strong> ${item.firstname}</p>
          <p><strong>Firstname:</strong> ${item.fullname}</p>
          <p><strong>Lastname:</strong> ${item.lastname}</p>
          <p><strong>Password:</strong> ${item.password}</p>
          <p><strong>Address:</strong> ${item.address}</p>
        </div>
      `,
      background: '#fff',
      showCloseButton: true,
      showConfirmButton: false,
      width: 600,
    });
  };

  if (loading) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card border-dark shadow">
          <div className="card-header bg-dark text-white d-flex flex-wrap justify-content-between align-items-center gap-2">
            <span className="fw-bold fs-5">Users List</span>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleSelectAll}
              >
                {selectedIds.length === items.length ? 'Deselect All' : 'Select All'}
              </button>
              <button
                className="btn btn-danger btn-sm delete-btn"
                onClick={deleteSelected}
              >
                Delete Selected
              </button>
            </div>
          </div>
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
                      <td>{index + 1}</td>
                      <td className="text-capitalize">{item.username}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm fw-semibold view-btn me-2"
                          onClick={() => showUserDetail(item)}
                        >
                          View Details
                        </button>
                        <a
                          href={`/admin/users/edit/${item.id}`}
                          className="btn btn-danger btn-sm fw-semibold edit-btn"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br /><br />

      <style jsx>{`
        .view-btn {
          transition: all 0.3s ease;
          border-radius: 30px;
          padding: 6px 18px;
        }

        .view-btn:hover {
          background-color: #dc3545;
          color: white;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
        }

        .edit-btn {
          border-radius: 30px;
          padding: 6px 18px;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background-color: #b02a37;
          color: white;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 10px rgba(176, 42, 55, 0.3);
          text-decoration: none;
        }

        .delete-btn {
          border-radius: 20px;
          padding: 5px 15px;
          font-weight: 500;
        }

        .table tbody tr:hover {
          background-color: rgba(220, 53, 69, 0.05);
        }

        .checkbox-red:checked {
          accent-color: #dc3545;
        }

        @media (max-width: 768px) {
          .view-btn,
          .edit-btn {
            padding: 4px 10px;
            font-size: 0.85rem;
          }

          .delete-btn {
            width: 100%;
            margin-top: 8px;
          }

          .card-header {
            text-align: center;
          }

          .table thead {
            font-size: 0.9rem;
          }

          .table td {
            font-size: 0.9rem;
            word-break: break-word;
          }
        }
      `}</style>
    </>
  );
}
