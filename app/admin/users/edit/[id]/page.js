'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [prefix, setPrefix] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ ดึงข้อมูล user
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`https://backend-real68.vercel.app/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }); 
        if (!res.ok) {
          console.error('Failed to fetch data');
          setLoading(false);
          return;
        }
        const data = await res.json();
        console.log("🔍 ", data);


        const user = Array.isArray(data) ? data[0] : data;

        if (user) {
          setPrefix(user.prefix || '');
          setFirstname(user.firstname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setAddress(user.address || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) getUsers();
  }, [id]);

  // ✅ อัปเดตข้อมูล user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-real68.vercel.app/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, prefix, firstname, lastname, username, password, address }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '<h3>Update Success!</h3>',
          text: `Edit user ID: ${id} successfully.`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          router.push('/admin/users');
        });

        setPrefix('');
        setFirstname('');
        setLastname('');
        setUsername('');
        setPassword('');
        setAddress('');
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.error || 'เกิดข้อผิดพลาด!',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'Cannot connect to the server. Please try again later.',
      });
    }
  };

  return (
    <main className="container py-5 px-3">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
          <div className="card shadow-sm p-4 border-0">
            <h2 className="text-center mb-4 fw-bold text-danger">Edit User ID: {id}</h2>

            {/* ✅ Loading Animation */}
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ms-3 fw-bold text-danger">Loading User Info...</span>
              </div>
            ) : (
                <form onSubmit={handleUpdateSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Prefix</label>
                      <select
                        name="prefix"
                        className="form-select"
                        onChange={(e) => setPrefix(e.target.value)}
                        required
                        value={prefix}
                      >
                        <option value="">-- Select --</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                      </select>
                    </div>
                    <div className="col-md-5 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                <div className="mb-3">
                    <label className="form-label">New Password (Optional)</label>
                       <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-danger w-100 fw-bold mt-3">
                    Update
                  </button>

                  <div className="text-center mt-3">
                    <a href="/admin/users" className="text-decoration-none text-secondary">
                      &larr; Back to Register
                    </a>
                  </div>
                </form>
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
}
