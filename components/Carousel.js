'use client';
import { useEffect } from "react";
import Image from "next/image";

export default function Carousel() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
  <div className="">
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src="/image/slide/slide01.png"
            alt="slide01"
            layout="responsive"
            width={1920}
            height={960}
            priority
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/image/slide/slide02.jpg"
            alt="slide02"
            layout="responsive"
            width={1920}
            height={960}
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/image/slide/slide03.png"
            alt="slide03"
            layout="responsive"
            width={1920}
            height={960}
          />
        </div>
      </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
