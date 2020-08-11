import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchTopToursStartAsync } from "../../redux/top-tours/top-tours.actions";
import { selectIsTopToursListFetching } from "../../redux/top-tours/top-tours.selectors";

import "./home-page.styles.scss";

import Header from "../../components/header/header.component";
import DescriptionSection from "../../components/description/description.component";
import FeaturesSection from "../../components/features/features.component";
import TopTours from "../../components/top-tours/top-tours.component";
import Footer from "../../components/footer/footer.component";

import WithSpinner from "../../components/withSpinner/withSpinner.component";

const TopToursWithSpinner = WithSpinner(TopTours);

class HomePage extends React.Component {
  componentDidMount() {
    const { fetchTopTours } = this.props;
    fetchTopTours();
  }
  render() {
    const { topToursIsFetching } = this.props;
    return (
      <div className="home-page">
        <Header />
        <DescriptionSection />
        <FeaturesSection />
        <TopToursWithSpinner isLoading={topToursIsFetching} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  topToursIsFetching: selectIsTopToursListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopTours: () => dispatch(fetchTopToursStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
