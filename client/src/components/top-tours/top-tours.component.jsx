import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import TourCard from "../tour-card/tour-card.component";
import CustomButton from "../custom-button/custom-button.component";

import "./top-tours.styles.scss";

import { selectTopToursList } from "../../redux/top-tours/top-tours.selectors";

const TopTours = ({ topTours }) => {
  return (
    <div className="top-tours">
      <h3 className="top-tours__heading">Our Top Tours</h3>
      <div className="top-tours__tour-card">
        {topTours
          ? topTours.map((tour) => {
              return <TourCard key={tour.id} tour={tour} />;
            })
          : null}
      </div>
      <Link to="/all-tours">
        <CustomButton content="Discover All Tours" btnClass="btn_viewAll" />
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  topTours: selectTopToursList,
});

export default connect(mapStateToProps)(TopTours);
