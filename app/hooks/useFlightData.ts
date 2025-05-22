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
      
        const uniqueDestinations: string[] = [];
        for (const item of data) {
          if (!uniqueDestinations.includes(item.destination)) {
            uniqueDestinations.push(item.destination);
          }
        }
        setAvailableDestinations(uniqueDestinations);

        const uniqueFlightClasses: string[] = [];
        for (const item of data) {
          if (!uniqueFlightClasses.includes(item.class)) {
            uniqueFlightClasses.push(item.class);
          }
        }
        setAvailableFlightClasses(uniqueFlightClasses);

        setErrorFetchingFlights(null);
      } catch (error) {
        console.error("Error fetching the flights data:", error);
     
        setErrorFetchingFlights(
          `No se pudieron cargar los datos de vuelos: ${
            error instanceof Error ? error.message : String(error) 
          }`
        );
      } finally {
        setLoadingFlights(false);
      }
    };
    fetchFlightData();
  }, []); 

  return {
    allFlightDetails,
    availableDestinations,
    availableFlightClasses,
    loadingFlights,
    errorFetchingFlights,
  };
}