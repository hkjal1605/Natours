import tourActionTypes from "./tour.types";
import axios from "axios";

export const fetchTourStart = () => ({
  type: tourActionTypes.FETCH_TOUR_START,
});

export const fetchTourSuccess = (tour) => ({
  type: tourActionTypes.FETCH_TOUR_SUCCESS,
  payload: tour,
});

export const fetchTourFailure = (err) => ({
  type: tourActionTypes.FETCH_TOUR_FAILURE,
  payload: err.response.data,
});

export const fetchTourStartAsync = (tourId) => {
  return async (dispatch) => {
    dispatch(fetchTourStart());

    try {
      const tour = await axios.get(`/api/v1/tours/${tourId}`);
      dispatch(fetchTourSuccess(tour.data.data.doc));
    } catch (err) {
      dispatch(fetchTourFailure(err));
    }
  };
};
