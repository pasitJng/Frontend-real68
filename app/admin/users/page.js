'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Page() {
  const [items, setItems] = useState([]);

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
          <div className="card-header bg-dark text-white fw-bold fs-5">
            Users List
          </div>
          <div className="card-body bg-white">
            <div className="row">
              <table className="table table-hover text-center align-middle">
                <thead className="table">
                  <tr>
                    <th style={{ width: '10%' }}>#</th>
                    <th style={{ width: '60%' }}>Username</th>
                    <th style={{ width: '30%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
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

        .table tbody tr:hover {
          background-color: rgba(220, 53, 69, 0.05);
        }
      `}</style>
    </>
  );
}
