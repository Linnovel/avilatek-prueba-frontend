// src/app/page.tsx
import Image from "next/image";
import { Navbar } from "./componentes/Navbar";
import { HeroSection } from "./componentes/HeroSection";
import { DestinationsSection } from "./componentes/DestinationsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/avion.png"
          alt="Vista desde la ventana del avión al atardecer"
          fill
          priority
          className="object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-black/30"></div>{" "}
        {/* Ejemplo de overlay oscuro */}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <DestinationsSection />
      </div>
    </main>
  );
}
