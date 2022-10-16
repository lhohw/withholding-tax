import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingState = {
  loading: boolean;
};
const initialState: LoadingState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      const { payload: loading } = action;
      state.loading = loading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
