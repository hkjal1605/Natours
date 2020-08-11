import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./login.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";

import axios from "axios";

const MySwal = withReactContent(Swal);

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { setCurrentUser } = this.props;

    const { email, password } = this.state;

    try {
      console.log("Starting...");
      const user = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("Completed");
      this.setState({ email: "", password: "" });

      await MySwal.fire({
        title: "Sucessfully Logged In!",
        timer: 2000,
        timerProgressBar: false,
      });

      setCurrentUser(user.data.data.user);
    } catch (err) {
      this.setState({ email: "", password: "" });

      await MySwal.fire({
        title: `${err.response.data.message}`,
        timer: 3000,
        timerProgressBar: false,
      });
    }
  };

  render() {
    return (
      <div className="login">
        <h3 className="login__heading">Log Into Your Account</h3>
        <form className="login__form" onSubmit={this.handleSubmit}>
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

          <div className="buttons-group">
            <CustomButton
              type="submit"
              btnClass="login__button"
              content="LOG IN"
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

export default connect(null, mapDispatchToProps)(Login);
