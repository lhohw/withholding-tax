import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import readerReducer from "features/reader/readerSlice";
import personReducer from "features/person/personSlice";
import corporateReducer from "features/corporate/corporateSlice";
import infoReducer from "features/info/infoSlice";
import calculatorReducer from "features/calculator/calculatorSlice";

const rootReducer = combineReducers({
  reader: readerReducer,
  person: personReducer,
  corporate: corporateReducer,
  info: infoReducer,
  calculator: calculatorReducer,
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
