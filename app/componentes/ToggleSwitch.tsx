import React from "react";

interface ToggleSwitchProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <label
        htmlFor={id}
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {checked ? "Sí" : "No"}
        </span>
      </label>
    </div>
  );
};
