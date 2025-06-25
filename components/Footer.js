'use client';
export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
        <div className="d-flex justify-content-center mt-4 gap-4">
          <a
            href="https://www.facebook.com/ph.sis.th.746802"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Facebook"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/shogxnnnn/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://github.com/pasitJng"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
      <div className="container text-center py-2">
        <p className="text-muted mb-3" style={{ fontSize: '1rem' }}>
          © {new Date().getFullYear()} Frontend. All rights reserved.
        </p>
       </div>

      <style jsx>{`
        .social-icon {
          color: #6c757d;
          font-size: 1.2rem;
          transition: color 0.4s ease;
        }

        .social-icon:hover {
          color: #dc3545; /* สีแดง Bootstrap (danger) */
        }
      `}</style>
    </footer>
  );
}
