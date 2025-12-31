'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import BannerNotice from "@/components/BannerNotice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.stopPropagation();
    setFormValidated(true);
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete form',
      text: 'Please fill in all required fields',
      timer: 2000,
      showConfirmButton: false,
    });
    return;
  }

  try {
    // 🔹 เรียก API ให้ตรงกับโฟลเดอร์จริง
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    console.log("Response from API:", data);

    if (data.token) {
  // เก็บ token
  localStorage.setItem('token', data.token);

  // เก็บ user (id + name) ไว้ใช้ใน Navbar
const userData = {
        id: data.user?.id || data.user?.UID || "N/A",
        name: data.user?.username || data.user?.fullname || username // ถ้าไม่มีชื่อส่งมา ให้ใช้ username ที่พิมพ์ล็อกอิน
      };

      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log("✅ บันทึกสำเร็จ:", localStorage.getItem('user'));

  Swal.fire({
    icon: 'success',
    title: 'Login successful',
    text: 'Welcome!',
    timer: 900,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "/admin/users"; 
  });
} else if (data.error === "Invalid username or password") {

    } else if (data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: data.error,
        timer: 900,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Unable to connect to server',
    });
  }
  
};



  return (
    <main >
      <BannerNotice />
      <div className="px-3 py-5">
        <div className="container px-3">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-sm border-0 p-4">
                <h2 className="text-center text-danger mb-4 fw-bold" style={{ fontSize: "1.75rem" }}>
                  Log In
                </h2>

                <form
                  noValidate
                  className={`needs-validation ${formValidated ? "was-validated" : ""}`}
                  onSubmit={handleSubmit}
                >
                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                    <div className="invalid-feedback">Please enter your username</div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="invalid-feedback d-block">
                      {formValidated && !password && "Please enter your password"}
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="form-check small mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-danger w-100 fw-bold">
                    Log In
                  </button>

                  {/* Links */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between mt-3 gap-2 text-center text-sm-start">
                    <a href="#" className="text-decoration-none small text-muted">Forgot password?</a>
                    <div className="small">
                      Don't have an account?
                      <a href="/Register" className="text-decoration-none text-danger ms-1">Create an Account</a>
                    </div>
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
