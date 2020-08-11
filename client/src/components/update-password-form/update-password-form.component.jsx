import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import axios from "axios";

const MySwal = withReactContent(Swal);

class UpdatePassword extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    try {
      await axios.patch("/api/v1/users/updatePassword", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      this.setState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      await MySwal.fire({
        title: "Sucessfully Changed Password",
        timer: 2000,
        timerProgressBar: false,
      });
    } catch (err) {
      this.setState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      await MySwal.fire({
        title: `${err.response.data.message}`,
        timer: 5000,
        timerProgressBar: false,
      });
    }
  };

  render() {
    return (
      <div className="account-details">
        <h2 className="account-details__heading">CHANGE PASSWORD</h2>
        <form className="account-details__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="currentPassword"
            type="password"
            value={this.state.currentPassword}
            label="Current Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="newPassword"
            type="password"
            value={this.state.newPassword}
            label="New Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="confirmNewPassword"
            type="password"
            value={this.state.confirmNewPassword}
            label="Confirm New Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <div className="buttons-group">
            <CustomButton
              type="submit"
              btnClass="account-details__button"
              content="Change Password"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePassword;
