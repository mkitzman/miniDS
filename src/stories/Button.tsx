import React from "react";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**  content of the button */
  label: string;
}

/**
 * Simple button component
 */
export const Button = ({ label, ...props }: ButtonProps) => {
  // Spreading props on the button allows us to support the native HTML props without having to include them in the component
  return (
    <button className="button" {...props}>
      {label}
    </button>
  );
};
