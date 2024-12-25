// app/tribute/components/About.jsx
"use client"
import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around py-16 px-6 text-white">
      <div className="max-w-md text-center md:text-left">
        <h2 className="text-4xl font-semibold mb-4">About Emilia Clarke</h2>
        <p className="text-lg">
          Known for her iconic portrayal of Daenerys Targaryen, Emilia Clarke
          captured our hearts with her incredible performance and unyielding
          determination.
        </p>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <Image
          src="/e1.jpg"
          alt="Emilia Clarke"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
