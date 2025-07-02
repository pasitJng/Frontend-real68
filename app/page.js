import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
export default function Home() {
  return (
    <main className="inset-0 flex items-center justify-center bg-gray-900 ">
      <Carousel/>
      <Card/>
      <h1 className="pt-28 text-6xl font-bold text-blue-200 text-center">
        Mr. Pasit Jongngamwilai
      </h1>
    </main>
  );
}