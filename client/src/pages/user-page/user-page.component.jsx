import React from "react";

import "./user-page.styles.scss";

import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsBookingsFetching,
} from "../../redux/user/user.selector";

import UserPreview from "../../components/user-preview/user-preview.component";
import UserBookings from "../../components/user-bookings/user-bookings.component";

import WithSpinner from "../../components/withSpinner/withSpinner.component";

const UserBookingsWithSpinner = WithSpinner(UserBookings);

const UserPage = ({ currentUser, selectIsBookingsFetching, match }) => {
  if (currentUser) {
    return (
      <div className="user-page">
        <Route exact path={`${match.path}/`} render={() => <UserPreview />} />
        <Route
          exact
          path={`${match.path}/bookings`}
          render={() => (
            <UserBookingsWithSpinner isLoading={selectIsBookingsFetching} />
          )}
        />
      </div>
    );
  } else {
    return (
      <div className="user-page__error">
        <h1 className="error__message-1">
          YOU DON'T HAVE THE PERMISSION TO VIEW THIS PAGE!!! <br />
          LOGIN TO GET ACCESS TO THIS PAGE!
        </h1>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isBookingsLoading: selectIsBookingsFetching,
});

export default connect(mapStateToProps)(UserPage);
