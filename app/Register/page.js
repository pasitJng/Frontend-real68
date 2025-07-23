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
  const [alert, setAlert] = useState(null); // Alert message state

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

  if (form.checkValidity() === false || !formData.agree || !formData.gender) {
    e.stopPropagation();
    setValidated(true);
    setAlert({
      type: "warning",
      message: "กรุณากรอกข้อมูลให้ครบถ้วน",
    });
    return;
  }

  setValidated(true);
  setAlert({
    type: "success",
    message: "สมัครสมาชิกสำเร็จ! (Demo)",
  });

  // ✅ รีเซ็ตฟอร์มหลังสมัคร
  setFormData({
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

  // ✅ รีเซ็ต validation
  setValidated(false);
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

      {/* SVG Alert Icons */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 
                   5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 
                   0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 
                   0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.
                   738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 
                   1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 
                   1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 
                   .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 
                   5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      <div className="container mt-5" style={{ maxWidth: "700px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-sm p-3 border-0">
              <h2 className="text-center mb-3 fw-bold text-primary" style={{ fontSize: "1.5rem" }}>
                สมัครสมาชิก
              </h2>

              {/* Alert Message */}
              {alert && (
                <div className={`alert alert-${alert.type} d-flex align-items-center`} role="alert">
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label={alert.type}>
                    <use xlinkHref={`#${getAlertIcon(alert.type)}`} />
                  </svg>
                  <div style={{ whiteSpace: "pre-wrap" }}>{alert.message}</div>
                </div>
              )}

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
                            checked={formData.gender === "ชาย"} // ✅ เพิ่ม checked
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
                            checked={formData.gender === "หญิง"} // ✅ เพิ่ม checked
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
                            checked={formData.gender === "LGBTQ+"} // ✅ เพิ่ม checked
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
    </main>
  );
}
