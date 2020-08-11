import topToursActionTypes from "./top-tours.types";

const INITIAL_STATE = {
  topTours: null,
  isFetching: false,
  errorMessage: undefined,
};

const topToursReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case topToursActionTypes.FETCH_TOPTOURS_START:
      return {
        ...state,
        isFetching: true,
      };
    case topToursActionTypes.FETCH_TOPTOURS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topTours: action.payload,
      };
    case topToursActionTypes.FETCH_TOPTOURS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default topToursReducer;
