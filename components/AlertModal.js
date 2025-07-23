'use client';

import React, { useEffect } from 'react';
import { Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export default function AlertModal({ visible, onClose }) {
  useEffect(() => {
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px', // กันไม่ให้ติดขอบมือถือ
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ width: '100%', maxWidth: '500px' }} // รองรับจอเล็ก
      >
        <Card
          className="shadow-lg"
          style={{
            width: '100%',
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
            This website is currently under development and is temporarily unavailable.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
