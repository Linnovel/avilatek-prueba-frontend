// src/app/components/Navbar.tsx
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-6 md:px-32">
      <div className="text-white text-2xl font-medium">GlobeTrotter</div>
      <div className="hidden md:flex items-center gap-12">
        <a href="#" className="text-white hover:text-gray-200">
          Servicios
        </a>
        <a href="#" className="text-white hover:text-gray-200">
          Precios
        </a>
        <a href="#" className="text-white hover:text-gray-200">
          Contáctanos
        </a>
        <a
          href="/#"
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-80"
        >
          Regístrate
        </a>
      </div>
    </nav>
  );
};
