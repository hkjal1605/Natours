import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ content, btnClass, ...otherProps }) => {
  return (
    <button className={`button ${btnClass}`} {...otherProps}>
      {content}
    </button>
  );
};

export default CustomButton;
