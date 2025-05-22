import React from "react";
import { InputGroup } from "./InputGroup";
import { ToggleSwitch } from "./ToggleSwitch";
import { FormData } from "../hooks/useFormData";

interface Step3FormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const TRAVEL_INSURANCE_COST = 30;
const PREFERRED_SEATS_COST_PER_TRAVELER = 20;

export const Step3Form: React.FC<Step3FormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Paso 3: Servicios Adicionales
      </h2>

      <ToggleSwitch
        id="addTravelInsurance"
        name="addTravelInsurance"
        label="¿Deseas agregar seguro de viaje?"
        checked={formData.addTravelInsurance}
        onChange={handleChange}
      />
      {formData.addTravelInsurance && (
        <p className="mt-1 text-sm text-gray-500 text-right">
          Costo estimado: ${TRAVEL_INSURANCE_COST * formData.numberOfTravelers}{" "}
          ({TRAVEL_INSURANCE_COST} c/u)
        </p>
      )}

      <ToggleSwitch
        id="selectPreferredSeats"
        name="selectPreferredSeats"
        label="¿Deseas seleccionar asientos preferenciales?"
        checked={formData.selectPreferredSeats}
        onChange={handleChange}
      />
      {formData.selectPreferredSeats && (
        <p className="mt-1 text-sm text-gray-500 text-right">
          Costo estimado: $
          {PREFERRED_SEATS_COST_PER_TRAVELER * formData.numberOfTravelers} (
          {PREFERRED_SEATS_COST_PER_TRAVELER} c/u)
        </p>
      )}

      <ToggleSwitch
        id="requireSpecialAssistance"
        name="requireSpecialAssistance"
        label="¿Requiere asistencia especial?"
        checked={formData.requireSpecialAssistance}
        onChange={handleChange}
      />
      {formData.requireSpecialAssistance && (
        <InputGroup
          id="specialAssistanceNote"
          name="specialAssistanceNote"
          label="Nota de asistencia especial (máx. 200 caracteres)"
          value={formData.specialAssistanceNote}
          onChange={handleChange}
          type="textarea"
          maxLength={200}
          rows={3}
          placeholder="Escribe tus necesidades especiales aquí..."
          note={`${formData.specialAssistanceNote.length} / 200 caracteres`}
        />
      )}
    </div>
  );
};
