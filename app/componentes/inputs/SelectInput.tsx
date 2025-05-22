import React from "react";

interface SelectInputProps {
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled,
  className = "",
}) => {
  const selectClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`${selectClasses} ${className}`}
      required={required}
      disabled={disabled}
    >
      <option value="">{placeholder || `Selecciona una opción`}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
