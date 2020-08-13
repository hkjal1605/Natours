import React from "react";

import "./description.styles.scss";

const DescriptionSection = () => (
  <main className="description">
    <h2 className="description__heading">
      Exciting tours for adventurous people
    </h2>
    <div className="description__content">
      <div className="description__content--left">
        <h3 className="description__content--heading">
          You are going to fall in love with nature
        </h3>
        <p className="description__content--paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <h3 className="description__content--heading">
          Live adventures like you never have before
        </h3>
        <p className="description__content--paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>
      <div className="description__content--right">
        <div className="description__content--img-container">
          <img
            src="/img/nat-1.jpg 300w"
            alt="Photo 1"
            className="description__content--photo photo-1"
            src="img/nat-1-large.jpg"
          />

          <img
            src="/img/nat-2.jpg 300w"
            alt="Photo 2"
            className="description__content--photo photo-2"
            src="img/nat-2-large.jpg"
          />

          <img
            src="/img/nat-3.jpg 300w"
            sizes="(max-width: 900px) 20vw, (max-width: 600px) 30vw, 300px"
            alt="Photo 3"
            className="description__content--photo photo-3"
            src="img/nat-3-large.jpg"
          />
        </div>
      </div>
    </div>
  </main>
);

export default DescriptionSection;
