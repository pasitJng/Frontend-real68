'use client';
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    detail: ''
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || formData.password !== formData.confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    alert("สมัครสมาชิกสำเร็จ (Demo)");
  };

  return (
    <main className="bg-light d-flex align-items-center justify-content-center min-vh-100 px-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg p-4 border-0">
              <h2 className="text-center mb-4 fw-bold text-primary">สมัครสมาชิก</h2>
              <form
                noValidate
                className={`needs-validation ${validated ? 'was-validated' : ''}`}
                onSubmit={handleSubmit}
              >
                {/* Username */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="ชื่อผู้ใช้"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">กรุณากรอกชื่อผู้ใช้</div>
                </div>

                {/* Nickname */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-card-text"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="nickname"
                    placeholder="ชื่อเล่น"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">กรุณากรอกชื่อเล่น</div>
                </div>

                {/* Email */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="อีเมล"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">กรุณากรอกอีเมลให้ถูกต้อง</div>
                </div>

                {/* Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="รหัสผ่าน"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">กรุณากรอกรหัสผ่าน</div>
                </div>

                {/* Confirm Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-shield-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${validated && formData.password !== formData.confirmPassword ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    placeholder="ยืนยันรหัสผ่าน"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    รหัสผ่านไม่ตรงกัน
                  </div>
                </div>

                {/* Detail (textarea) */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-geo-alt-fill"></i>
                  </span>
                  <textarea
                    type="address"
                    className="form-control"
                    name="address"
                    placeholder="ที่อยู่ของคุณ"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">กรุณากรอกที่อยู่</div>
                </div>



                <button type="submit" className="btn btn-danger w-100 fw-bold mt-4">
                  สมัครสมาชิก
                </button>

                <div className="text-center mt-3">
                  <a href="/Login" className="text-decoration-none small text-primary">มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
