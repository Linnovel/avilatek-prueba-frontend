import { useState, useCallback } from "react";
import { FormData } from "./useFormData"; 

export interface UseFormNavigationReturn { 
  currentStep: number;
  progressPercentage: number;
  isFirstStep: boolean;
  isLastStep: boolean; 
  isFinalStep: boolean; 
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateStep: (step: number, showAlert?: boolean) => boolean;
  resetForm: () => void;
}


const TOTAL_ACTIVE_STEPS = 3;

export function useFormNavigation(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
): UseFormNavigationReturn { 
  const [currentStep, setCurrentStep] = useState(1);

  const progressPercentage = (currentStep / (TOTAL_ACTIVE_STEPS + 1)) * 100; // +1 para incluir el resumen como un 'paso' visual

  const validateStep = useCallback(
    (step: number, showAlert: boolean = true): boolean => {
      let isValid = true;
      let errorMessage = "";

      switch (step) {
        case 1:
          if (!formData.destination) {
            isValid = false;
            errorMessage += "Por favor, selecciona un destino.\n";
          }
          if (!formData.departureDate) {
            isValid = false;
            errorMessage += "Por favor, selecciona una fecha de salida.\n";
          }
          if (formData.returnDate && formData.departureDate && formData.returnDate < formData.departureDate) {
            isValid = false;
            errorMessage += "La fecha de regreso no puede ser anterior a la fecha de salida.\n";
          }
          if (!formData.flightClass) {
            isValid = false;
            errorMessage += "Por favor, selecciona una clase de vuelo.\n";
          }
          break;
        case 2:
          if (formData.numberOfTravelers < 1) {
            isValid = false;
            errorMessage += "Debe haber al menos un viajero.\n";
          }
          formData.travelers.forEach((traveler, index) => {
            if (!traveler.fullName || !traveler.dob || !traveler.documentType || !traveler.documentNumber) {
              isValid = false;
              errorMessage += `Por favor, completa todos los campos del viajero ${index + 1}.\n`;
            }
          });
          if (formData.travelingWithPets && formData.numberOfPets < 1) {
            isValid = false;
            errorMessage += "Si viaja con mascotas, debe indicar el número de mascotas.\n";
          }
          if (formData.extraLuggage && formData.numberOfBags < 1) {
            isValid = false;
            errorMessage += "Si añade equipaje extra, debe indicar el número de maletas.\n";
          }
          break;
        case 3:
          if (formData.requireSpecialAssistance && !formData.specialAssistanceNote) {
            isValid = false;
            errorMessage += "Por favor, especifica el tipo de asistencia especial requerida.\n";
          }
          break;
        case 4:
          break;
        default:
          break;
      }

      if (!isValid && showAlert) {
        alert("Por favor, corrige los siguientes errores antes de continuar:\n" + errorMessage);
      }
      return isValid;
    },
    [formData]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep) && currentStep <= TOTAL_ACTIVE_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_ACTIVE_STEPS + 1) {
      setCurrentStep(step);
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
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
    setCurrentStep(1);
  }, [setFormData]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_ACTIVE_STEPS;
  const isFinalStep = currentStep === TOTAL_ACTIVE_STEPS + 1;

  return {
    currentStep,
    progressPercentage,
    isFirstStep,
    isLastStep,
    isFinalStep,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    resetForm,
  };
}