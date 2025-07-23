'use client'
import React, { useState } from 'react'
import { Alert } from 'antd'
import Marquee from 'react-fast-marquee'

export default function BannerNotice() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
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
        padding: '12px 16px',
        zIndex: 1,
      }}
      message={
        <Marquee pauseOnHover gradient={false} speed={60}>
          🚧 Login & Register is being developed and improved! — ระบบ Login & Register กำลังพัฒนาและปรับปรุง! 🚧
        </Marquee>
      }
    />
  )
}
