'use client';
import { useState, useEffect } from 'react';

export default function Footer() {
  
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-light border-top mt-5">
      <div className="d-flex justify-content-center mt-2 gap-4">
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
        <p className="footer-text text-muted mb-1">
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
          color: #dc3545;
        }

        .footer-text {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-text {
            font-size: 0.8rem;
          }
          .social-icon {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-text {
            font-size: 0.75rem;
          }
          .social-icon {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </footer>
  );
}
