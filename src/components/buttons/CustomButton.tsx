import React from "react";

import "./CustomButton.css";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const CustomButton = ({
  label,
  onClick,
  disabled,
  className,
  type,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`custom_button ${className}`}	
      onClick={onClick ?? (() => {})}
      disabled={disabled}
      type={type || "button"}
      {...rest}
    >
      <span>{label}</span>
    </button>
  );
};

