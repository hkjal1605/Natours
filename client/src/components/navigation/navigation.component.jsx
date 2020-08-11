import React from "react";

import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selector";
import { logoutCurrentUserAsync } from "../../redux/user/user.actions";

import "./navigation.styles.scss";

const Navigation = ({ currentUser, logoutUser }) => {
  return (
    <div className="navigation">
      <Link className="link" to="/all-tours">
        <h4 className="navigation__text">ALL TOURS</h4>
      </Link>
      <Link className="link" to="/">
        <img
          src={`/img/logo-white.png`}
          alt="Logo"
          className="navigation__logo"
        />
      </Link>

      {currentUser ? (
        <div className="navigation__user">
          <h4
            className="navigation__user--text navigation__text"
            onClick={() => logoutUser()}
          >
            LOG OUT
          </h4>
          <Link className="link" to="/profile">
            <div className="navigation__user--details">
              {currentUser.photo ? (
                <img
                  src={`/img/users/${currentUser.photo}`}
                  className="user-photo"
                />
              ) : null}
              <h4 className="navigation__text user-name">
                {currentUser.name.split(" ")[0]}
              </h4>
            </div>
          </Link>
        </div>
      ) : (
        <div className="navigation__user">
          <Link className="link" to="/login">
            <h4 className="navigation__user--text navigation__text">LOG IN</h4>
          </Link>
          <Link className="link" to="/signup">
            <h4 className="navigation__user--text navigation__text signup-link">
              SIGN UP
            </h4>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutCurrentUserAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
