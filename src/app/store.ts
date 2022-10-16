import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import readerReducer from "features/reader/readerSlice";
import personReducer from "features/person/personSlice";
import corporateReducer from "features/corporate/corporateSlice";
import calculatorReducer from "features/calculator/calculatorSlice";
import loadingReducer from "features/loading/loadingSlice";

const rootReducer = combineReducers({
  reader: readerReducer,
  person: personReducer,
  corporate: corporateReducer,
  calculator: calculatorReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
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
