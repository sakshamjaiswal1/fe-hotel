import { combineReducers } from "@reduxjs/toolkit";
import globalDataReducer from "./globalData/reducer";
import sampleDataReducer from "./sampleData/reducer";

export const rootReducers = combineReducers({
  globalData: globalDataReducer,
  sampleData: sampleDataReducer,
});
export type RootState = ReturnType<typeof rootReducers>;
