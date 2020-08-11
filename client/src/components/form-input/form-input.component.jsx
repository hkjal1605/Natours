import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, placeholder, ...otherProps }) => {
  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <input
        placeholder={placeholder ? placeholder : ""}
        className="form-group__input"
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
