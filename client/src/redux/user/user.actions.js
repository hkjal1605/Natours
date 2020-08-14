import userActionTypes from "./user.types";
import axios from "axios";

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logoutCurrentUserStart = () => ({
  type: userActionTypes.LOGOUT_CURRENT_USER_START,
});

export const logoutCurrentUserSuccess = () => ({
  type: userActionTypes.LOGOUT_CURRENT_USER_SUCCESS,
});

export const getUserBookingsStart = () => ({
  type: userActionTypes.GET_USER_BOOKINGS_START,
});

export const getUserBookingsSuccess = (bookings) => ({
  type: userActionTypes.GET_USER_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const getUserBookingsFailure = (err) => ({
  type: userActionTypes.GET_USER_BOOKINGS_FAILURE,
  payload: err,
});

export const logoutCurrentUserAsync = () => {
  return async (dispatch) => {
    dispatch(logoutCurrentUserStart());
    try {
      const res = await axios.get("/api/v1/users/logout");
      dispatch(logoutCurrentUserSuccess());
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getUserBookingsStartAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getUserBookingsStart());
      const bookings = await axios.get("/api/v1/booking/my-bookings");

      dispatch(getUserBookingsSuccess(bookings.data.data.bookings));
    } catch (err) {
      dispatch(getUserBookingsFailure(err.message));
    }
  };
};
