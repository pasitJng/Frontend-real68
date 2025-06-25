'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();

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

    closeNavbar(); // หุบเมนูเมื่อ pathname เปลี่ยน
  }, [pathname]); // Trigger ทุกครั้งที่ path เปลี่ยน

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm py-3">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">Frontend</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active text-dark">หน้าแรก</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-dark">เกี่ยวกับ</Link>
            </li>
            <li className="nav-item">
              <Link href="/service" className="nav-link text-dark">บริการ</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-dark">ติดต่อ</Link>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2 rounded-pill" type="search" placeholder="ค้นหา" aria-label="Search" />
            <button className="btn btn-outline-primary rounded-pill" type="submit">ค้นหา</button>
          </form>
        </div>
      </div>
    </nav>
    
  );
}
