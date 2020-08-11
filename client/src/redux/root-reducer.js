import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import topToursReducer from "./top-tours/top-tours.reducer";
import toursReducer from "./tours/tours.reducer";
import tourReducer from "./tour/tour.reducer";
import bookingReducer from "./booking/booking.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  topTours: topToursReducer,
  tours: toursReducer,
  tour: tourReducer,
  booking: bookingReducer,
});

export default persistReducer(persistConfig, rootReducer);
