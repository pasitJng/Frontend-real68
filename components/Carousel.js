'use client';
import { useEffect } from "react";
import Image from "next/image";
export default function Carousel() {

    useEffect(( )=>{
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    },[]);
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/image/slide/slide01.png"
              className="d-block w-100"
              alt="slide01" height={960} width={1920}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/image/slide/slide02.jpg"
              className="d-block w-100"
              alt="slide02" height={960} width={1920}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/image/slide/slide03.png"
              className="d-block w-100"
              alt="slide03" height={960} width={1920}
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
    </>
  );
}
