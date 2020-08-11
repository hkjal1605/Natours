import React from "react";

import "./features.styles.scss";

import { ReactComponent as Globe } from "../../icons/globe.svg";
import { ReactComponent as Sun } from "../../icons/sun.svg";
import { ReactComponent as Map } from "../../icons/map.svg";
import { ReactComponent as Heart } from "../../icons/heart.svg";

const FeaturesSection = () => (
  <section className="features">
    <div className="features__child">
      <div className="features__box">
        <Globe className="features__box--icon" />
        <h3 className="features__box--heading">Explore the world</h3>
        <p className="features__box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="features__box">
        <Sun className="features__box--icon" />
        <h3 className="features__box--heading">Meet Nature</h3>
        <p className="features__box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="features__box">
        <Map className="features__box--icon" />
        <h3 className="features__box--heading">Find your way</h3>
        <p className="features__box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="features__box">
        <Heart className="features__box--icon" />
        <h3 className="features__box--heading">Live Healthy</h3>
        <p className="features__box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
