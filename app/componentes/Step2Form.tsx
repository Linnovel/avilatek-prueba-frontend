import React from "react";
import { InputGroup } from "./InputGroup";
import { ToggleSwitch } from "./ToggleSwitch";
import { TravelerAccordionItem } from "./TravelerAccordionItem";
import { FormData } from "../hooks/useFormData";

interface Step2FormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    min: number,
    max: number
  ) => void;
  handleTravelerChange: (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  openTravelerIndex: number | null;
  toggleTravelerAccordion: (index: number) => void;
}

const PET_COST_PER_UNIT = 100;
const LUGGAGE_COST_PER_UNIT = 50;

export const Step2Form: React.FC<Step2FormProps> = ({
  formData,
  handleChange,
  handleNumberChange,
  handleTravelerChange,
  openTravelerIndex,
  toggleTravelerAccordion,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Paso 2: Información del Viajero
      </h2>
      <InputGroup
        id="numberOfTravelers"
        name="numberOfTravelers"
        label="Número de viajeros (1-10)"
        value={formData.numberOfTravelers}
        onChange={(e) =>
          handleNumberChange(e as React.ChangeEvent<HTMLInputElement>, 1, 10)
        }
        type="number"
        min={1}
        max={10}
        required
      />

      {formData.travelers.map((traveler, index) => (
        <TravelerAccordionItem
          key={index}
          traveler={traveler}
          index={index}
          isOpen={openTravelerIndex === index}
          onToggle={toggleTravelerAccordion}
          onTravelerChange={handleTravelerChange}
        />
      ))}

      <ToggleSwitch
        id="travelingWithPets"
        name="travelingWithPets"
        label="¿Viajas con mascotas?"
        checked={formData.travelingWithPets}
        onChange={handleChange}
      />
      {formData.travelingWithPets && (
        <InputGroup
          id="numberOfPets"
          name="numberOfPets"
          label="Cantidad de mascotas"
          value={formData.numberOfPets}
          onChange={(e) =>
            handleNumberChange(e as React.ChangeEvent<HTMLInputElement>, 0, 99)
          }
          type="number"
          min={0}
          max={10}
          note={`Costo: $${PET_COST_PER_UNIT} c/u`}
        />
      )}

      <ToggleSwitch
        id="extraLuggage"
        name="extraLuggage"
        label="¿Necesitas maletas extra?"
        checked={formData.extraLuggage}
        onChange={handleChange}
      />
      {formData.extraLuggage && (
        <InputGroup
          id="numberOfBags"
          name="numberOfBags"
          label="Cantidad de maletas extra"
          value={formData.numberOfBags}
          onChange={(e) =>
            handleNumberChange(e as React.ChangeEvent<HTMLInputElement>, 0, 99)
          }
          type="number"
          min={0}
          max={10}
          note={`Costo: $${LUGGAGE_COST_PER_UNIT} c/u`}
        />
      )}
    </div>
  );
};
