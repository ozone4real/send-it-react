import React from "react";

const Input = ({ label, name, type, onChange, errors, value, required }) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
        style={
          errors ? { backgroundColor: "lightyellow", borderColor: "red" } : null
        }
        required={required}
      />
      {errors && (
        <small className="errorMessage" style={{ display: "block" }}>
          {errors}
        </small>
      )}
    </div>
  );
};

export default Input;
