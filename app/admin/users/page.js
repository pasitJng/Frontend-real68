'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedIds.length === items.length && items.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedIds, items]);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const allIds = items.map((item) => item.id);
      setSelectedIds(allIds);
    }
    setIsAllSelected(!isAllSelected);
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

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card border-dark shadow">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5">Users List</span>
            <button
              className="btn btn-danger delete-btn"
              onClick={deleteSelected}
            >
              Delete Selected
            </button>
          </div>
          <div className="card-body bg-white">
            <div className="row">
              <table className="table table-hover text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '5%' }}>
                      <input
                        type="checkbox"
                        className="form-check-input checkbox-red"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th style={{ width: '10%' }}>#</th>
                    <th style={{ width: '55%' }}>Username</th>
                    <th style={{ width: '30%' }}>Action</th>
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
                          className="btn btn-outline-danger fw-semibold view-btn"
                          onClick={() => showUserDetail(item)}
                        >
                          View Details
                        </button>
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
      `}</style>
    </>
  );
}
