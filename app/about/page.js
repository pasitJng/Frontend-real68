import Image from "next/image";
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-200 text-center">
        About page
      </h1>

      <p className="text-sm font-bold text-blue-200 text-center mt-2">
        This is - About page
      </p>
    </main>
  );
}