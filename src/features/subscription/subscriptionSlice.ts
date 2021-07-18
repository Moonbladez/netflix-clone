import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SubscriptionDetails } from "./../../Screens/PlansScreen";

export interface SubscriptionState {
  subscription: null | SubscriptionDetails;
}

const initialState: SubscriptionState = {
  subscription: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSubscription } = subscriptionSlice.actions;

export const selectSubscription = (state: RootState) => state.user.user;

export default subscriptionSlice.reducer;
