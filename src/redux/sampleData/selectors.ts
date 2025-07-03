import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootreducers";

const selectSampleDataState = (state: RootState) => state.sampleData;

export const selectSampleData = createSelector(
  [selectSampleDataState],
  (sampleDataState) => sampleDataState.data
);

export const selectSampleDataLoading = createSelector(
  [selectSampleDataState],
  (sampleDataState) => sampleDataState.isLoading
);

export const selectSampleDataError = createSelector(
  [selectSampleDataState],
  (sampleDataState) => sampleDataState.error
);

export const selectHotelDetails = createSelector(
  [selectSampleData],
  (sampleData) => sampleData?.hotel_details || null
);

export const selectAvailId = createSelector(
  [selectSampleData],
  (sampleData) => sampleData?.avail_id || null
);

export const selectRoomsBySerialNo = createSelector(
  [selectSampleData],
  (sampleData) => sampleData?.rooms_by_serial_no || []
);
