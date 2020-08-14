import bookingActionTypes from "./booking.types";

import axios from "axios";
const stripe = Stripe(
  "pk_test_51GwpU2Fo5XmFAfjGPojSqx7xuCiHbcnXkXhRknLiC2TIqt0cdudEpB73jh9Zn58dj0ZAHVGcghLwezav9ZnEIGm500alh1iXTY"
);

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});

export const getCheckoutSessionStartAsync = (tourId) => {
  return async (dispatch) => {
    try {
      const session = await axios.get(
        `/api/v1/booking/checkout-session/${tourId}`
      );
      dispatch(getCheckoutSession(session));

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
