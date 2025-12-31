'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motorcycles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const motorcycles = [
    {
      id: 1,
      name: "Panigale V2 Final Edition",
      image: "/image/Card/PanigaleV2FinalEdition.png",
      description: "The ultimate expression of the V2 legacy with advanced electronics and refined performance",
      specs: {
        engine: "955cc L-Twin Desmodromic",
        power: "155 HP @ 10,750 rpm",
        torque: "104 Nm @ 9,000 rpm",
        weight: "200 kg (dry)",
        topSpeed: "280 km/h"
      }
    },
    {
      id: 2,
      name: "Panigale V4",
      image: "/image/Card/PanigaleV4.png",
      description: "Pure racing DNA in street-legal form with MotoGP-derived technology",
      specs: {
        engine: "1103cc V4 Desmodromic",
        power: "214 HP @ 13,000 rpm",
        torque: "124 Nm @ 10,000 rpm",
        weight: "198 kg (dry)",
        topSpeed: "300+ km/h"
      }
    },
    {
      id: 3,
      name: "Panigale V4 Tricolore",
      image: "/image/Card/PanigaleV4Tricolore.png",
      description: "Limited edition Italian masterpiece celebrating racing heritage",
      specs: {
        engine: "1103cc V4 Desmodromic",
        power: "214 HP @ 13,000 rpm",
        torque: "124 Nm @ 10,000 rpm",
        weight: "198 kg (dry)",
        topSpeed: "300+ km/h"
      }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % motorcycles.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + motorcycles.length) % motorcycles.length);
  };
  const openModal = (bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  return (
    <div className="bg-black text-white">
      <style jsx global>{`
:root {
  --ducati-red: #dc2626;
  --ducati-dark: #111111;
  --ducati-gray: #1f1f1f;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Arial', sans-serif;
  background: var(--ducati-dark);
  color: white;
}
/* Hero Section */
.hero-section {
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

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
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 107.95%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(220, 38, 38, 0.3) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 2;
}
.hero-content {

  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}
.main-title {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  background: linear-gradient(45deg, #ffffff, var(--ducati-red));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  animation: titleGlow 2s ease-in-out infinite alternate;
}
.subtitle {
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  color: var(--ducati-red);
  font-weight: 300;
  letter-spacing: 0.3em;
  text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
  animation: pulse 3s ease-in-out infinite;
}
@keyframes titleGlow {
  0% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
  100% { text-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.3); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.floating-icon {
  position: absolute;
  color: var(--ducati-red);
  font-size: 2.5rem;
  opacity: 0.2;
  animation: float 8s ease-in-out infinite;
}
.floating-icon:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
.floating-icon:nth-child(2) { top: 25%; right: 15%; animation-delay: 2s; }
.floating-icon:nth-child(3) { bottom: 25%; left: 20%; animation-delay: 4s; }
.floating-icon:nth-child(4) { bottom: 15%; right: 10%; animation-delay: 1.5s; }
.floating-icon:nth-child(5) { top: 50%; left: 5%; animation-delay: 3s; }
.floating-icon:nth-child(6) { top: 60%; right: 8%; animation-delay: 0.5s; }
@keyframes float {
  0%,100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
  25% { transform: translateY(-30px) rotate(5deg); opacity: 0.4; }
  50% { transform: translateY(-20px) rotate(-5deg); opacity: 0.3; }
  75% { transform: translateY(-40px) rotate(3deg); opacity: 0.5; }
}
/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  animation: bounce 2s infinite;
  cursor: pointer;
}
.scroll-indicator i {
  font-size: 2rem;
  color: var(--ducati-red);
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
}
@keyframes bounce {
  0%,20%,50%,80%,100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-15px); }
  60% { transform: translateX(-50%) translateY(-8px); }
}
/* Carousel Section */
.carousel-section {
  background: linear-gradient(135deg, var(--ducati-gray) 0%, var(--ducati-dark) 100%);
  padding: 5rem 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.carousel-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.carousel-slide {
  display: none;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.6s ease;
}
.carousel-slide.active {
  display: block;
  opacity: 1;
  transform: translateX(0);
  animation: slideIn 0.6s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(50px) scale(0.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
.croausel-card {
  background: linear-gradient(145deg, var(--ducati-gray), #0d0d0d);
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.4s ease;
  position: relative;
}
.carousel-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 25px;
  padding: 2px;
  background: linear-gradient(45deg, var(--ducati-red), transparent, var(--ducati-red));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.carousel-card:hover::before { opacity: 1; }
.carousel-card:hover {
  box-shadow: 0 25px 50px rgba(220, 38, 38, 0.3);
}
.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(3, 3, 3, 0.9);
  border: none;
  color: white;
  width: 60px; height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}
.carousel-controls:hover {
  background: var(--ducati-red);
  transform: translateY(-50%) scale(1.2);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.5);
}
.carousel-prev { left: -30px; }
.carousel-next { right: -30px; }
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 10rem;
}
.carousel-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.carousel-dot.active {
  background: var(--ducati-red);
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(220, 38, 38, 0.6);
}
.carousel-dot::after {
  content: '';
  position: absolute;
  top: -5px; left: -5px; right: -5px; bottom: -5px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
}
.carousel-dot.active::after {
  border-color: var(--ducati-red);
  animation: ripple 1.5s infinite;
}
@keyframes ripple { 0% { transform: scale(1); opacity:1;} 100% { transform: scale(1.5); opacity:0;} }
/* Card Styles */
.motorcycle-card {
  background: linear-gradient(145deg, var(--ducati-gray), #0d0d0d);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  height: 100%;
  border: 2px solid transparent;
  position: relative;
}
.motorcycle-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220,38,38,0.1), transparent);
  transition: left 0.8s ease;
}
.motorcycle-card:hover::before { left: 100%; }
.motorcycle-card:hover {
  transform: translateY(-20px) scale(1.03);
  border-color: var(--ducati-red);
  box-shadow: 0 30px 60px rgba(220,38,38,0.4);
}
.card-image-container {
  height: 280px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.motorcycle-card:hover .card-image { transform: scale(1.15) rotate(2deg); }
.card-content { padding: 2rem; justify-content: center; align-items: center; }
.card-title {
  font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 0.8rem;
  position: relative;
}
.card-title::after {
  content: '';
  position: absolute; bottom: -5px; left:0;
  width: 0; height: 2px;
  background: var(--ducati-red);
  transition: width 0.4s ease;
}
.motorcycle-card:hover .card-title::after { width: 100%; }
.card-description { color: #ccc; margin-bottom: 1.5rem; line-height: 1.6; }
.specs-list { list-style: none; margin-bottom: 2rem; }
.specs-list li {
  display: flex; align-items:center;
  color:#bbb; margin-bottom:0.5rem; padding:0.3rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.specs-list li i { color: var(--ducati-red); margin-right:0.8rem; font-size:1.1rem; }
.btn-custom {
  background: linear-gradient(135deg, var(--ducati-red), #b91c1c);
  border:none; color:white; padding:0.8rem 2rem;
  border-radius:50px; font-weight:600; transition: all 0.4s ease;
  position: relative; overflow:hidden; text-transform: uppercase;
  letter-spacing: 0.5px;
}
.btn-custom::before {
  content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition:left 0.6s ease;
}
.btn-custom:hover::before { left:100%; }
.btn-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(220,38,38,0.5);
  background: linear-gradient(135deg, #ef4444, var(--ducati-red));
}
/* Section Styles */
.section-title {
  font-size: 3.5rem; font-weight:900; text-align:center; margin-bottom:4rem;
  position:relative;
  background: linear-gradient(45deg, white, var(--ducati-red));
  background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color: transparent;
}
.section-title::after {
  content:''; position:absolute; bottom:-15px; left:50%;
  transform: translateX(-50%);
  width:120px; height:4px;
  background: linear-gradient(90deg, var(--ducati-red), white, var(--ducati-red));
  border-radius:2px;
}
/* Cards Section */
.cards-section {
  background: linear-gradient(135deg, var(--ducati-dark) 0%, var(--ducati-gray) 50%, var(--ducati-dark) 100%);
  padding:6rem; position:relative;
}
/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, var(--ducati-red) 0%, #7c1d1d 50%, var(--ducati-dark) 100%);
  padding:5rem 0; position:relative;
}
.stat-item { text-align:center; padding:2rem; transition: transform 0.3s ease; }
.stat-item:hover { transform: translateY(-10px); }
.stat-item i { font-size:4rem; margin-bottom:1rem; color:white; text-shadow:0 0 20px rgba(255,255,255,0.3); }
.stat-number { font-size:3rem; font-weight:900; color:white; text-shadow:0 0 10px rgba(255,255,255,0.5); }
.stat-label { font-size:1.1rem; font-weight:300; letter-spacing:2px; color:rgba(255,255,255,0.9); }
/* Modal Styles */
.modal-overlay {
  position: fixed; top:
0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index:1000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px); }
.modal-content {
background: linear-gradient(145deg, var(--ducati-gray), #0d0d0d);
border-radius:25px;
max-width:800px;
width:90%;
max-height:90vh;
overflow-y:auto;
border:2px solid var(--ducati-red);
animation: modalSlideIn 0.4s ease-out;
}
@keyframes modalSlideIn {
from { opacity:0; transform:scale(0.8) translateY(50px);}
to { opacity:1; transform:scale(1) translateY(0);}
}
.modal-close {
position:absolute;
top:1rem; right:1rem;
background: var(--ducati-red);
border:none; color:white;
width:40px; height:40px;
border-radius:50%;
font-size:1.2rem;
cursor:pointer;
transition: all 0.3s ease;
z-index:10;
}
.modal-close:hover { background:#ef4444; transform: rotate(90deg) scale(1.1); }
/* Animations /
.fade-in { opacity:0; transform:translateY(50px); animation: fadeInUp 0.8s ease forwards; }
@keyframes fadeInUp { to { opacity:1; transform:translateY(0);} }
.stagger-1 { animation-delay:0.1s; }
.stagger-2 { animation-delay:0.3s; }
.stagger-3 { animation-delay:0.5s; }
/ Responsive Design */
@media (max-width: 1200px) {
.hero-overlay {   height: 108%; }
.carousel-card { flex-direction: column; }
.card-image-container { height:250px; }
.card-content { padding:1.5rem; }
}
@media (max-width: 992px) {
.hero-overlay {   height: 108%; }
.main-title { font-size: 6rem; }
.subtitle { font-size: 1.8rem; }
.section-title { font-size:2.8rem; }
.carousel-controls { width:50px; height:50px; font-size:1.2rem; }
.carousel-prev { left:10px; }
.carousel-next { right:10px; }
.card-image-container { height:220px; }
.card-title { font-size:1.3rem; }
.stat-item i { font-size:3.5rem; }
.stat-number { font-size:2.5rem; }
}
@media (max-width: 768px) {
.hero-content { padding:0 1rem; }
.hero-overlay {   height: 108%; }
.carousel-container { padding:0 1rem; }
.carousel-indicators { margin-bottom: 3rem}
.cards-section { padding:4rem 1rem; }
.stats-section { padding:4rem 1rem; }
.carousel-slide { flex-direction: column; }
.card-image-container { height:300px; }
.card-title { font-size:1.2rem; }
.card-description { font-size:0.9rem; }
.specs-list li { font-size:0.85rem; }
.stat-item i { font-size:3rem; }
.stat-number { font-size:2rem; }
}
@media (max-width: 576px) {
.hero-overlay {   height: 110.5%; }
.main-title { font-size:4rem; }
.subtitle { font-size:1.2rem; }
.section-title { font-size:2rem; }
.carousel-controls { width:40px; height:40px; font-size:1rem; }
.card-image-container { height:230px; }
.card-title { font-size:1rem; }
.card-description { font-size:0.8rem; }
.specs-list li { font-size:0.75rem; }
.stat-item i { font-size:2.5rem; }
.stat-number { font-size:1.8rem; }
}
@media (max-width: 400px) {

.main-title { font-size:3.2rem; }
.subtitle { font-size:1rem; }
.section-title { font-size:1.6rem; }
.carousel-controls { width:35px; height:35px; font-size:0.9rem; }
.carousel-indicators { margin-bottom: 3.5rem}
.card-image-container { height:210px; }
.card-title { font-size:0.9rem; }
.card-description { font-size:0.75rem; }
.specs-list li { font-size:0.7rem; }
.stat-item i { font-size:2rem; }
.stat-number { font-size:1.5rem; }
}
`}</style>
  {/* Hero Section */}
  <section className="hero-section">
    <video className="video-background" autoPlay muted loop playsInline>
      <source src="/image/Card/session2.mp4" type="video/mp4" />
    </video>
    <div className="hero-overlay"></div>
    <div className="floating-elements">
      <i className="bi bi-lightning-charge floating-icon"></i>
      <i className="bi bi-speedometer2 floating-icon"></i>
      <i className="bi bi-gear-fill floating-icon"></i>
      <i className="bi bi-trophy-fill floating-icon"></i>
      <i className="bi bi-fuel-pump floating-icon"></i>
      <i className="bi bi-shield-check floating-icon"></i>
    </div>
    <div className="hero-content">
      <h1 className="main-title">DUCATI</h1>
      <p className="subtitle">RACING PASSION</p>
    </div>
    <div className="scroll-indicator" onClick={() => document.querySelector('.carousel-section').scrollIntoView({ behavior: 'smooth' })}>
      <i className="bi bi-chevron-double-down"></i>
    </div>
  </section>

  {/* Carousel Section */}
  <section className="carousel-section">
    <div className="container">
      <h2 className="section-title fade-in">MODELS</h2>
      <div className="carousel-container">
        <button className="carousel-controls carousel-prev" onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="carousel-controls carousel-next" onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {motorcycles.map((bike, index) => (
              <div key={bike.id} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <div className="carousel-card">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-6">
                      <div className="card-image-container">
                        <img src={bike.image} alt={bike.name} className="card-image" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card-content">
                        <h3 className="card-title">{bike.name}</h3>
                        <p className="card-description">{bike.description}</p>
                        <button className="btn btn-custom w-100" onClick={() => openModal(bike)}>
                          <i className="bi bi-info-circle me-2"></i> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="carousel-indicators">
          {motorcycles.map((_, index) => (
            <span key={index} className={`carousel-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div>
    </div>
  </section>

  {/* Cards Section */}
  <section className="cards-section">
    <div className="container">
      <h2 className="section-title fade-in">COLLECTION</h2>
      <div className="row g-4">
        {motorcycles.map((bike, index) => (
          <div key={bike.id} className={`col-lg-4 col-md-6 fade-in stagger-${index + 1}`}>
            <div className="motorcycle-card">
              <div className="card-image-container">
                <img src={bike.image} alt={bike.name} className="card-image" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{bike.name}</h3>
                <p className="card-description">{bike.description}</p>
                <ul className="specs-list">
                  <li><i className="bi bi-cpu"></i> {bike.specs.engine}</li>
                  <li><i className="bi bi-lightning-charge"></i> {bike.specs.power}</li>
                  <li><i className="bi bi-speedometer2"></i> {bike.specs.topSpeed}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="stats-section">
    <div className="container">
      <div className="row">
        <div className="col-md-3 fade-in stagger-1">
          <div className="stat-item">
            <i className="bi bi-speedometer2"></i>
            <div className="stat-number">320</div>
            <div className="stat-label">KM/H</div>
          </div>
        </div>
        <div className="col-md-3 fade-in stagger-2">
          <div className="stat-item">
            <i className="bi bi-trophy-fill"></i>
            <div className="stat-number">25</div>
            <div className="stat-label">RACES WON</div>
          </div>
        </div>
        <div className="col-md-3 fade-in stagger-3">
          <div className="stat-item">
            <i className="bi bi-people-fill"></i>
            <div className="stat-number">500</div>
            <div className="stat-label">RIDER COMMUNITY</div>
          </div>
        </div>
        <div className="col-md-3 fade-in stagger-1">
          <div className="stat-item">
            <i className="bi bi-cpu"></i>
            <div className="stat-number">100+</div>
            <div className="stat-label">ENGINE MODELS</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Modal */}
  {showModal && selectedBike && (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
        <div className="card-image-container">
          <img src={selectedBike.image} alt={selectedBike.name} className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{selectedBike.name}</h3>
          <p className="card-description">{selectedBike.description}</p>
          <ul className="specs-list">
            <li><i className="bi bi-cpu"></i> {selectedBike.specs.engine}</li>
            <li><i className="bi bi-lightning-charge"></i> {selectedBike.specs.power}</li>
            <li><i className="bi bi-speedometer2"></i> {selectedBike.specs.topSpeed}</li>
            <li><i className="bi bi-weight"></i> {selectedBike.specs.weight}</li>
            <li><i className="bi bi-gear-fill"></i> {selectedBike.specs.torque}</li>
          </ul>
        </div>
      </div>
    </div>
  )}
</div>
  );
}