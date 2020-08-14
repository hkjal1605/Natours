import bookingActionTypes from "./booking.types";

const INITIAL_STATE = {
  session: null,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bookingActionTypes.GET_CHECKOUT_SESSION:
      return {
        ...state,
        session: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;
