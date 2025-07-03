import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sampleData } from "../../constants/sample";
import { SampleData } from "../../interface/sample.interface";
import { ISampleDataState } from "./interface";

export const initialState: ISampleDataState = {
  isLoading: false,
  error: "",
  data: null,
};

export const sampleDataSlice = createSlice({
  name: "sampleData",
  initialState,
  reducers: {
    setSampleData: (state, { payload }: PayloadAction<SampleData>) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        data: payload,
      };
    },
    loadSampleData: (state) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        data: sampleData,
      };
    },
    setSampleDataLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    },
    setSampleDataLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    setSampleDataError: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
        data: null,
      };
    },
    resetSampleData: (state) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        data: null,
      };
    },
  },
});

export const {
  setSampleData,
  loadSampleData,
  setSampleDataLoadingStart,
  setSampleDataLoadingEnd,
  setSampleDataError,
  resetSampleData,
} = sampleDataSlice.actions;

export default sampleDataSlice.reducer;
