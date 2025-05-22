// src/app/components/HeroSection.tsx
import React from "react";
import FlightBookingForm from "./FlightBookingForm"; // Importa el formulario
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-center items-center  md:px-32 gap-8 ">
      {/* Contenido del Hero (izquierda) */}
      <div className="max-w-2xl text-center md:text-left md:flex-1">
        <p className="text-white text-xl mb-2">
          Realiza tu próximo vuelo con nosotros
        </p>
        <h1 className="text-white text-6xl md:text-7xl font-bold mb-4">
          Fácil y rápido
        </h1>
        <p className="text-white text-xl mb-8">Explora ahora</p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="/#"
            className="border border-white text-white px-6 py-2 rounded-full  hover:bg-opacity-20"
          >
            Información
          </Link>
          <Link
            href="/#"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-80"
          >
            Reserva ya
          </Link>
        </div>
      </div>

      {/* Formulario (derecha) */}
      <div className="md:flex-1  w-full max-w-lg md:max-w-none min-h-[500px]">
        <FlightBookingForm />
      </div>
    </div>
  );
};
