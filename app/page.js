'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
 import BannerNotice from "@/components/BannerNotice";
import AlertModal from "@/components/AlertModal"; // เปลี่ยนชื่อให้ตรงกัน

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(true); //*ปิดใช้งาน Alert ให้พิมพ์ false*

  const handleClose = () => {
    setAlertVisible(false);
  };
  
  return (
    <div>
      <AlertModal visible={alertVisible} onClose={handleClose} />
      <main className="inset-0 flex items-center justify-center bg-gray-900">
        <Carousel />
        <Card />
        <h1 className="pt-28 text-6xl font-bold text-blue-200 text-center">
          Mr. Pasit Jongngamwilai
        </h1>
      </main>
    </div>
  );
}
