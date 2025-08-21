'use client';
import { useState } from "react";
import Swal from "sweetalert2"; // ✅ นำเข้า sweetalert2
import BannerNotice from "@/components/BannerNotice";
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    fullname: '',
    lastname: '',
    address: '',
    gender: '',
    birthdate: '',
    agree: false
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || !formData.agree || !formData.gender) {
      e.stopPropagation();
      setValidated(true);
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please complete all required fields.',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setValidated(true);

    try {
      const response = await fetch("https://backend-nextjs-virid.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // ถ้ามี Token หรือ Key:
          // "Authorization": "Bearer YOUR_TOKEN"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to register.");
      }

      const result = await response.json();
      console.log(result);

      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: result.message || 'Registration successful.',
        timer: 2000,
        showConfirmButton: false,
      }).then(function () {
        router.push('/Login')
      });

      // รีเซ็ตฟอร์ม
      setFormData({
        username: '',
        password: '',
        firstname: '',
        fullname: '',
        lastname: '',
        address: '',
        gender: '',
        birthdate: '',
        agree: false
      });
      setValidated(false);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return "check-circle-fill";
      case "info":
        return "info-fill";
      case "warning":
      case "danger":
        return "exclamation-triangle-fill";
      default:
        return "info-fill";
    }
  };

  return (
    <main>
      <BannerNotice />

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
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter your username.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter your password.</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Prefix</label>
                    <select
                      className="form-select"
                      name="firstname"
                      value={formData.firstname}
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
                      name="fullname"
                      value={formData.fullname}
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

                <button type="submit" className="btn btn-danger w-100 fw-bold mt-2">
                  Register
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
      </div>
    </main>
  );
}
