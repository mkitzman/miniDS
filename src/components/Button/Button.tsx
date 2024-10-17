import React from "react";
import classNames from "classnames";
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

  return (
    <button
      type="button"
      className={classNames({
        Button: true,
        "Button-primary": variant === "Primary",
        className,
      })}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
