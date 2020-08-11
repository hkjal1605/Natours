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
