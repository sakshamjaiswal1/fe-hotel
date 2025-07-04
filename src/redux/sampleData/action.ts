import { Hotel } from "../../interface/room.interface";

// Action Types
export const LOAD_SAMPLE_DATA_REQUEST = "LOAD_SAMPLE_DATA_REQUEST";
export const LOAD_SAMPLE_DATA_SUCCESS = "LOAD_SAMPLE_DATA_SUCCESS";
export const LOAD_SAMPLE_DATA_FAILURE = "LOAD_SAMPLE_DATA_FAILURE";

// Action Interfaces
export interface LoadSampleDataRequestAction {
  type: typeof LOAD_SAMPLE_DATA_REQUEST;
}

export interface LoadSampleDataSuccessAction {
  type: typeof LOAD_SAMPLE_DATA_SUCCESS;
  payload: Hotel[];
}

export interface LoadSampleDataFailureAction {
  type: typeof LOAD_SAMPLE_DATA_FAILURE;
  payload: string;
}

export type SampleDataActionTypes =
  | LoadSampleDataRequestAction
  | LoadSampleDataSuccessAction
  | LoadSampleDataFailureAction;

// Action Creators
export const loadSampleDataRequest = (): LoadSampleDataRequestAction => ({
  type: LOAD_SAMPLE_DATA_REQUEST,
});

export const loadSampleDataSuccess = (
  data: Hotel[]
): LoadSampleDataSuccessAction => ({
  type: LOAD_SAMPLE_DATA_SUCCESS,
  payload: data,
});

export const loadSampleDataFailure = (
  error: string
): LoadSampleDataFailureAction => ({
  type: LOAD_SAMPLE_DATA_FAILURE,
  payload: error,
});

// Async Action Creator
export const loadSampleData = () => {
  return async (dispatch: any) => {
    dispatch(loadSampleDataRequest());

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Import the hotels data
      const { hotelsData } = await import("../../constants/sample");

      dispatch(loadSampleDataSuccess(hotelsData));
    } catch (error) {
      dispatch(
        loadSampleDataFailure(
          error instanceof Error ? error.message : "Failed to load data"
        )
      );
    }
  };
};

export {
  setSampleData,
  setSampleDataLoadingStart,
  setSampleDataLoadingEnd,
  setSampleDataError,
  resetSampleData,
} from "./reducer";
