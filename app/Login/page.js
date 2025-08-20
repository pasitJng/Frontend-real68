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
      // 🔹 เรียก API Route ของเราแทน
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.token) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          text: 'Welcome!',
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/admin/users");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid username or password',
          timer: 2000,
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
    <main>
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
