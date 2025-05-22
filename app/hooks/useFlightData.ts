// src/hooks/useFlightData.ts
import { useState, useEffect } from "react";

interface FlightDetail {
  destination: string;
  class: string;
  priceUSD: number;
}

interface UseFlightDataReturn {
  allFlightDetails: FlightDetail[] | null;
  availableDestinations: string[];
  availableFlightClasses: string[];
  loadingFlights: boolean;
  errorFetchingFlights: string | null;
}

export function useFlightData(): UseFlightDataReturn {
  const [allFlightDetails, setAllFlightDetails] = useState<FlightDetail[] | null>(null);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableFlightClasses, setAvailableFlightClasses] = useState<string[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [errorFetchingFlights, setErrorFetchingFlights] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FlightDetail[] = await response.json();

        setAllFlightDetails(data);

        // --- INICIO DE LA SIMPLIFICACIÓN ---

        // 1. Obtener destinos únicos de una forma más explícita
        const uniqueDestinations: string[] = [];
        for (const item of data) {
          if (!uniqueDestinations.includes(item.destination)) { 
            uniqueDestinations.push(item.destination); // Lo añadimos
          }
        }
        setAvailableDestinations(uniqueDestinations);

        // 2. Obtener clases de vuelo únicas de una forma más explícita
        const uniqueFlightClasses: string[] = [];
        for (const item of data) {
          if (!uniqueFlightClasses.includes(item.class)) { // Si la clase no está ya en la lista
            uniqueFlightClasses.push(item.class); // La añadimos
          }
        }
        setAvailableFlightClasses(uniqueFlightClasses);

        // --- FIN DE LA SIMPLIFICACIÓN ---

        setErrorFetchingFlights(null);
      } catch (error: any) {
        console.error("Error fetching the flights data:", error);
        setErrorFetchingFlights(
          `No se pudieron cargar los datos de vuelos: ${error.message || error}`
        );
      } finally {
        setLoadingFlights(false);
      }
    };
    fetchFlightData();
  }, []); // El array de dependencias vacío asegura que se ejecuta solo una vez al montar

  return {
    allFlightDetails,
    availableDestinations,
    availableFlightClasses,
    loadingFlights,
    errorFetchingFlights,
  };
}