import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selector";
import { setCurrentUser } from "../../redux/user/user.actions";

const MySwal = withReactContent(Swal);

class UpdateUserData extends React.Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    photo: this.props.currentUser.photo,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  photoChange = (event) => {
    this.setState({ photo: event.target.files[0] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, photo } = this.state;
    const { setCurrentUser } = this.props;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    try {
      const updatedUser = await axios.patch("/api/v1/users/updateMe", formData);

      await MySwal.fire({
        title: "Sucessfully Updated Details!",
        timer: 2000,
        timerProgressBar: false,
      });

      setCurrentUser(updatedUser.data.data.user);
      console.log(updatedUser.data);
    } catch (err) {
      console.log(err.response.data);
      this.setState({
        email: this.props.currentUser.email,
        name: this.props.currentUser.name,
      });

      await MySwal.fire({
        title: `${err.response.data.message}`,
        timer: 3000,
        timerProgressBar: false,
      });
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="account-details">
        <h2 className="account-details__heading">YOUR ACCOUNT SETTINGS</h2>
        <form className="account-details__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="name"
            type="name"
            placeholder={currentUser.name}
            value={this.state.name}
            label="Name"
            handleChange={this.handleChange}
          />

          <FormInput
            name="email"
            type="email"
            placeholder={currentUser.email}
            value={this.state.email}
            label="Email"
            handleChange={this.handleChange}
          />

          <div className="account-details__photo-container">
            <img
              src={`/img/users/${currentUser.photo}`}
              className="account-details__photo-container--photo"
            />

            <FormInput
              name="photo"
              type="file"
              // placeholder={currentUser.email}
              // value={this.state.email}
              handleChange={this.photoChange}
            />
          </div>

          <CustomButton
            type="submit"
            btnClass="account-details__button"
            content="Save Settings"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserData);
