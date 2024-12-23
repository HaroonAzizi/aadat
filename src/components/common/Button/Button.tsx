// src/components/common/Button/Button.tsx

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
