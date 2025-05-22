// src/app/components/Step4Summary.tsx
import React from "react";
import { FormData } from "../hooks/useFormData";

interface Step4SummaryProps {
  formData: FormData;
  calculateTotalPrice: number;
}

// Costos de servicios adicionales (idealmente importar de un archivo de constantes o que el hook lo pase)
const PET_COST_PER_UNIT = 100;
const LUGGAGE_COST_PER_UNIT = 50;
const TRAVEL_INSURANCE_COST = 30;
const PREFERRED_SEATS_COST_PER_TRAVELER = 20;

export const Step4Summary: React.FC<Step4SummaryProps> = ({
  formData,
  calculateTotalPrice,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Paso 4: Resumen y Confirmación
      </h2>

      <div className="space-y-2 text-gray-700">
        <h3 className="font-semibold text-lg text-blue-700">
          Detalles del Vuelo
        </h3>
        <p>
          <strong>Destino:</strong> {formData.destination}
        </p>
        <p>
          <strong>Fechas de viaje:</strong> {formData.departureDate} al{" "}
          {formData.returnDate}
        </p>
        <p>
          <strong>Clase de vuelo:</strong> {formData.flightClass}
        </p>

        <h3 className="font-semibold mt-4 text-lg text-blue-700">
          Detalles de los Viajeros ({formData.numberOfTravelers})
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {formData.travelers.map((traveler, index) => {
            const birthDate = new Date(traveler.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            return (
              <li key={index}>
                {traveler.fullName}, Edad: {isNaN(age) ? "N/A" : age},
                Documento: {traveler.documentType} - {traveler.documentNumber}
              </li>
            );
          })}
        </ul>

        <h3 className="font-semibold mt-4 text-lg text-blue-700">
          Servicios Adicionales
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Seguro de viaje:{" "}
            {formData.addTravelInsurance
              ? `Sí ($${(
                  TRAVEL_INSURANCE_COST * formData.numberOfTravelers
                ).toFixed(2)})`
              : "No"}
          </li>
          <li>
            Asientos preferenciales:{" "}
            {formData.selectPreferredSeats
              ? `Sí ($${(
                  PREFERRED_SEATS_COST_PER_TRAVELER * formData.numberOfTravelers
                ).toFixed(2)})`
              : "No"}
          </li>
          <li>
            Viaja con mascotas:{" "}
            {formData.travelingWithPets
              ? `Sí (${formData.numberOfPets} mascota(s) - $${(
                  formData.numberOfPets * PET_COST_PER_UNIT
                ).toFixed(2)})`
              : "No"}
          </li>
          <li>
            Maletas extra:{" "}
            {formData.extraLuggage
              ? `Sí (${formData.numberOfBags} maleta(s) - $${(
                  formData.numberOfBags * LUGGAGE_COST_PER_UNIT
                ).toFixed(2)})`
              : "No"}
          </li>
          <li>
            Asistencia especial:{" "}
            {formData.requireSpecialAssistance ? "Sí" : "No"}
            {formData.requireSpecialAssistance &&
              formData.specialAssistanceNote && (
                <span className="italic">
                  {` ("${formData.specialAssistanceNote}")`}
                </span>
              )}
          </li>
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t-2 border-blue-500">
        <h3 className="text-3xl font-bold text-center text-blue-800">
          Precio Total Estimado: ${calculateTotalPrice.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};
