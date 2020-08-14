import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserBooking = createSelector(
  [selectUser],
  (user) => user.bookings
);

export const selectIsBookingsFetching = createSelector(
  [selectUser],
  (user) => user.isBookingsFetching
);
