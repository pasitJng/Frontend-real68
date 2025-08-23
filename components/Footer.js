'use client';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="session-footer bg-dark text-light border-top  pt-4 pb-2">
      <div className="d-flex justify-content-center mb-3 gap-4">-
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
        -
      </div>

      <div className="container text-center">
        <p className="footer-text text-secondary mb-3 ">
          © {year} Panigale Project "Fontend68".
          All rights reserved.
        </p>
      </div>

      <style jsx>{`

        .session-footer {
          z-index: 10;
          }    
        .social-icon {
          color: #f8f9fa;
          font-size: 1.2rem;
          transition: transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .social-icon:hover {
          color: #dc3545;
          transform: scale(1.1);
        }

        .footer-text {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .footer-text {
            font-size: 0.8rem;
          }
          .social-icon {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .footer-text {
            font-size: 0.75rem;
          }
          .social-icon {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </footer>
  );
}
