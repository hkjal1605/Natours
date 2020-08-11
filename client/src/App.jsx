import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";

import Navigation from "./components/navigation/navigation.component";
import HomePage from "./pages/home-page/home-page.component";
import LoginPage from "./pages/login-page/login-page.component";
import SignupPage from "./pages/signup-page/signup-page.component";
import ToursPage from "./pages/tours-page/tours-page.component";
import UserPage from "./pages/user-page/user-page.component";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <LoginPage />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignupPage />
            }
          />
          <Route path="/all-tours" component={ToursPage} />
          <Route path="/profile" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
