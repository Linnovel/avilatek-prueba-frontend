import Image from "next/image";
import { Navbar } from "./componentes/Navbar";
import { HeroSection } from "./componentes/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 h-screen">
        <Image
          src="/avion.webp"
          alt="Vista desde la ventana del avión al atardecer"
          fill
          priority
          className="object-cover absolute inset-0 "
        />
        <div className="absolute inset-0 bg-black/30"></div>{" "}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
      </div>
    </main>
  );
}
