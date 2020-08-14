import UserActionTypes from "./user.types";

const INITIALSTATE = {
  currentUser: null,
  bookings: null,
  isBookingsFetching: false,
  err: null,
};

const userReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.GET_USER_BOOKINGS_START:
      return {
        ...state,
        isBookingsFetching: true,
      };
    case UserActionTypes.GET_USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        isBookingsFetching: false,
        bookings: action.payload,
      };
    case UserActionTypes.GET_USER_BOOKINGS_FAILURE:
      return {
        ...state,
        isBookingsFetching: false,
        err: action.payload,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_START:
      return {
        ...state,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        bookings: null,
      };
    default:
      return state;
  }
};

export default userReducer;
