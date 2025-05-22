"use client";

import React from "react";

import { useFlightData } from "../hooks/useFlightData";
import { useFormData } from "../hooks/useFormData";
import { useFormNavigation } from "../hooks/useFormNavigation";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { Step4Summary } from "./Step4Summary";
import { ProgressBar } from "./ProgressBar";

export default function FlightBookingForm() {
  const {
    allFlightDetails,
    availableDestinations,
    availableFlightClasses,
    loadingFlights,
    errorFetchingFlights,
  } = useFlightData();

  const {
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
  } = useFormData({ allFlightDetails });

  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isFinalStep,
    progressPercentage,
    validateStep,
    resetForm,
  } = useFormNavigation(formData, setFormData);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Formulario enviado con éxito:", formData);
      alert("¡Reserva completada! Revisa la consola para ver los datos.");
      resetForm();
    } else {
      alert(
        "Por favor, completa todos los campos requeridos antes de confirmar."
      );
    }
  };

  if (loadingFlights) {
    return (
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <p className="text-gray-700">Cargando datos de vuelos...</p>
      </div>
    );
  }

  if (errorFetchingFlights) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
        <p>Error: {errorFetchingFlights}</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold  text-gray-800 mb-6">
        Reserva tu Vuelo
      </h2>

      <ProgressBar currentStep={currentStep} totalSteps={4} />

      <form onSubmit={handleFinalSubmit}>
        {currentStep === 1 && (
          <Step1Form
            formData={formData}
            handleChange={handleChange}
            minDepartureDate={minDepartureDate}
            minReturnDate={minReturnDate}
            availableDestinations={availableDestinations}
            availableFlightClasses={availableFlightClasses}
          />
        )}
        {currentStep === 2 && (
          <Step2Form
            formData={formData}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleTravelerChange={
              handleTravelerChange as (
                index: number,
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                >
              ) => void
            }
            openTravelerIndex={openTravelerIndex}
            toggleTravelerAccordion={toggleTravelerAccordion}
          />
        )}
        {currentStep === 3 && (
          <Step3Form formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 4 && (
          <Step4Summary
            formData={formData}
            calculateTotalPrice={calculateTotalPrice}
          />
        )}

        <div className="flex justify-between mt-8">
          {!isFirstStep && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Anterior
            </button>
          )}

          {!isFinalStep && (
            <button
              type="button"
              onClick={nextStep}
              className={`px-6 py-2 rounded-md text-white transition-colors duration-200 ${
                validateStep(currentStep, false)
                  ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!validateStep(currentStep, false)}
            >
              Siguiente
            </button>
          )}

          {isFinalStep && (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Confirmar Reserva
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
