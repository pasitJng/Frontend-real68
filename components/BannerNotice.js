'use client'
import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'
import Marquee from 'react-fast-marquee'


export default function BannerNotice() {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false) // เพิ่ม state เพื่อเช็คการ mount

  useEffect(() => {
    setMounted(true) // จะเปลี่ยนเป็น true เมื่ออยู่บนเบราว์เซอร์แล้วเท่านั้น
  }, [])

  // ถ้ายังไม่ mount (คือยังเป็นฝั่ง server) หรือสั่งปิดไปแล้ว ไม่ต้องแสดงผล
  if (!mounted || !visible) return null

  return (
    <div className="banner-wrapper"> {/* ครอบด้วย div เพื่อล็อคพื้นที่ไว้ */}
      <Alert
        banner
        closable
        type="warning"
        onClose={() => setVisible(false)}
        style={{
          backgroundColor: '#fffbe6',
          border: '1px solid #ffe58f',
          color: '#fa1414ff',
          fontSize: '1rem',
          padding: '15px 15px',
          zIndex: 1,
        }}
        message={
          <Marquee pauseOnHover={false} gradient={false} speed={60}>
          🚧 ลืมรหัสผ่านโปรดติดต่อแอดมิน (ระบบจะส่ง OTP ไปยังอีเมลจำลองสำหรับการทดสอบเท่านั้น) -  Forgot password? Please contact Admin. (OTP is sent to a mock email for testing purposes only). 🚧
          </Marquee>
        }
      />
    </div>
  )
}