import React from 'react';

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div classNmae="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
