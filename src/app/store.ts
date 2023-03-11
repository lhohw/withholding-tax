import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";

import corporateReducer from "features/corporate/corporateSlice";
import calculatorReducer from "features/calculator/calculatorSlice";
import loadingReducer from "features/loading/loadingSlice";
import darkModeReducer from "features/darkMode/darkModeSlice";

const rootReducer = combineReducers({
  corporate: corporateReducer,
  calculator: calculatorReducer,
  loading: loadingReducer,
  darkMode: darkModeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;
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
