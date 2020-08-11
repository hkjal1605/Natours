import { createSelector } from "reselect";

export const selectTour = (state) => state.tours;

export const selectToursList = createSelector([selectTour], (tours) =>
  tours ? tours.tours : null
);

export const selectIsTourListFetching = createSelector(
  [selectTour],
  (tours) => tours.isFetching
);
