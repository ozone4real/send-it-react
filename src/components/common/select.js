import React from "react";

const Select = ({
  options,
  name,
  value,
  label,
  onChange,
  errors,
  required
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        required={required}
        onChange={onChange}
        value={value}
      >
        {options.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <small className="errorMessage" style={{ display: "block" }}>
          {errors}
        </small>
      )}
    </div>
  );
};

export default Select;
