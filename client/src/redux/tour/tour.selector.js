import { createSelector } from "reselect";

export const selectTour = (state) => state.tour;

export const selectTourForPreview = createSelector([selectTour], (tour) =>
  tour ? tour.tour : null
);

export const selectTourErrorMessage = createSelector([selectTour], (tour) =>
  tour ? tour.errorMessage : null
);

export const selectIsTourFetching = createSelector(
  [selectTour],
  (tour) => tour.isFetching
);
