'use client'
export default function Card() {
  return (
    <main className="container-fluid position-relative p-0">

      {/* Background Video */}
      <video
        className="video-bg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/image/Card/session2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="content-overlay container my-4 position-relative">
        {/* Heading */}
        <div className="row">
          <div className="col">
            <h3 className="pt-5 text-center text-white">
              Panigale!
            </h3>
          </div>
        </div>

        {/* Cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {/* Card 1 */}
          <div className="col">
            <div className="card hover-card">
              <div className="overflow-hidden">
                <img
                  src="/image/Card/babyLeo.png"
                  className="card-img-top hover-zoom"
                  alt="เด็กโหด 1"
                />
              </div>
              <div className="card-body text-center">
                <p className="card-text text-white">รูปของเด็กโหด.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col">
            <div className="card hover-card">
              <div className="overflow-hidden">
                <img
                  src="/image/Card/babyLeo.png"
                  className="card-img-top hover-zoom"
                  alt="เด็กโหด 2"
                />
              </div>
              <div className="card-body text-center">
                <p className="card-text text-white">รูปของเด็กโหด.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col">
            <div className="card hover-card">
              <div className="overflow-hidden">
                <img
                  src="/image/Card/babyLeo.png"
                  className="card-img-top hover-zoom"
                  alt="เด็กโหด 3"
                />
              </div>
              <div className="card-body text-center">
                <p className="card-text text-white">รูปของเด็กโหด.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .video-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -1;
        }

        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
        }

        .hover-zoom {
          transition: transform 0.5s ease;
        }

        .hover-card:hover .hover-zoom {
          transform: scale(1.05);
        }

        .card {
          background-color: rgba(0, 0, 0, 0.6);
          border: none;
        }

        .card-text, h3 {
          color: white;
        }
      `}</style>
    </main>
  );
}
