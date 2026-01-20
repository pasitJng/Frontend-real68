// components/ClientLayout.js
'use client'; // ✅ ใส่ use client ที่นี่แทน

import { useState } from 'react';
import Navigation from './Navigation'; // เช็ค path ให้ถูกนะ
import Footer from './Footer';         // เช็ค path ให้ถูกนะ
import AlertModal from "@/components/AlertModal";

export default function ClientLayout({ children }) {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleClose = () => {
    setAlertVisible(false);
  };

  return (
    <>
        <div style={{ marginTop: "70px" }}></div>
        
        <Navigation />

        <AlertModal visible={alertVisible} onClose={handleClose} />

        <main className="flex-fill">{children}</main>

        <Footer />
    </>
  );
}