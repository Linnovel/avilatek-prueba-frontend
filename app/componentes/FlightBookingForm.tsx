// src/app/components/FlightBookingForm.tsx
"use client"; // ¡Muy importante para Next.js!

import React from "react";

import { useFlightData } from "../hooks/useFlightData";
import { useFormData } from "../hooks/useFormData";
import { useFormNavigation } from "../hooks/useFormNavigation";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { Step4Summary } from "./Step4Summary";

// Este componente encapsulará todo el formulario multipaso
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

  // Función para manejar el envío final del formulario
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    if (validateStep(currentStep)) {
      // Si la validación del paso actual es exitosa
      console.log("Formulario enviado con éxito:", formData);
      alert("¡Reserva completada! Revisa la consola para ver los datos.");
      resetForm(); // Restablece el formulario a su estado inicial después del envío exitoso
    } else {
      // Si la validación falla (aunque el botón debería estar deshabilitado en este caso)
      alert(
        "Por favor, completa todos los campos requeridos antes de confirmar."
      );
    }
  };

  // Muestra un mensaje de carga mientras se obtienen los datos de los vuelos
  if (loadingFlights) {
    return (
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <p className="text-gray-700">Cargando datos de vuelos...</p>
      </div>
    );
  }

  // Muestra un mensaje de error si la carga de datos falla
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

      {/* Barra de progreso del formulario */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* El formulario principal que gestiona el envío final */}
      <form onSubmit={handleFinalSubmit}>
        {/* Renderizado condicional de los pasos del formulario */}
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
          <Step4Summary // <-- ¡Aquí usamos el nombre correcto!
            formData={formData}
            calculateTotalPrice={calculateTotalPrice}
            // Importante: ya NO pasamos onSubmitFinal ni onPrev a Step4Summary.
            // Los botones de navegación y el botón de submit final están
            // gestionados por el 'form' padre y los botones a continuación.
          />
        )}

        {/* Controles de navegación del formulario */}
        <div className="flex justify-between mt-8">
          {/* Botón "Anterior" */}
          {!isFirstStep && (
            <button
              type="button" // Es un botón normal, no envía el formulario
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Anterior
            </button>
          )}

          {/* Botón "Siguiente" */}
          {!isFinalStep && (
            <button
              type="button" // Es un botón normal, no envía el formulario
              onClick={nextStep}
              className={`px-6 py-2 rounded-md text-white transition-colors duration-200 ${
                validateStep(currentStep, false) // Valida el paso sin mostrar alertas (para deshabilitar el botón)
                  ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  : "bg-gray-400 cursor-not-allowed" // Estilo para botón deshabilitado
              }`}
              disabled={!validateStep(currentStep, false)} // Deshabilita el botón si la validación falla
            >
              Siguiente
            </button>
          )}

          {/* Botón "Confirmar Reserva" (solo visible en el último paso) */}
          {isFinalStep && (
            <button
              type="submit" // Este botón SÍ envía el formulario al hacer clic
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
