'use client';
import { useState } from "react";
import Swal from "sweetalert2"; // ✅ นำเข้า sweetalert2
import BannerNotice from "@/components/BannerNotice";
import { useRouter } from 'next/navigation'
import 'sweetalert2/dist/sweetalert2.min.css'; // ✅ นำเข้า CSS ของ sweetalert2
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    prefix: '',
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
    birthdate: '',
    agree: false
  });

  const [validated, setValidated] = useState(false);
  const [duplicateFields, setDuplicateFields] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
      if (duplicateFields[name]) {
            setDuplicateFields(prev => {
              const newState = { ...prev };
              delete newState[name];
              return newState;
            });
          }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  // 1. ตรวจสอบความถูกต้องของ Form เบื้องต้น (Client-side Validation)
  if (form.checkValidity() === false || !formData.agree || !formData.gender) {
    e.stopPropagation();
    setValidated(true);
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Information',
      text: 'Please ensure all required fields are filled and the agreement is accepted.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  setDuplicateFields({}); 
  setValidated(false);

  setLoading(true);
  
  try {
    const response = await fetch("https://backend-real68.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json(); // แปลงเป็น JSON ทันทีเพื่อเอาข้อมูล Error หรือ Success มาใช้

    

    if (!response.ok) {
      setLoading(false);
      // 2. กรณีหลังบ้านตอบกลับเป็น Error (เช่น 400 - Username/Email ซ้ำ)
      const errorMsg = result.error || '';
      const newDuplicateErrors = {}; // สร้าง Object เปล่าเพื่อรอรับ Error
    
          // เช็ค Username
            if (errorMsg.toLowerCase().includes('username')) {
              newDuplicateErrors.username = errorMsg;
            }
            
            // เช็ค Email (แก้คำผิดจาก emaiil เป็น email)
            if (errorMsg.toLowerCase().includes('email')) {
              newDuplicateErrors.email = errorMsg;
            }

        setDuplicateFields(newDuplicateErrors);


        Swal.fire({
          icon: 'warning',
          title: 'Registration Failed',
          text: errorMsg,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }

    // 3. กรณีลงทะเบียนสำเร็จ
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: result.message || 'Your account has been created successfully.',
      timer: 5000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      router.push('/Login');
    });

    // รีเซ็ตฟอร์มหลังจากสำเร็จ
    setFormData({
      username: '',
      password: '',
      email: '',
      prefix: '',
      firstname: '',
      lastname: '',
      address: '',
      gender: '',
      birthdate: '',
      agree: false
    });
    setValidated(false);

  } catch (error) {
    setLoading(false);
    // 4. กรณีเกิดข้อผิดพลาดในการเชื่อมต่อ (Network Error)
    Swal.fire({
      icon: 'error',
      title: 'Connection Error',
      text: 'Unable to connect to the server. Please check your internet connection.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    console.error("Submit Error:", error);
  }
};

  return (
    <main>

      {/* SVG Icons (ไม่จำเป็นแล้ว หากไม่ใช้ Bootstrap alert) */}
      {/* ...สามารถลบออกได้ถ้าไม่ใช้งาน... */}

      <div className="container py-5 px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
            <div className="card shadow-sm p-4 border-0">
              <h2 className="text-center mb-3 fw-bold text-danger" style={{ fontSize: "1.5rem" }}>
                Register
              </h2>

              <form
                noValidate
                className={`needs-validation ${validated ? 'was-validated' : ''}`}
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                      <label className="form-label">Username</label>
                        <input
                          type="text"
                          className={`form-control ${duplicateFields.username ? 'is-duplicate' : ''}`}
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        {duplicateFields.username && (
                          <div className="duplicate-feedback">{duplicateFields.username}</div>
                        )}
                    </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group"> 
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Please enter your password.</div>
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md mb-3">
                    <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${duplicateFields.email ? 'is-duplicate' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {duplicateFields.email && (
                        <div className="duplicate-feedback">{duplicateFields.email}</div>
                      )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Prefix</label>
                    <select
                      className="form-select"
                      name="prefix"
                      value={formData.prefix}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    <div className="invalid-feedback">Please select a prefix.</div>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter your first name.</div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter your last name.</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="2"
                  />
                  <div className="invalid-feedback">Please enter your address.</div>
                </div>

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
                          onChange={handleChange}
                          checked={formData.gender === "Male"}
                          required
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleChange}
                          checked={formData.gender === "Female"}
                        />
                        <label className="form-check-label">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="LGBTQ+"
                          onChange={handleChange}
                          checked={formData.gender === "LGBTQ+"}
                        />
                        <label className="form-check-label">LGBTQ+</label>
                      </div>
                    </div>
                    <div className="invalid-feedback d-block">
                      {validated && !formData.gender && "Please select your gender."}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Birthdate</label>
                    <input
                      type="date"
                      className="form-control"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please select your birthdate.</div>
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">
                    I accept the terms and conditions.
                  </label>
                  <div className="invalid-feedback">
                    You must accept the terms to register.
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-danger w-100 fw-bold d-flex align-items-center justify-content-center"
                  disabled={loading} // 🔒 ห้ามกดซ้ำถ้ากำลังโหลด
                >
                  {loading ? (
                    <>
                      {/* 🌀 Spinner หมุนๆ */}
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span>Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

                <div className="text-center mt-3">
                  Already have an account? <a href="/Login" className="text-decoration-none text-danger">
                    Log In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
            <style jsx>{`
                .is-duplicate {
                    border-color: #ffc107 !important;
                    padding-right: calc(1.5em + 0.75rem) !important;
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23ffc107'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ffc107' stroke='none'/%3e%3c/svg%3e") !important;
                    background-repeat: no-repeat !important;
                    background-position: right calc(0.375em + 0.1875rem) center !important;
                    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
                }

                .duplicate-feedback {
                    width: 100%;
                    margin-top: 0.25rem;
                    font-size: 0.875em;
                    color: #ffb100; /* สีเหลืองเข้มเพื่อให้พอดีกับพื้นหลังขาว */
                }
              }
            `}</style>
      </div>
    </main>

  );
}
