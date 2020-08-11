import React from "react";

import "./header.styles.scss";

import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";

const Header = () => (
  <header className="header">
    <div className="header__text-box">
      <h1 className="header__text-box--heading-primary">
        <span className="heading-primary-main">Outdoors</span>
        <span className="heading-primary-sub">is where life happens</span>
      </h1>
      <Link to="/all-tours">
        <CustomButton
          content="DISCOVER OUR TOURS"
          btnClass="header__text-box--btn"
        />
      </Link>
    </div>
  </header>
);

export default Header;
