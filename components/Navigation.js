'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบว่า login แล้วหรือยัง
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // โหลด Bootstrap
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // ปิด Navbar เมื่อเปลี่ยนหน้า
  useEffect(() => {
    const closeNavbar = async () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
        const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        collapseInstance.hide();
      }
    };

    closeNavbar();
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 20) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem("token");  // ลบ token
    setIsLoggedIn(false);
    router.push("/Login"); // redirect ไปหน้า Login
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top py-3">
      <div className="container-fluid px-4">
        <Link href="/" className="navbar-brand fw-bold text-danger fs-4">
          Panigale
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/service", label: "Service" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link px-3 rounded-pill ${
                    pathname === href ? "active" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ถ้า login แล้วให้แสดง Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn-login-custom rounded-pill px-4 py-2 fw-bold d-flex align-items-center mx-auto mx-lg-0"
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          ) : (
            <Link
              href="/Login"
              className="text-decoration-none ms-lg-3 mt-3 mt-lg-0 d-block"
            >
              <button className="btn-login-custom rounded-pill px-4 py-2 fw-bold d-flex align-items-center mx-auto mx-lg-0">
                <i className="bi bi-person me-2"></i>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
