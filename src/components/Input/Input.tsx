import React, { useId } from "react";
import "./input.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**  label for the input */
  label: React.ReactNode;
  /**  value of input, not needed because we're extending HTMLInputElementbut but added for clarity */
  value?: string;
  /**  callback for when user types */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Simple input component
 */
export const Input = ({ label, onChange, value, ...props }: InputProps) => {
  // random id in case there's more than one input on the page
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="Input-label">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className="Input"
        {...props}
      />
    </>
  );
};
