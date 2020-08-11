import React from "react";

import axios from "axios";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";

import { selectCurrentUser } from "../../redux/user/user.selector";
import { getCheckoutSessionStartAsync } from "../../redux/booking/booking.actions";

import "./booking-button.styles.scss";

class BookingButton extends React.Component {
  state = {
    tour: this.props.tour,
    user: this.props.currentUser,
  };

  loadPaymentSession = async () => {
    const { getCheckoutSession } = this.props;
    try {
      getCheckoutSession(this.state.tour._id);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="booking-section">
        <img
          src="https://natours-tourbook.herokuapp.com/img/logo-green-round.png"
          className="booking-section__logo"
        />
        <div className="booking-section__content">
          <h3 className="booking-section__content--heading">
            What are you waiting for?
          </h3>
          <h5 className="booking-section__content--text">{`${this.state.tour.duration} days, 1 adventure, Infinite memories. Make it yours today!`}</h5>
        </div>
        {this.state.user ? (
          <CustomButton
            content="BOOK NOW"
            btnClass="booking-section__button"
            onClick={this.loadPaymentSession}
          />
        ) : (
          <Link to="/login" className="link">
            <CustomButton
              content="Login to book tour"
              btnClass="booking-section__button"
            />
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCheckoutSession: (tourId) =>
    dispatch(getCheckoutSessionStartAsync(tourId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingButton);
