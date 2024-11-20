import React from "react";

type InputFormProps = {
  type: string;
  placeholder: string;
  value: string | number | null ;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  id?: string;
  min?: string;
  max?: string ;
};

export const InputForm = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  required,
  id,
  min,
  max
}: InputFormProps) => {
  return (
    <input
      type={type}
      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-info focus:outline-none"
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      name={name}
      required = {required}
      id={id}
      min={min}
      max={max}
    />
  );
};


