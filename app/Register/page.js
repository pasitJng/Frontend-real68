'use client';
import { useState } from "react";
import BannerNotice from "@/components/BannerNotice";
export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    prefix: '',
    firstname: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || !formData.agree) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    alert("สมัครสมาชิกสำเร็จ (Demo)");
  };

  return (
    <main className="mt-4">
      <BannerNotice />
      <div className="mt-5">
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-sm p-3 border-0">
                <h2 className="text-center mb-3 fw-bold text-primary" style={{ fontSize: "1.5rem" }}>
                  สมัครสมาชิก
                </h2>
                <form
                  noValidate
                  className={`needs-validation ${validated ? 'was-validated' : ''}`}
                  onSubmit={handleSubmit}
                >
                  {/* Row: Username & Password */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ชื่อผู้ใช้</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">กรุณากรอกชื่อผู้ใช้</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">รหัสผ่าน</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">กรุณากรอกรหัสผ่าน</div>
                    </div>
                  </div>

                  {/* Row: Prefix, Firstname, Lastname */}
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">คำนำหน้า</label>
                      <select
                        className="form-select"
                        name="prefix"
                        value={formData.prefix}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- เลือก --</option>
                        <option value="นาย">นาย</option>
                        <option value="นางสาว">นางสาว</option>
                        <option value="นาง">นาง</option>
                      </select>
                      <div className="invalid-feedback">กรุณาเลือกคำนำหน้าชื่อ</div>
                    </div>

                    <div className="col-md-5 mb-3">
                      <label className="form-label">ชื่อ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">กรุณากรอกชื่อ</div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">นามสกุล</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">กรุณากรอกนามสกุล</div>
                    </div>
                  </div>

                  {/* Row: Address */}
                  <div className="mb-3">
                    <label className="form-label">ที่อยู่</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="2"
                    />
                    <div className="invalid-feedback">กรุณากรอกที่อยู่</div>
                  </div>

                  {/* Row: Gender & Birthdate */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">เพศ</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="ชาย"
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label">ชาย</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="หญิง"
                            onChange={handleChange}
                          />
                          <label className="form-check-label">หญิง</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="LGBTQ+"
                            onChange={handleChange}
                          />
                          <label className="form-check-label">LGBTQ+</label>
                        </div>
                      </div>
                      <div className="invalid-feedback d-block">
                        {validated && !formData.gender && "กรุณาเลือกเพศ"}
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">วันเกิด</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">กรุณาเลือกวันเกิด</div>
                    </div>
                  </div>

                  {/* Checkbox */}
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
                      ฉันยอมรับเงื่อนไขและข้อตกลง
                    </label>
                    <div className="invalid-feedback">
                      คุณต้องยอมรับเงื่อนไขก่อนสมัครสมาชิก
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-danger w-100 fw-bold mt-2">
                    สมัครสมาชิก
                  </button>

                  <div className="text-center mt-3">
                    มีบัญชีอยู่แล้ว? <a href="/Login" className="text-decoration-none text-primary">
                      เข้าสู่ระบบ
                    </a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
