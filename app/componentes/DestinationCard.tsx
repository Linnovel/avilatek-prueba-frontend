// src/app/components/DestinationCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  city: string;
  flag: string;
  image: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  city,
  flag,
  image,
}) => {
  return (
    // Usa Link para la navegación interna en Next.js
    <a href="/#" className="block">
      <div className="relative overflow-hidden rounded-xl h-40 group">
        <Image
          // Si tienes rutas de imagen específicas para cada ciudad, úsalas.
          // Si no, puedes tener una lógica fallback más robusta.
          // image || "/argentina.jpg || /madrid.jpg || /new-york.jpg" no es una ruta válida.
          // Deberías usar la prop 'image' directamente o definir un fallback claro.
          src={image} // Aquí simplemente usamos la prop 'image'
          alt={`${city} destination`}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white text-xl font-medium flex items-center gap-2">
          {city} <span className="text-2xl">{flag}</span>
        </div>
      </div>
    </a>
  );
};
