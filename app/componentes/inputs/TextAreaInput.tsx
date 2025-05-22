import React from "react";

interface TextAreaInputProps {
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  maxLength,
  rows,
  className = "",
}) => {
  const textareaClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y";

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      rows={rows}
      className={`${textareaClasses} ${className}`}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    ></textarea>
  );
};
