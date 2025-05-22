import React from "react";
import { InputGroup } from "./InputGroup";
import { FormData } from "../hooks/useFormData";

interface Step1FormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  availableDestinations: string[];
  availableFlightClasses: string[];
  minDepartureDate: string;
  minReturnDate: string;
}

export const Step1Form: React.FC<Step1FormProps> = ({
  formData,
  handleChange,
  availableDestinations,
  availableFlightClasses,
  minDepartureDate,
  minReturnDate,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">
        Paso 1: Información del Viaje
      </h2>
      <InputGroup
        id="destination"
        name="destination"
        label="Destino"
        value={formData.destination}
        onChange={handleChange}
        placeholder="Ej: Madrid"
        list="cities-list"
        options={availableDestinations.map((dest) => ({
          value: dest,
          label: dest,
        }))}
        required
      />
      <InputGroup
        id="departureDate"
        name="departureDate"
        label="Fecha de salida"
        value={formData.departureDate}
        onChange={handleChange}
        type="date"
        min={minDepartureDate}
        required
      />
      <InputGroup
        id="returnDate"
        name="returnDate"
        label="Fecha de regreso"
        value={formData.returnDate}
        onChange={handleChange}
        type="date"
        min={minReturnDate}
        required
        disabled={!formData.departureDate}
      />
      <InputGroup
        id="flightClass"
        name="flightClass"
        label="Clase de vuelo"
        value={formData.flightClass}
        onChange={handleChange}
        type="select"
        options={availableFlightClasses.map((fClass) => ({
          value: fClass,
          label: fClass,
        }))}
        required
      />
    </div>
  );
};
