import tourActionTypes from "./tour.types";

const INITIAL_STATE = {
  tour: null,
  isFetching: false,
  errorMessage: undefined,
};

const tourReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tourActionTypes.FETCH_TOUR_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: undefined,
      };
    case tourActionTypes.FETCH_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tour: action.payload,
        errorMessage: undefined,
      };
    case tourActionTypes.FETCH_TOUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default tourReducer;
