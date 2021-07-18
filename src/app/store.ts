import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./../features/user/userSlice";
import subscriptionReducer from "./../features/subscription/subscriptionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
