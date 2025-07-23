'use client';
import { useState } from "react";
import BannerNotice from "@/components/BannerNotice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [alert, setAlert] = useState(null); // เก็บ alert ที่จะแสดง

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      setAlert({
        type: "warning",
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    setFormValidated(true);
    setAlert({
      type: "success",
      message: `เข้าสู่ระบบสำเร็จ (Demo)`
    });
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return "check-circle-fill";
      case "info":
        return "info-fill";
      case "warning":
        return "exclamation-triangle-fill";
      case "danger":
        return "exclamation-triangle-fill";
      default:
        return "info-fill";
    }
  };

  return (
    <main>
      <BannerNotice />
      <div className="px-3 py-5">
      {/* SVG Symbols */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      <div className="container" style={{ maxWidth: "480px" }}>
        <div className="card shadow-sm border-0 p-4">
          <h2 className="text-center text-primary mb-4 fw-bold" style={{ fontSize: "1.75rem" }}>
            เข้าสู่ระบบ
          </h2>

          {/* Alert */}
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
              </div>
              <div className="invalid-feedback d-block">
                {formValidated && !password && "กรุณากรอกรหัสผ่าน"}
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
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
      </div>
    </main>
  );
}
