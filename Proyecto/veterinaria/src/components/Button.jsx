import React from "react";

function Button({ label, onClick, styleType = "primary" }) {
  const className = `btn btn-${styleType}`;
  return <button className={className} onClick={onClick}>{label}</button>;
}

export default Button;
