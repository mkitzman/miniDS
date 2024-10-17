import React from "react";
import "./button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**  content of the button */
  children: React.ReactNode;
  /** button style */
  variant?: "Primary" | "Default";
}

/**
 * Simple button component
 */
export const Button = ({
  children,
  variant = "Default",
  ...props
}: ButtonProps) => {
  const { className, ...buttonProps } = props;
  const passedInClasses = className || "";

  const classes =
    variant === "Primary"
      ? `Button Button-primary ${passedInClasses}`
      : `Button ${passedInClasses}`;

  // Spreading props on the button allows us to support the native HTML props without having to include them in the component
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
};
