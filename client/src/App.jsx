import React, { lazy, Suspense } from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";

import Navigation from "./components/navigation/navigation.component";

import Spinner from "./components/spinner/spinner.component";

import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./pages/home-page/home-page.component"));
const LoginPage = lazy(() => import("./pages/login-page/login-page.component"));
const SignupPage = lazy(() =>
  import("./pages/signup-page/signup-page.component")
);
const ToursPage = lazy(() => import("./pages/tours-page/tours-page.component"));
const UserPage = lazy(() => import("./pages/user-page/user-page.component"));

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
