import React from "react";
import { SelectInput } from "./inputs/SelectInput";
import { TextAreaInput } from "./inputs/TextAreaInput";
import { BasicInput } from "./inputs/BasicInputs";

interface InputGroupProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  type?: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  list?: string;
  className?: string;
  note?: string;
  maxLength?: number;
  rows?: number;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  required,
  disabled,
  options,
  list,
  className = "",
  note,
  maxLength,
  rows,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        if (!options) {
          console.warn(
            `InputGroup: 'options' prop is required for type 'select' but was not provided for input '${name}'.`
          );
          return null;
        }
        return (
          <SelectInput
            id={id}
            name={name}
            value={value}
            onChange={
              onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void
            }
            options={options}
            placeholder={placeholder || `Selecciona un ${label.toLowerCase()}`}
            required={required}
            disabled={disabled}
            className={className}
          />
        );
      case "textarea":
        return (
          <TextAreaInput
            id={id}
            name={name}
            value={value}
            onChange={
              onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
            }
            maxLength={maxLength}
            rows={rows}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={className}
          />
        );
      default:
        return (
          <BasicInput
            id={id}
            name={name}
            value={value}
            onChange={
              onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
            }
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            required={required}
            disabled={disabled}
            list={list}
            className={className}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderInput()}
      {list && options && (
        <datalist id={list}>
          {options.map((option) => (
            <option key={option.value} value={option.value} />
          ))}
        </datalist>
      )}
      {note && <p className="mt-1 text-sm text-gray-500">{note}</p>}
    </div>
  );
};
