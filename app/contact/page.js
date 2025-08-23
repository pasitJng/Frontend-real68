'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, Button, Divider } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function Contact() {
  const videoList = ['/image/Card/TricoloreHero.mp4'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const sourceRef = useRef(null);

  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % videoList.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const video = videoRef.current;
    const source = sourceRef.current;

    if (video && source) {
      source.src = videoList[currentIndex];
      video.load();

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play interrupted:', error);
        });
      }
    }
  }, [currentIndex]);

  return (
    <main
      className="position-relative overflow-hidden"
      style={{
        fontFamily: "'Prompt', sans-serif",
        margin: 0,
        padding: 0,
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        onEnded={handleVideoEnd}
        className="position-fixed top-0 start-0 w-100 h-100 object-fit-cover"
        style={{ zIndex: -1, filter: 'brightness(0.5)' }}
      >
        <source ref={sourceRef} src={videoList[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* UI Content */}
      <div className="container-fluid position-relative z-1 text-white px-3 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <Card
              variant="borderless"
              className="shadow-lg rounded-4 p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                textAlign: 'center',
                fontFamily: "'Prompt', sans-serif",
              }}
            >
              <h1
                className="fw-bold text-danger mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  lineHeight: 1.3,
                }}
              >
                Visit Ducati Official Website
              </h1>

              <Link href="https://www.ducati.com/th/th/home" target="_blank">
                <Button
                  type="primary"
                  size="large"
                  icon={<GlobalOutlined />}
                  className="rounded-pill w-100 w-sm-auto shadow-sm"
                  style={{
                    backgroundColor: '#d90429',
                    borderColor: '#d90429',
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    fontFamily: "'Prompt', sans-serif",
                    padding: '10px 20px',
                    transition: 'all 0.3s ease-in-out',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#a00320';
                    e.currentTarget.style.borderColor = '#a00320';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#d90429';
                    e.currentTarget.style.borderColor = '#d90429';
                  }}
                >
                  Go to Official Website
                </Button>
              </Link>

              <Divider className="mt-5" />

              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 'clamp(10px, 1.6vw, 13px)',
                  lineHeight: 1.5,
                }}
              >
                *เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและโปรเจกต์ส่วนตัวเท่านั้น<br />
                Ducati และ Ducati Panigale เป็นเครื่องหมายการค้าและลิขสิทธิ์ของ Ducati Motor Holding S.p.A. © All rights reserved.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
