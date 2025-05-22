import React from "react";

interface BasicInputProps {
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "date";
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  disabled?: boolean;
  list?: string;
  className?: string;
}

export const BasicInput: React.FC<BasicInputProps> = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  required,
  disabled,
  list,
  className = "",
}) => {
  const inputClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
      disabled={disabled}
      list={list}
      className={`${inputClasses} ${className}`}
    />
  );
};
