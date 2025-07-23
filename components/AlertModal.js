'use client';

import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Prompt } from "next/font/google";

export default function AlertModal({ visible, onClose }) {
  useEffect(() => {
    // ปิดการ scroll เมื่อ Alert แสดง
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        zIndex: 9999,
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        pointerEvents: 'auto',
      }}
    >
      <Card
        className="shadow-lg"
        style={{
          maxWidth: '50%',
          width: '500px',
          textAlign: 'center',
          borderRadius: '1rem',
          backgroundColor: '#fff1f0',
          fontFamily: 'prompt, sans-serif',
        }}
      >
        <div className="mb-3">
          <CloseCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
        </div>
        <h4 style={{ color: '#a8071a' }}>Error!</h4>
        <p style={{ color: '#a8071a', fontSize: '16px' }}>
          เว็บไซต์กำลังอยู่ระหว่างการพัฒนา ไม่สามารถใช้งานได้ในขณะนี้
        </p>
      </Card>
    </div>
  );
}
