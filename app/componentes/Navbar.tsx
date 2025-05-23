import Link from "next/link";
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-6 md:px-32">
      <div className="text-white gap-2 flex flex-row text-2xl font-medium">
        <img src={"/Circle.svg"} alt="circle-icon" />
        GlobeTrotter
      </div>
      <div className="hidden md:flex items-center gap-12">
        <Link href="#" className="text-white hover:text-gray-200">
          Servicios
        </Link>
        <Link href="#" className="text-white hover:text-gray-200">
          Precios
        </Link>
        <Link href="#" className="text-white hover:text-gray-200">
          Contáctanos
        </Link>
        <Link
          href="/#"
          className=" bg-black text-white px-6 py-2 rounded-full
              transition ease-in-out duration-300
              hover:bg-opacity-80 hover:scale-105 hover:shadow-lg"
        >
          Regístrate
        </Link>
      </div>
    </nav>
  );
};
