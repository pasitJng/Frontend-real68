'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import './navbar.css'; // หรือ '../styles/navbar.css' แล้วแต่ path


export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm py-3">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
          Frontend
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link text-dark px-3 rounded-pill ${
                  pathname === "/" ? "active fw-bold text-primary" : "hover:text-primary hover:bg-light"
                }`}
              >
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link text-dark px-3 rounded-pill ${
                  pathname === "/about" ? "active fw-bold text-primary" : "hover:text-primary hover:bg-light"
                }`}
              >
                เกี่ยวกับ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/service"
                className={`nav-link text-dark px-3 rounded-pill ${
                  pathname === "/service" ? "active fw-bold text-primary" : "hover:text-primary hover:bg-light"
                }`}
              >
                บริการ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link text-dark px-3 rounded-pill ${
                  pathname === "/contact" ? "active fw-bold text-primary" : "hover:text-primary hover:bg-light"
                }`}
              >
                ติดต่อ
              </Link>
            </li>
          </ul>

          <form className="d-flex flex-grow-1 flex-lg-grow-0 me-3 my-2 my-lg-0" role="search" style={{ maxWidth: "300px" }}>
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="ค้นหา"
              aria-label="Search"
            />
          </form>
          <button className="btn btn-outline-primary rounded-pill me-3 my-2 my-lg-0 px-4 fw-semibold" type="submit">
            ค้นหา
          </button>

          <Link href="/Login" className="text-decoration-none">
            <button className="btn-login-custom rounded-pill px-4 py-2 fw-bold d-flex align-items-center">
              <i className="bi bi-person me-2"></i>
              Login
            </button>
          </Link>
        </div>
      </div>

    </nav>
  );
}
