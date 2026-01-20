// app/layout.js

// ❌ ลบ 'use client' ออกจากไฟล์นี้
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Prompt } from "next/font/google";
import ClientLayout from '../components/ClientLayout'; // ✅ เรียกใช้ไฟล์ที่เราแยกไปเมื่อกี้

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ✅ เพิ่มส่วนนี้เพื่อเปลี่ยนชื่อบน Tab Browser
export const metadata = {
  title: "Panigale", // <-- แก้ชื่อตรงนี้
  description: "Collection of Panigale",
  icons: {
    icon: '/favicon.ico', // (ทางเลือก) ถ้ามีรูปไอคอน
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`d-flex flex-column min-vh-100 ${prompt.className}`} style={{ scrollBehavior: "smooth" }}>
        {/* ส่ง children ไปให้ ClientLayout จัดการต่อ */}
        <ClientLayout>
            {children}
        </ClientLayout>
      </body>
    </html>
  );
}