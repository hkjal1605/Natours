import { createSelector } from "reselect";

const selectTopTour = (state) => state.topTours;

export const selectTopToursList = createSelector(
  [selectTopTour],
  (topTours) => topTours.topTours
);

export const selectIsTopToursListFetching = createSelector(
  [selectTopTour],
  (topTours) => topTours.isFetching
);
