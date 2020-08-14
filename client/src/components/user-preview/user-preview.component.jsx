import React from "react";

import "./user-preview.styles.scss";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUserBookingsStartAsync } from "../../redux/user/user.actions";

import { ReactComponent as Settings } from "../../icons/settings.svg";
import { ReactComponent as Booking } from "../../icons/booking.svg";
import { ReactComponent as Rating } from "../../icons/star.svg";
import { ReactComponent as Billing } from "../../icons/invoice.svg";

import UpdatePassword from "../update-password-form/update-password-form.component";
import UpdateUserData from "../update-user-form/update-user-form.component";

class UserPreview extends React.Component {
  componentDidMount() {
    const { getUserBookings } = this.props;
    getUserBookings();
  }
  render() {
    return (
      <div className="user-preview">
        <nav className="user-preview__sidebar">
          <ul className="side-nav">
            <li className="side-nav__item side-nav__item--active">
              <a href="/profile" className="side-nav__link">
                <Settings className="side-nav__icon" />
                <span className="side-nav__text">Settings</span>
              </a>
            </li>
            <li className="side-nav__item">
              <Link to="/profile/bookings" className="side-nav__link link">
                <Booking className="side-nav__icon" />
                <span className="side-nav__text">My Bookings</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <a href="#" className="side-nav__link">
                <Rating className="side-nav__icon" />
                <span className="side-nav__text">My Ratings</span>
              </a>
            </li>
            <li className="side-nav__item">
              <a href="#" className="side-nav__link">
                <Billing className="side-nav__icon" />
                <span className="side-nav__text">Billings</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="user-preview__content">
          <UpdateUserData />
          <span className="user-preview__content--partition">&nbsp;</span>
          <UpdatePassword />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserBookings: () => dispatch(getUserBookingsStartAsync()),
});

export default connect(null, mapDispatchToProps)(UserPreview);
