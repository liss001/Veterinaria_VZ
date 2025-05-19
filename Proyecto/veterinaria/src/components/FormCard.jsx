import React from "react";

function FormCard({ title, children }) {
  return (
    <div className="form-card">
      <h2>{title}</h2>
      <div className="form-body">{children}</div>
    </div>
  );
}

export default FormCard;
