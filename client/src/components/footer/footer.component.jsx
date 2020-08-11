import React from "react";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <div className="footer">
      <img src="/img/logo-green-round.png" className="footer__logo" />
      <div className="footer__content">
        <h5 className="footer__content--text">
          This website is built by{" "}
          <a
            href="https://github.com/hkjal1605"
            target="_blank"
            className="github-link"
          >
            Harsh Kumar Jha
          </a>
          as a part of portfolio project and is not meant for any commercial
          purposes.
        </h5>
        <span className="footer__content--contact">Contact Me Here</span>
      </div>
    </div>
  );
};

export default Footer;
