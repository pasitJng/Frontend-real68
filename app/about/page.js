'use client';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function About() {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({
        hero: true,
        content: true,
        features: true,
        stats: true
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: "bi-speedometer2",
      title: "Performance Excellence",
      description: "Discover the legendary performance and engineering that makes Ducati motorcycles iconic worldwide."
    },
    {
      icon: "bi-bullseye",
      title: "Racing Heritage",
      description: "Born from our racing DNA, every Ducati carries the spirit of MotoGP champions."
    },
    {
      icon: "bi-tools",
      title: "Italian Craftsmanship",
      description: "Handcrafted in Bologna, Italy with precision and passion that defines excellence."
    },
    {
      icon: "bi-lightning-charge",
      title: "Innovation",
      description: "Cutting-edge technology meets traditional craftsmanship in every model."
    }
  ];

  const stats = [
    { number: "1926", label: "Founded", suffix: "" },
    { number: "50", label: "Countries", suffix: "+" },
    { number: "1000", label: "Dealers", suffix: "+" },
    { number: "17", label: "World Titles", suffix: "" }
  ];

  return (
    <>
      {/* โค้ด JSX ของคุณ */}

      {/* Bootstrap JS แบบ client-side */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive" // โหลดหลังจาก browser มี interaction
      />
      
      <style jsx>{`
        /* Global Reset & Hero Section */
        .hero-section {
          background: linear-gradient(145deg, #dc2626 0%, #000 50%, #dc2626 100%);
          min-height: 100vh;
          position: relative;
          margin-top: -70px !important;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(10px, 10px); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card {
          background: #1a1a1a;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-card:hover {
          border-color: #dc2626;
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
        }

        .stat-item {
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: scale(1.1);
        }

        .stat-number {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pulse 2s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.2); }
        }

        .ducati-logo {
          font-family: 'Arial Black', sans-serif;
          font-weight: 900;
          letter-spacing: 3px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .section-divider {
          height: 4px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .display-1 { font-size: 5rem; }
          .display-4 { font-size: 2.5rem; }
        }

        @media (max-width: 992px) {
          .display-1 { font-size: 4rem; }
          .display-4 { font-size: 2rem; }
          .lead { font-size: 1.1rem; }
        }

        @media (max-width: 768px) {
          .hero-section { min-height: 80vh; padding-top: 2rem; padding-bottom: 2rem; }
          .display-1 { font-size: 3rem; }
          .display-4 { font-size: 1.8rem; }
          .lead { font-size: 1rem; }
          .feature-card { padding: 2rem 1rem; }
        }

        @media (max-width: 576px) {
          .display-1 { font-size: 2.2rem; }
          .display-4 { font-size: 1.5rem; }
          .lead { font-size: 0.9rem; }
          .stat-number { font-size: 2rem; }
          .hero-section { min-height: 70vh; }
          .feature-card { padding: 1.5rem 1rem; }
        }
      `}</style>

      <main>
        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center p-0 m-0">
          <div className="container hero-content">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10">
                <div className={`fade-in-up ${isVisible.hero ? 'visible' : ''}`}>
                  <h1 className="display-1 fw-bold text-white ducati-logo mb-4 floating">
                    DUCATI
                  </h1>
                  <h2 className="h3 text-danger mb-4 text-shadow">
                    PASSION FOR PERFORMANCE
                  </h2>
                  <p className="lead text-white-50 mb-5">
                    This website is created to present Ducati — a world-class motorcycle brand <br />
                    that combines speed, beauty, and true Italian spirit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* About Content */}
        <section className="py-5 bg-black text-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className={`fade-in-up ${isVisible.content ? 'visible' : ''}`}>
                  <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold mb-4">
                      <span className="text-danger">About</span> This Project
                    </h2>
                    <p className="lead text-white-50">
                      This project is part of a study, showcasing Ducati <br />
                      to demonstrate website design that reflects brand identity.
                    </p>
                  </div>

                  <div className="row g-4 mb-5">
                    <div className="col-md-6">
                      <div className="h-100 p-4 bg-dark rounded">
                        <h4 className="text-danger mb-3 bi bi-bullseye me-2"> Objectives</h4>
                        <ul className="text-white-50 list-unstyled">
                          <li className="mb-2">• Learn User Interface design</li>
                          <li className="mb-2">• Practice Bootstrap 5 usage</li>
                          <li className="mb-2">• Learn Responsive Design</li>
                          <li className="mb-2">• Improve Animation and Interaction skills</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 bg-dark rounded">
                        <h4 className="text-danger mb-3 bi bi-laptop me-2"> Technologies</h4>
                        <ul className="text-white-50 list-unstyled">
                          <li className="mb-2">• React & Next.js</li>
                          <li className="mb-2">• Bootstrap 5 Framework</li>
                          <li className="mb-2">• CSS Animations</li>
                          <li className="mb-2">• Responsive Web Design</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Features Section */}
        <section className="py-5 bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <div className={`fade-in-up ${isVisible.features ? 'visible' : ''}`}>
                  <h2 className="display-4 fw-bold text-white mb-3">
                    <span className="text-danger">Why</span> Ducati?
                  </h2>
                  <p className="lead text-white-50">
                    What makes Ducati stand out and be recognized worldwide
                  </p>
                </div>
              </div>
            </div>
            
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <div className={`feature-card rounded-3 p-4 h-100 text-center fade-in-up ${isVisible.features ? 'visible' : ''}`}
                       style={{ transitionDelay: `${index * 0.1}s` }}>
                    <div className="fs-1 mb-3 text-danger">
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h5 className="text-danger fw-bold mb-3">{feature.title}</h5>
                    <p className="text-white-50 mb-0">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Stats Section */}
        <section className="py-5 bg-black">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <div className={`fade-in-up ${isVisible.stats ? 'visible' : ''}`}>
                  <h2 className="display-4 fw-bold text-white mb-3">
                    <span className="text-danger">Ducati</span> by Numbers
                  </h2>
                  <p className="lead text-white-50">
                    Numbers that reflect the greatness of the brand
                  </p>
                </div>
              </div>
            </div>
            
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className={`stat-item text-center fade-in-up ${isVisible.stats ? 'visible' : ''}`}
                       style={{ transitionDelay: `${index * 0.1}s` }}>
                    <div className="stat-number display-1 fw-bold mb-2">
                      {stat.number}{stat.suffix}
                    </div>
                    <p className="text-white-50 fs-5 mb-0">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Bootstrap JS */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
}
