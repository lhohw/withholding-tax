import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import readerReducer from "features/reader/readerSlice";
import personReducer from "features/person/personSlice";
import corporateReducer from "features/corporate/corporateSlice";
import paymentReducer from "features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    reader: readerReducer,
    person: personReducer,
    corporate: corporateReducer,
    payment: paymentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
