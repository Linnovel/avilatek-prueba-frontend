import React from "react";
import { DestinationCard } from "./DestinationCard";

export const DestinationsSection: React.FC = () => {
  return (
    <div className="px-8 md:px-32 pb-16 shadow-2xl pt-8 md:pt-0">
      <h2 className="text-white text-xl mb-4">Vuelos disponibles</h2>
      <div className="h-px w-full bg-white bg-opacity-50 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestinationCard city="Madrid" flag="🇪🇸" image="/madrid.jpg" />
        <DestinationCard city="New York" flag="🇺🇸" image="/newyork.jpg" />
        <DestinationCard city="Argentina" flag="🇦🇷" image="/argentina.jpg" />
      </div>
    </div>
  );
};
