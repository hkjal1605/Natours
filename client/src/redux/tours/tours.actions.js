import toursActionTypes from "./tours.types";
import axios from "axios";

export const fetchToursStart = () => ({
  type: toursActionTypes.FETCH_TOURS_START,
});

export const fetchToursSuccess = (tours) => ({
  type: toursActionTypes.FETCH_TOURS_SUCCESS,
  payload: tours,
});

export const fetchToursFailure = (err) => ({
  type: toursActionTypes.FETCH_TOURS_FAILURE,
  payload: err,
});

export const fetchToursStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchToursStart());

    try {
      const tours = await axios.get("/api/v1/tours");
      dispatch(fetchToursSuccess(tours.data.data.doc));
    } catch (err) {
      dispatch(fetchToursFailure(err));
    }
  };
};
