import toursActionTypes from "./tours.types";

const INITIAL_STATE = {
  tours: null,
  isFetching: false,
  errorMessage: undefined,
};

const toursReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case toursActionTypes.FETCH_TOURS_START:
      return {
        ...state,
        isFetching: true,
      };
    case toursActionTypes.FETCH_TOURS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tours: action.payload,
      };
    case toursActionTypes.FETCH_TOURS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default toursReducer;
