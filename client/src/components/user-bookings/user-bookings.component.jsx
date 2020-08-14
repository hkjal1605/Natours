import React from "react";

import "./user-bookings.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserBooking } from "../../redux/user/user.selector";

import TourCard from "../tour-card/tour-card.component";

const UserBookings = ({ bookings }) => {
  return (
    <div className="bookings">
      <div className="bookings__tour-list">
        {bookings.map((booking) => (
          <TourCard key={booking._id} tour={booking.tour} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  bookings: selectUserBooking,
});

export default connect(mapStateToProps)(UserBookings);
