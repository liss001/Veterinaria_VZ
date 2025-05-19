import React from "react";

function InputField({ label, value, onChange, name, type = "text", placeholder }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
