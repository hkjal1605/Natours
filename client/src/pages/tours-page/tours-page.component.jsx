import React from "react";

import "./tours-page.styles.scss";

import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { fetchToursStartAsync } from "../../redux/tours/tours.actions";
import { selectIsTourListFetching } from "../../redux/tours/tours.selector";

import AllTours from "../../components/all-tours/all-tours.component";
import IndividualTourPage from "../individual-tour-page/individual-tour-page.components";
import WithSpinner from "../../components/withSpinner/withSpinner.component";
import { createStructuredSelector } from "reselect";

const AllToursWithSpinner = WithSpinner(AllTours);

class ToursPage extends React.Component {
  componentDidMount() {
    const { fetchToursStartAsync } = this.props;
    fetchToursStartAsync();
  }
  render() {
    const { match, isToursListLoading } = this.props;
    return (
      <div className="tours-page">
        <Route
          exact
          path={`${match.path}/`}
          render={() => <AllToursWithSpinner isLoading={isToursListLoading} />}
        />
        <Route
          exact
          path={`${match.path}/:tourId`}
          component={IndividualTourPage}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isToursListLoading: selectIsTourListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToursStartAsync: () => dispatch(fetchToursStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToursPage);
