'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ id: "", name: "", role: "" });
  
  // 1. ✅ เพิ่ม State เช็คสถานะการโหลด
  const [isLoading, setIsLoading] = useState(true);

  // ✅ ฟังก์ชันตรวจสอบสถานะผู้ใช้จาก Backend (ใช้ /verify)
  useEffect(() => {
    const syncUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setUser({ id: "", name: "", role: "" });
        setIsLoading(false); // ✅ ถ้าไม่มี Token ก็หยุดโหลดทันที
        return;
      }

      try {
        const res = await fetch('https://backend-real68.vercel.app/api/users/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const latestData = await res.json();

          localStorage.setItem("user", JSON.stringify(latestData));

          setIsLoggedIn(true);
          setUser({
            id: latestData.id,
            name: latestData.username || latestData.firstname || "User",
            role: String(latestData.role || "").toLowerCase()
          });

          if (latestData.role.toLowerCase() !== 'admin' && pathname.startsWith('/admin')) {
            router.push('/');
          }

        } else if (res.status === 401 || res.status === 403) {
          handleLogout();
        }
      } catch (error) {
        console.error("Sync failed:", error);
        // กรณี Server มีปัญหา ให้ลองใช้ข้อมูลเก่าจาก Cache
        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          setIsLoggedIn(true);
          setUser({
            id: parsed.id,
            name: parsed.username || parsed.firstname || "User",
            role: String(parsed.role || "").toLowerCase()
          });
        }
      } finally {
        // 2. ✅ ไม่ว่าจะสำเร็จหรือพัง ต้องสั่งหยุดโหลดเสมอ
        setIsLoading(false); 
      }
    };

    syncUserData();
  }, [pathname]); 

  // โหลด Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // ปิด Navbar อัตโนมัติ
  useEffect(() => {
    const closeNavbar = async () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse?.classList.contains("show")) {
        const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
        const collapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser({ id: "", name: "", role: "" });
    router.push("/Login");
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
                  className={`nav-link px-3 rounded-pill ${pathname === href ? "active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 3. ✅ ส่วนแสดงผลที่แก้ใหม่: เช็ค isLoading ก่อนเสมอ */}
          {isLoading ? (
            // แสดง Spinner ระหว่างรอเช็คสถานะ (ขนาดเท่าปุ่ม login เพื่อความเนียน)
            <div className="ms-lg-3 mt-3 mt-lg-0 d-flex justify-content-center align-items-center" style={{ minWidth: "100px", height: "45px" }}>
               <div className="spinner-border text-danger spinner-border-sm" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
            </div>
          ) : isLoggedIn ? (
            <div className="dropdown ms-lg-3 mt-3 mt-lg-0 text-center text-lg-end">
              <button
                className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mx-lg-0"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "45px", height: "45px" }}
              >
                <i className="bi bi-person-fill text-white fs-5"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-custom shadow-lg border-0 rounded-3 p-2"
                aria-labelledby="userDropdown"
              >
                <li className="px-3 py-2 text-center text-lg-start">
                  <p className="mb-1 fw-bold text-danger">
                    <i className="bi bi-person-circle me-2"></i>{user.name}
                  </p>
                  <p className="mb-0 text-muted small">ID: {user.id}</p>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'} mt-1`}>
                    {user.role.toUpperCase()}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link href="/Profile/users" className="dropdown-item fw-bold">
                    <i className="bi bi-person me-2"></i> My Profile
                  </Link>
                </li>

                {user.role === 'admin' && (
                  <li>
                    <Link
                      href="/admin/users"
                      className="dropdown-item d-flex align-items-center text-primary fw-bold"
                    >
                      <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    className="dropdown-item text-danger fw-bold d-flex align-items-center justify-content-center justify-content-lg-start"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/Login" className="text-decoration-none ms-lg-3 mt-3 mt-lg-0 d-block">
              <button className="btn-login-custom rounded-pill px-4 py-2 fw-bold d-flex align-items-center mx-auto mx-lg-0">
                <i className="bi bi-person me-2"></i> Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 991px) {
          .dropdown-menu-custom {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            text-align: center;
            min-width: 220px;
          }
        }
      `}</style>
    </nav>
  );
}