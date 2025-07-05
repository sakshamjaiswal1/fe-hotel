import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SampleDataState } from "./interface";
import { Hotel } from "../../interface/room.interface";

export const initialState: SampleDataState = {
  data: null,
  loading: false,
  error: null,
};

export const sampleDataSlice = createSlice({
  name: "sampleData",
  initialState,
  reducers: {
    setSampleData: (state, { payload }: PayloadAction<Hotel[] | null>) => {
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    },
    setSampleDataLoadingStart: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    setSampleDataLoadingEnd: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    setSampleDataError: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    resetSampleData: (state) => {
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };
    },
  },
});

// Export actions
export const {
  setSampleData,
  setSampleDataLoadingStart,
  setSampleDataLoadingEnd,
  setSampleDataError,
  resetSampleData,
} = sampleDataSlice.actions;

export default sampleDataSlice.reducer;
