import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-full font-medium transition-colors";
  
  const variantClasses = {
    default: "bg-green-500 text-white hover:bg-green-700",
    outline: "border border-gray-300 bg-surface hover:bg-gray-50",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
}