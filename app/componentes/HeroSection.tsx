import React from "react";
import FlightBookingForm from "./FlightBookingForm";
import Link from "next/link";
import { DestinationCard } from "./DestinationCard";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center px-8 md:px-32 py-16 gap-12 min-h-[calc(100vh-6rem)]">
      <div className="max-w-2xl text-center md:text-left">
        <p className="text-white text-xl mb-2">
          Realiza tu próximo vuelo con nosotros
        </p>
        <h1 className="text-white text-4xl  md:text-6xl font-semibold mb-4">
          Reserva facilmente tu proximo viaje y{" "}
          <span className="text-yellow-500"> vuela con nosotros</span>
        </h1>
        <p className="text-white text-lg font-medium mb-8">Facil y rapido</p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="/#"
            className=" border border-white text-white px-6 py-2 rounded-full
              hover:shadow-lg"
          >
            Información
          </Link>
          <Link
            href="/#"
            className=" bg-black text-white px-6 py-2 rounded-full
              transition ease-in-out duration-300
              hover:bg-opacity-80 hover:scale-105 hover:shadow-lg"
          >
            Reserva ya
          </Link>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto min-h-[550px]">
        <FlightBookingForm />
      </div>

      <div className="w-full pt-16 pb-16">
        {" "}
        <h2 className="text-white text-xl mb-4 text-center md:text-left">
          Vuelos disponibles
        </h2>
        <div className="h-px w-full bg-white bg-opacity-50 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DestinationCard city="Madrid" flag="🇪🇸" image="/madrid.webp" />
          <DestinationCard city="New York" flag="🇺🇸" image="/newyork.webp" />
          <DestinationCard city="Argentina" flag="🇦🇷" image="/argentina.webp" />
        </div>
      </div>
    </div>
  );
};
