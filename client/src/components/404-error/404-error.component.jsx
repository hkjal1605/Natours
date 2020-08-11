import React from "react";

import "./404-error.styles.scss";

import { Link } from "react-router-dom";

import { ReactComponent as Error } from "../../icons/error.svg";
import { ReactComponent as Broken } from "../../icons/broken.svg";

import CustomButton from "../custom-button/custom-button.component";

const ErrorDisplay = (error) => {
  console.log(error.error.error.statusCode);
  if (error.error.error.statusCode === 404) {
    return (
      <div className="error">
        <h2 className="error__message-1">OOPS!!! SOMETHING WENT WRONG</h2>
        <Error className="error__logo" />
        <h2 className="error__message-2">
          THE TOUR WITH THE ID YOU ARE LOOKING FOR WAS NOT FOUND!
        </h2>
        <Link to="/">
          <CustomButton content="Go to home page" btnClass="error__btn" />
        </Link>
      </div>
    );
  } else {
    return (
      <div className="error">
        <h2 className="error__message-1">OOPS!!! SOMETHING WENT WRONG</h2>
        <Broken className="error__logo" />
        <h2 className="error__message-2">
          SOMETHING UNEXPECTED HAPPENED! CHECK THE URL YOU ENTERED
        </h2>
        <Link to="/">
          <CustomButton content="Go to home page" btnClass="error__btn" />
        </Link>
      </div>
    );
  }
};

export default ErrorDisplay;
