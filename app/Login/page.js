'use client';
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      return;
    }

    setFormValidated(true);
    alert(`เข้าสู่ระบบสำเร็จ (Demo)\nจำรหัสผ่าน: ${rememberMe ? "ใช่" : "ไม่ใช่"}`);
  };

  return (
    <main className="px-3 py-5">
      <div className="container" style={{ maxWidth: "480px" }}>
        <div className="card shadow-sm border-0 p-4">
          <h2 className="text-center text-primary mb-4 fw-bold" style={{ fontSize: "1.75rem" }}>
            เข้าสู่ระบบ
          </h2>
          <form
            noValidate
            className={`needs-validation ${formValidated ? "was-validated" : ""}`}
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">ชื่อผู้ใช้</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                required
              />
              <div className="invalid-feedback">กรุณากรอกชื่อผู้ใช้</div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">รหัสผ่าน</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
                <div className="invalid-feedback d-block">
                  {formValidated && !password && "กรุณากรอกรหัสผ่าน"}
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                จดจำรหัสผ่าน
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              เข้าสู่ระบบ
            </button>

            {/* Links */}
            <div className="d-flex justify-content-between mt-3">
              <a href="#" className="text-decoration-none small text-muted">ลืมรหัสผ่าน?</a>
              <a href="/Register" className="text-decoration-none small text-primary">สมัครสมาชิก</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
