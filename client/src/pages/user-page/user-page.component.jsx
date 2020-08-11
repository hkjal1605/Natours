import React from "react";

import "./user-page.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import UserPreview from "../../components/user-preview/user-preview.component";

const UserPage = ({ currentUser }) => {
  if (currentUser) {
    return (
      <div className="user-page">
        <UserPreview />
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
});

export default connect(mapStateToProps)(UserPage);
