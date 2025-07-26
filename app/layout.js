'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Prompt } from "next/font/google";

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AlertModal from "@/components/AlertModal";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
    const [alertVisible, setAlertVisible] = useState(true); //*ปิดใช้งาน Alert ให้พิมพ์ false*
  
    const handleClose = () => {
      setAlertVisible(false);
    };

  return (
    <html lang="en">
      <body className={`d-flex flex-column min-vh-100 ${prompt.className}`}>
      <div style={{ marginTop: "70px" }}>
      </div>
        <Navigation />

        {/* ✅ AlertModal จะแสดงในทุกหน้า */}
        <AlertModal visible={alertVisible} onClose={handleClose} />

        <main className="flex-fill">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
