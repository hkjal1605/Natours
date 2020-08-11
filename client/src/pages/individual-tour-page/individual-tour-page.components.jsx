import React from "react";

import "./individual-tour-page.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchTourStartAsync } from "../../redux/tour/tour.action";
import { selectIsTourFetching } from "../../redux/tour/tour.selector";

import TourPreview from "../../components/tour-preview/tour-preview.component";
import WithSpinner from "../../components/withSpinner/withSpinner.component";

const TourPreviewWithSpinner = WithSpinner(TourPreview);

class IndividualTourPage extends React.Component {
  componentDidMount() {
    const { fetchTourStartAsync, match } = this.props;
    fetchTourStartAsync(match.params.tourId);
  }
  render() {
    const { isTourFetching } = this.props;
    return (
      <div className="individual-tour">
        <TourPreviewWithSpinner isLoading={isTourFetching} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isTourFetching: selectIsTourFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTourStartAsync: (tourId) => dispatch(fetchTourStartAsync(tourId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualTourPage);
