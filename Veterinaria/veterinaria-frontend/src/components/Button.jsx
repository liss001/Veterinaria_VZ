import { forwardRef } from "react";
import { cloneElement } from "react";


export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  asChild = false,
}) {
  const baseStyle = "px-4 py-2 rounded font-medium focus:outline-none transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    edit: "bg-green-500 text-white hover:bg-green-600 text-white",
    destructive: "bg-red-600 text-white hover:bg-red-700 border-red-700",
  };

  const finalStyle = `${baseStyle} ${variants[variant] || ""} ${className}`;

  if (asChild) {
    const child = Array.isArray(children) ? children[0] : children;
    return cloneElement(child, {
      className: `${finalStyle} ${child.props.className || ""}`,
    });
  }

  return (
    <button type={type} onClick={onClick} className={finalStyle}>
      {children}
    </button>
  );
}
