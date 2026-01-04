'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';
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
    <div className="mb-1">
      <label className={`form-label mb-2 ${isRed ? 'text-dark' : 'text-secondary'}`}>
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

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [prefix, setPrefix] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [passwords, setPasswords] = useState({ newP: '' });
  const [showPassword, setShowPassword] = useState({
    newP: false,
  });
  
  const toggleVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

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
        //console.log("🔍 ", data);


        const user = Array.isArray(data) ? data[0] : data;

        if (user) {
          setPrefix(user.prefix || '');
          setFirstname(user.firstname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setGender(user.gender || '');
          setBirthdate(user.birthdate ? user.birthdate.slice(0, 10) : ''); // ตัดเวลาออก
          setAddress(user.address || '');
          setEmail(user.email || '');
          setRole(user.role || 'user');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) getUsers();
  }, [id]);

  const handleAdminReset = async () => {
  const response = await fetch(`https://backend-real68.vercel.app/api/users/${targetUserId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}` // Token ของแอดมิน
    },
    body: JSON.stringify({
      password: newPasswordFromAdmin, // ส่งแค่รหัสใหม่ไปเลย
      // ไม่ต้องส่ง oldPassword เพราะ Backend จะเช็คเองว่าคนส่งเป็น admin แล้วจะอนุญาตให้ผ่าน
      firstname: '...', 
      role: 'user'
    }),
  });
};

  // ✅ อัปเดตข้อมูล user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const updateData = { 
      id, 
      prefix, 
      firstname, 
      lastname, 
      username, 
      gender, 
      birthdate, 
      address, 
      email,
      role 
    };

    if (passwords.newP && passwords.newP.trim() !== "") {
      updateData.password = passwords.newP; // ใช้ค่าจาก passwords.newP
    }

      const res = await fetch(`https://backend-real68.vercel.app/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
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
        setGender('');
        setBirthdate('');
        setAddress('');
        setEmail('');
        setRole('user');

      } else {
        Swal.fire({
          title: 'Error!',
          text: result.error || 'Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Cannot connect to the server. Please try again later.',
      });
    }
  };



  return (
    <main className="container py-5 px-3">
     <div className="container py-5 px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
            <div className="card shadow-sm p-4 border-0">
              <h2 className="text-center mb-3 fw-bold text-danger" style={{ fontSize: "1.5rem" }}>
                Edit User ID: {id}
              </h2>

              {loading ? (
                <div className="d-flex justify-content-center align-items-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ms-3 fw-bold text-danger">Loading User Info...</span>
                </div>
              ) : (
                <form onSubmit={handleUpdateSubmit} noValidate>
                  {/* แถวที่ 1: Username & Password */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label ">Account Role</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-secondary-subtle text-primary">
                          <ShieldCheck size={18} />
                        </span>
                        <select 
                          className="form-select border-secondary-subtle"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md mb-3">
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
                    </div>
                  </div>

                <div className="row">
                    <div className="col-md mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>  
                </div>

                  {/* แถวที่ 2: Prefix, First Name, Last Name */}
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Prefix</label>
                      <select
                        className="form-select"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
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

                  {/* แถวที่ 3: Address */}
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows="2"
                    />
                  </div>

                  {/* แถวที่ 4: Gender & Birthdate (เพิ่มใหม่) */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="LGBTQ+"
                            checked={gender === "LGBTQ+"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label">LGBTQ+</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Birthdate</label>
                      <input
                        type="date"
                        className="form-control"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 fw-bold mt-2">
                    Update User
                  </button>

                  <div className="text-center mt-3">
                    <a href="/admin/users" className="text-decoration-none text-secondary">
                      &larr; Back to Users List
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
