import topToursActionTypes from "./top-tours.types";

import axios from "axios";

export const fetchTopToursStart = () => ({
  type: topToursActionTypes.FETCH_TOPTOURS_START,
});

export const fetchTopToursSuccess = (topTours) => ({
  type: topToursActionTypes.FETCH_TOPTOURS_SUCCESS,
  payload: topTours,
});

export const fetchTopToursFailure = (err) => ({
  type: topToursActionTypes.FETCH_TOPTOURS_FAILURE,
  payload: err,
});

export const fetchTopToursStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchTopToursStart());

    try {
      const Tours = await axios.get("/api/v1/tours?ratingsAverage[gte]=4.8");
      dispatch(fetchTopToursSuccess(Tours.data.data.doc));
    } catch (err) {
      dispatch(fetchTopToursFailure(err));
    }
  };
};
