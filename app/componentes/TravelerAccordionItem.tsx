// src/app/components/TravelerAccordionItem.tsx
import React from "react";
import { Traveler } from "../hooks/useFormData";
import { InputGroup } from "./InputGroup";

interface TravelerAccordionItemProps {
  traveler: Traveler;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  onTravelerChange: (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export const TravelerAccordionItem: React.FC<TravelerAccordionItemProps> = ({
  traveler,
  index,
  isOpen,
  onToggle,
  onTravelerChange,
}) => {
  return (
    <div className="border border-gray-200 rounded-md">
      <button
        type="button"
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        onClick={() => onToggle(index)}
      >
        <h3 className="text-lg font-medium text-gray-800">
          Viajero {index + 1}
          {traveler.fullName && ` - ${traveler.fullName}`}
        </h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 bg-white border-t border-gray-200">
          <InputGroup
            id={`fullName-${index}`}
            name="fullName"
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            value={traveler.fullName}
            onChange={(e) => onTravelerChange(index, e)}
            required
          />
          <InputGroup
            id={`dob-${index}`}
            name="dob"
            label="Fecha de nacimiento"
            value={traveler.dob}
            onChange={(e) => onTravelerChange(index, e)}
            type="date"
            required
          />
          <InputGroup
            id={`documentType-${index}`}
            name="documentType"
            label="Tipo de documento"
            value={traveler.documentType}
            onChange={(e) => onTravelerChange(index, e)}
            type="select"
            options={[
              { value: "DNI", label: "DNI" },
              { value: "Pasaporte", label: "Pasaporte" },
              { value: "Licencia", label: "Licencia de Conducir" },
            ]}
            required
          />
          <InputGroup
            id={`documentNumber-${index}`}
            name="documentNumber"
            label="Número de documento"
            value={traveler.documentNumber}
            placeholder="Ej: 12345678"
            onChange={(e) => onTravelerChange(index, e)}
            required
          />
        </div>
      )}
    </div>
  );
};
