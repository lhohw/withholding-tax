import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import readerReducer from "features/reader/readerSlice";
import personReducer from "features/person/personSlice";
import corporateReducer from "features/corporate/corporateSlice";
import infoReducer from "features/info/infoSlice";
import paymentReducer from "features/payment/paymentSlice";
import generationReducer from "features/generation/generationSlice";

export const store = configureStore({
  reducer: {
    reader: readerReducer,
    person: personReducer,
    corporate: corporateReducer,
    info: infoReducer,
    payment: paymentReducer,
    generation: generationReducer,
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
export type KnownError = {
  code: number;
  errorMessage: string;
};
