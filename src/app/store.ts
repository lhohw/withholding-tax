import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import readerReducer from "features/reader/readerSlice";
import personReducer from "features/person/personSlice";

export const store = configureStore({
  reducer: {
    reader: readerReducer,
    person: personReducer,
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
