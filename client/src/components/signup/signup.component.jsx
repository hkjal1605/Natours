import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./signup.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";

import axios from "axios";

const MySwal = withReactContent(Swal);

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { setCurrentUser } = this.props;

    const { name, email, password, confirmPassword } = this.state;

    try {
      const user = await axios.post("/api/v1/users/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      this.setState({ name: "", email: "", password: "", confirmPassword: "" });

      await MySwal.fire({
        title: "Sucessfully Signed Up!",
        timer: 2000,
        timerProgressBar: false,
      });

      setCurrentUser(user.data.data.user);
    } catch (err) {
      await MySwal.fire({
        title: `${err.response.data.message}`,
        timer: 4000,
        timerProgressBar: false,
      });
    }
  };

  render() {
    return (
      <div className="signup">
        <h3 className="signup__heading">Create Your Account!</h3>
        <form className="signup__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="name"
            type="name"
            value={this.state.name}
            label="Name"
            placeholder=""
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="Email"
            placeholder="you@example.com"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            label="Confirm Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <div className="buttons-group">
            <CustomButton
              type="submit"
              btnClass="login__button"
              content="SIGNUP"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
