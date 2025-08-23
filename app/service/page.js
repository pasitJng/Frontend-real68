'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Service() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBike, setCurrentBike] = useState(0);

  const bikes = [
    {
      image: '/image/Card/PanigaleV2FinalEdition.png',
      name: 'Panigale V2 Final Edition',
      subtitle: 'The Ultimate Expression'
    },
    {
      image: '/image/Card/PanigaleV4.png', 
      name: 'Panigale V4',
      subtitle: 'Pure Performance'
    },
    {
      image: '/image/Card/PanigaleV4Tricolore.png',
      name: 'Panigale V4 Tricolore',
      subtitle: 'Italian Racing Heritage'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate bikes every 4 seconds
    const interval = setInterval(() => {
      setCurrentBike((prev) => (prev + 1) % bikes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [bikes.length]);

  return (
    <main className="service-page">
      <style jsx global>{`
        .service-page {
          font-family: 'Arial', sans-serif;

          color: white;
          overflow-x: hidden;
        }
        
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        
        .video-background {
          position: fixed; /* อยู่ติดหน้าจอเสมอ */
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover; /* ครอบเต็มจอโดยไม่เสียอัตราส่วน */
          z-index: 0; /* ด้านหลัง content ทุกตัว */
          pointer-events: none; /* ไม่รบกวนคลิก */
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 110%;
          background: linear-gradient(
            45deg, 
            rgba(220, 20, 60, 0.8) 0%, 
            rgba(0, 0, 0, 0.7) 50%, 
            rgba(220, 20, 60, 0.6) 100%
          );
          z-index: 2;
        }
        
        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s ease;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 1.2s ease;
        }
        
        .slide-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(100px);
          transition: all 1.2s ease;
        }
        
        .slide-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 2rem;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
          line-height: 1.1;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          font-weight: 300;
        }
        
        .btn-ducati {
          background: linear-gradient(45deg, #dc143c, #8b0000);
          border: none;
          color: white;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(220, 20, 60, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-ducati::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }
        
        .btn-ducati:hover::before {
          left: 100%;
        }
        
        .btn-ducati:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(220, 20, 60, 0.5);
          color: white;
          text-decoration: none;
        }
        
        .bike-showcase {
          position: relative;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bike-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bike-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.8s ease;
        }
        
        .bike-slide.active {
          opacity: 1;
          transform: scale(1);
        }
        
        .bike-slide:not(.active) {
          opacity: 0;
          transform: scale(0.8);
        }
        
        .bike-image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 70%;
          margin-bottom: 20px;
        }
        
        .bike-image {
          max-width: 90%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(220, 20, 60, 0.3));
          transition: all 0.5s ease;
          animation: bikeFloat 6s ease-in-out infinite;
        }
        
        .bike-container:hover .bike-image {
          transform: scale(1.05);
          filter: drop-shadow(0 25px 50px rgba(220, 20, 60, 0.5));
        }
        
        .bike-info {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
          text-align: center;
          pointer-events: none;
          position: relative;
          width: 100%;
          z-index: 5;
        }
        
        .bike-container:hover .bike-info {
          opacity: 1;
          transform: translateY(0);
        }
        
        .bike-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        
        .bike-subtitle {
          font-size: 1rem;
          color: #dc143c;
          font-weight: 400;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        @keyframes bikeFloat {
          0%, 100% { 
            transform: translateY(0px) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-10px) rotateY(5deg); 
          }
          50% { 
            transform: translateY(0px) rotateY(0deg); 
          }
          75% { 
            transform: translateY(-5px) rotateY(-3deg); 
          }
        }
        
        .ducati-red {
          color: #dc143c;
        }
        
        .shimmer-text {
          background: linear-gradient(45deg, #ffffff, #dc143c, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 8px 25px rgba(220, 20, 60, 0.3); 
          }
          50% { 
            box-shadow: 0 15px 40px rgba(220, 20, 60, 0.6); 
          }
        }
        
        /* Responsive Design */
        /* Responsive Design */
@media (max-width: 1400px) {
  .hero-title { font-size: 3.8rem; }
  .hero-subtitle { font-size: 1.45rem; }
  .bike-showcase { height: 420px; }
  .bike-image-wrapper { height: 68%; }
}

@media (max-width: 1200px) {
  .hero-title { font-size: 3.5rem; }
  .hero-subtitle { font-size: 1.3rem; }
  .bike-showcase { height: 380px; }
  .bike-image-wrapper { height: 65%; }
}

@media (max-width: 992px) {
  .hero-title { font-size: 3rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .bike-showcase { height: 320px; margin-top: -20rem; }
  .bike-image-wrapper { height: 60%; }
  .bike-name { font-size: 1.4rem; }
  .bike-subtitle { font-size: 0.85rem; }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; margin-bottom: 1.5rem; }
  .hero-subtitle { font-size: 1.1rem; margin-bottom: 2rem; }
  .btn-ducati { padding: 15px 35px; font-size: 1.1rem; }
  .bike-showcase { height: 280px; margin-top: -20rem; }
  .bike-image-wrapper { height: 55%; }
  .bike-name { font-size: 1.2rem; }
  .bike-subtitle { font-size: 0.8rem; }
}

@media (max-width: 576px) {
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 1rem; }
  .btn-ducati { padding: 12px 30px; font-size: 1rem; }
  .bike-showcase { height: 220px; }
  .bike-image-wrapper { height: 50%; }
  .bike-name { font-size: 1rem; }
  .bike-subtitle { font-size: 0.75rem; }
  .bike-indicators { bottom: 20px; gap: 12px; padding: 12px 20px; }
  .indicator { width: 14px; height: 14px; }
}

@media (max-width: 400px) {
  .hero-title { font-size: 1.8rem; }
  .hero-subtitle { font-size: 0.9rem; }
  .btn-ducati { padding: 10px 25px; font-size: 0.95rem; }
  .bike-showcase { height: 180px; margin-top: -14rem; }
  .bike-image-wrapper { height: 45%; }
  .bike-name { font-size: 0.9rem; }
  .bike-subtitle { font-size: 0.7rem; }
  .bike-indicators { bottom: 15px; gap: 10px; padding: 10px 15px; }
  .indicator { width: 12px; height: 12px; }
}

        
        /* Bike indicators */
        .bike-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 4;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .indicator {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border: 2px solid transparent;
        }
        
        .indicator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          background: #dc143c;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(220, 20, 60, 0.5);
          transform: scale(1.1);
        }
        
        .indicator.active {
          background: transparent;
          border-color: #dc143c;
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(220, 20, 60, 0.6);
        }
        
        .indicator.active::before {
          width: 8px;
          height: 8px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Video Background */}
        <video 
          className="video-background" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/image/Card/PanigaleV2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div className="video-overlay"></div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <div className="container">
            <div className="row align-items-center min-vh-100">
              <div className="col-lg-6 col-md-12 mb-5 mb-lg-0 ">
                <div className={`slide-in-left ${isVisible ? 'visible' : ''}`}>
                  <h1 className="hero-title">
                    Premium <span className="shimmer-text">Ducati</span><br/>
                    <span className="ducati-red">Service</span> Center
                  </h1>
                  <p className="hero-subtitle">
                    Experience excellence with certified Ducati technicians. 
                    Professional maintenance and performance optimization 
                    for your Italian masterpiece.
                  </p>
                  <div className={`fade-in ${isVisible ? 'visible' : ''}`} 
                       style={{animationDelay: '0.8s'}}>
                    <a 
                      href="https://www.ducati.com/th/th/company/customer-service" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-ducati pulse-glow"
                    >
                      Visit Ducati Service
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6 col-md-12">
                <div className={`slide-in-right ${isVisible ? 'visible' : ''}`} 
                     style={{animationDelay: '0.4s'}}>
                  <div className="bike-showcase">
                    <div className="bike-container">
                      {bikes.map((bike, index) => (
                        <div
                          key={index}
                          className={`bike-slide ${index === currentBike ? 'active' : ''}`}
                        >
                          <div className="bike-image-wrapper">
                            <Image
                              src={bike.image}
                              alt={bike.name}
                              width={600}
                              height={300}
                              className="bike-image"
                              priority={index === 0}
                            />
                          </div>
                          <div className="bike-info">
                            <div className="bike-name">{bike.name}</div>
                            <div className="bike-subtitle">{bike.subtitle}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bike Indicators */}
        <div className="bike-indicators">
          {bikes.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentBike ? 'active' : ''}`}
              onClick={() => setCurrentBike(index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}