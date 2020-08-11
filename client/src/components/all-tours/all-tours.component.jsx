import React from "react";

import "./all-tours.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectToursList } from "../../redux/tours/tours.selector";

import TourCard from "../tour-card/tour-card.component";

const AllTours = ({ toursList }) => {
  return (
    <div className="all-tours">
      <h3 className="all-tours__heading">ALL TOURS</h3>
      <div className="all-tours__tour-list">
        {toursList
          ? toursList.map((tour) => <TourCard key={tour.id} tour={tour} />)
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  toursList: selectToursList,
});

export default connect(mapStateToProps)(AllTours);
