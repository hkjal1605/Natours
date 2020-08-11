import UserActionTypes from "./user.types";

const INITIALSTATE = {
  currentUser: null,
};

const userReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_START:
      return {
        ...state,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
