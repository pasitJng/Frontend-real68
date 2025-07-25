'use client';

import { DownOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default function ScrollDown() {
  return (
    <div className="scroll-container">
      <div className="scroll-text">Scroll Down</div>
      <div
        className="scroll-icon animate-bounce"
        onMouseEnter={(e) => e.currentTarget.classList.add('rotate-icon')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('rotate-icon')}
      >
        <DownOutlined className="scroll-icon-arrow text-white" />
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }


        .animate-bounce {
          animation: bounce 1.5s infinite ease-in-out;
        }

        .rotate-icon {
          transform: rotate(180deg);
          transition: transform 0.3s ease-in-out;
        }

        .scroll-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 100px; /* ตำแหน่งจากด้านบนเนื้อหา */
          margin-bottom: 60px; /* กันไม่ให้ชนเนื้อหาล่าง */
          position: absolute;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }

        .scroll-text {
          font-family: 'Prompt', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #dc3545;
          margin-bottom: 8px;
        }


        .scroll-icon {
          width: 48px;
          height: 48px;

          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .scroll-icon-arrow {
          font-size: 22px;
          color: white;
          transition: transform 0.2s ease-in-out;
        }
        

        @media (max-width: 1023px) {
          .scroll-container {
            display: none; /* ซ่อนบนหน้าจอขนาดเล็ก */
          }
        }
      `}</style>
    </div>
  );
}
