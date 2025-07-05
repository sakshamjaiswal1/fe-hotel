import { AppDispatch } from "../../store";
import {
  setSampleData,
  setSampleDataLoadingStart,
  setSampleDataLoadingEnd,
  setSampleDataError,
  resetSampleData,
} from "./reducer";

// Async Action Creator for loading sample data
export const loadSampleData = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSampleDataLoadingStart());

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Import the hotels data
      const { hotelsData } = await import("../../constants/sample");

      dispatch(setSampleData(hotelsData));
    } catch (error) {
      dispatch(
        setSampleDataError(
          error instanceof Error ? error.message : "Failed to load data"
        )
      );
    }
  };
};

// Export all actions for easy importing
export {
  setSampleData,
  setSampleDataLoadingStart,
  setSampleDataLoadingEnd,
  setSampleDataError,
  resetSampleData,
};
