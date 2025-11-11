"use client";
import Link from "next/link";

export default function Navbar() {
  
  
  return (
    <nav className="bg-blue-800 text-white p-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link href={'/'} className="text-2xl font-bold hero-text">
          GO(A)T
        </Link>

        <ul className="flex space-x-6">
          <Link
          href={'/'}
            className="bg-emerald-500 rounded-full text-white font-semibold py-2 px-4  shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out items-center  justify-between"
          >
            King&apos;s Landing
          </Link>
          <Link
            href="/warriors"
            className="bg-emerald-500 rounded-full text-white font-semibold py-2 px-4  shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out items-center  justify-between"
          >
            Warriors
          </Link>
          <Link
            href="/targaryen"
            className="bg-emerald-500 rounded-full text-white font-semibold py-2 px-4  shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out items-center  justify-between"
          >
            Targaryen
          </Link>
          <Link
        href="/lookalikecam"
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white font-semibold py-3 px-6 shadow-lg transition-all duration-300 hover:from-yellow-400 hover:to-orange-500"
      >
        Match Your Character
      </Link>
        </ul>
      </div>
    </nav>
  );
}


