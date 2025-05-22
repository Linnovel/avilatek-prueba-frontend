import { useState, useMemo } from "react";

interface FlightDetail {
  destination: string;
  class: string;
  priceUSD: number;
}

export interface Traveler {
  fullName: string;
  dob: string; 
  documentType: string;
  documentNumber: string;
}

export interface FormData {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  numberOfTravelers: number;
  travelers: Traveler[];
  travelingWithPets: boolean;
  numberOfPets: number;
  extraLuggage: boolean;
  numberOfBags: number;
  addTravelInsurance: boolean;
  selectPreferredSeats: boolean;
  requireSpecialAssistance: boolean;
  specialAssistanceNote: string;
}

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

    if (isNaN(numValue) || numValue < min) {
      numValue = min;
    }
    if (numValue > max) {
      numValue = max;
    }

    setFormData((prevData) => {
      let newTravelers = prevData.travelers; 

      if (name === "numberOfTravelers") {
   
        if (numValue > prevData.travelers.length) {
   
          const travelersToAdd = Array(numValue - prevData.travelers.length)
            .fill(null) 
            .map(() => ({ fullName: "", dob: "", documentType: "", documentNumber: "" }));
          newTravelers = [...prevData.travelers, ...travelersToAdd];
        } else if (numValue < prevData.travelers.length) {
          newTravelers = prevData.travelers.slice(0, numValue);
        } else {
            newTravelers = prevData.travelers;
        }

        if (openTravelerIndex !== null && openTravelerIndex >= numValue) {
          setOpenTravelerIndex(numValue > 0 ? 0 : null);
        } else if (openTravelerIndex === null && numValue > 0) {
          setOpenTravelerIndex(0);
        }
      }

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
      const newTravelers = [...prevData.travelers];
      newTravelers[index] = {
        ...newTravelers[index],
        [name]: value,
      };
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

  const minReturnDate = formData.departureDate ? formData.departureDate : "";
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
    setFormData, 
  };
}