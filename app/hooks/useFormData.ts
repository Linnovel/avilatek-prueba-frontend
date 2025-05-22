// src/hooks/useFormData.ts
import { useState, useMemo } from "react";

// Interfaces (mantén las interfaces como están, son perfectas)
interface FlightDetail {
  destination: string;
  class: string;
  priceUSD: number;
}

export interface Traveler {
  fullName: string;
  dob: string; // Date of Birth
  documentType: string;
  documentNumber: string;
}

export interface FormData {
  // Paso 1
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  // Paso 2
  numberOfTravelers: number;
  travelers: Traveler[];
  travelingWithPets: boolean;
  numberOfPets: number;
  extraLuggage: boolean;
  numberOfBags: number;
  // Paso 3
  addTravelInsurance: boolean;
  selectPreferredSeats: boolean;
  requireSpecialAssistance: boolean;
  specialAssistanceNote: string;
}

// Costos de servicios adicionales (mantén los costos como están)
const PET_COST_PER_UNIT = 100;
const LUGGAGE_COST_PER_UNIT = 50;
const TRAVEL_INSURANCE_COST = 30;
const PREFERRED_SEATS_COST_PER_TRAVELER = 20;

interface UseFormDataProps {
  allFlightDetails: FlightDetail[] | null;
}

interface UseFormDataReturn {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>, min: number, max: number) => void;
  handleTravelerChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  minReturnDate: string;
  minDepartureDate: string;
  calculateTotalPrice: number;

  openTravelerIndex: number | null;
  toggleTravelerAccordion: (index: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Exportar setFormData para la validación
}

export function useFormData({ allFlightDetails }: UseFormDataProps): UseFormDataReturn {
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    departureDate: "",
    returnDate: "",
    flightClass: "",
    numberOfTravelers: 1,
    travelers: [{ fullName: "", dob: "", documentType: "", documentNumber: "" }],
    travelingWithPets: false,
    numberOfPets: 0,
    extraLuggage: false,
    numberOfBags: 0,
    addTravelInsurance: false,
    selectPreferredSeats: false,
    requireSpecialAssistance: false,
    specialAssistanceNote: "",
  });

  const [openTravelerIndex, setOpenTravelerIndex] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "departureDate" && newData.returnDate && newData.departureDate > newData.returnDate) {
        newData.returnDate = newData.departureDate;
      }
      return newData;
    });
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    min: number,
    max: number
  ) => {
    const { name, value } = e.target;
    let numValue = parseInt(value, 10);

    // Asegura que el valor esté dentro de los límites
    if (isNaN(numValue) || numValue < min) {
      numValue = min;
    }
    if (numValue > max) {
      numValue = max;
    }

    setFormData((prevData) => {
      let newTravelers = prevData.travelers; // Inicializa con los viajeros actuales

      if (name === "numberOfTravelers") {
        // Opción 1: Simplemente tomamos una porción del array existente o lo rellenamos
        // Esto es una forma inmutable de crear el nuevo array de viajeros
        if (numValue > prevData.travelers.length) {
          // Si necesitamos más viajeros, creamos un nuevo array
          // que contiene los viajeros existentes MÁS los nuevos
          const travelersToAdd = Array(numValue - prevData.travelers.length)
            .fill(null) // Llenamos con null para luego mapear
            .map(() => ({ fullName: "", dob: "", documentType: "", documentNumber: "" }));
          newTravelers = [...prevData.travelers, ...travelersToAdd];
        } else if (numValue < prevData.travelers.length) {
          // Si necesitamos menos viajeros, cortamos el array existente
          newTravelers = prevData.travelers.slice(0, numValue);
        } else {
            // Si el número es el mismo, no hacemos nada con el array de viajeros
            newTravelers = prevData.travelers;
        }

        // Ajusta el índice del acordeón abierto si es necesario
        if (openTravelerIndex !== null && openTravelerIndex >= numValue) {
          setOpenTravelerIndex(numValue > 0 ? 0 : null);
        } else if (openTravelerIndex === null && numValue > 0) {
          setOpenTravelerIndex(0);
        }
      }

      // Devolvemos el nuevo objeto de estado inmutable
      return {
        ...prevData,
        [name]: numValue,
        travelers: newTravelers,
      };
    });
  };

  const handleTravelerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // Creamos una nueva copia del array de viajeros
      const newTravelers = [...prevData.travelers];
      // Modificamos la copia en el índice específico
      newTravelers[index] = {
        ...newTravelers[index],
        [name]: value,
      };
      // Devolvemos el nuevo objeto de estado con el array de viajeros actualizado
      return {
        ...prevData,
        travelers: newTravelers,
      };
    });
  };

  const toggleTravelerAccordion = (index: number) => {
    setOpenTravelerIndex(openTravelerIndex === index ? null : index);
  };

  const calculateTotalPrice = useMemo(() => {
    let totalPrice = 0;

    if (formData.destination && formData.flightClass && allFlightDetails) {
      const baseFlight = allFlightDetails.find(
        (detail) =>
          detail.destination === formData.destination &&
          detail.class === formData.flightClass
      );
      if (baseFlight) {
        totalPrice += baseFlight.priceUSD * formData.numberOfTravelers;
      }
    }

    if (formData.travelingWithPets && formData.numberOfPets > 0) {
      totalPrice += formData.numberOfPets * PET_COST_PER_UNIT;
    }

    if (formData.extraLuggage && formData.numberOfBags > 0) {
      totalPrice += formData.numberOfBags * LUGGAGE_COST_PER_UNIT;
    }

    if (formData.addTravelInsurance) {
      totalPrice += TRAVEL_INSURANCE_COST * formData.numberOfTravelers;
    }

    if (formData.selectPreferredSeats) {
      totalPrice += PREFERRED_SEATS_COST_PER_TRAVELER * formData.numberOfTravelers;
    }

    return totalPrice;
  }, [formData, allFlightDetails]);

  // Obtener la fecha mínima para el campo de regreso
  const minReturnDate = formData.departureDate ? formData.departureDate : "";
  // Obtener la fecha mínima para el campo de salida (hoy)
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const minDepartureDate = `${year}-${month}-${day}`;


  return {
    formData,
    handleChange,
    handleNumberChange,
    handleTravelerChange,
    minReturnDate,
    minDepartureDate,
    calculateTotalPrice,
    openTravelerIndex,
    toggleTravelerAccordion,
    setFormData, // Se exporta setFormData para que `useFormNavigation` pueda actualizarlo
  };
}