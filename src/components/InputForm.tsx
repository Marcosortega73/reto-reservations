import React from "react";

type InputFormProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const InputForm = ({
  type,
  placeholder,
  value,
  onChange,
  name,
}: InputFormProps) => {
  return (
    <input
      type={type}
      className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default InputForm;
