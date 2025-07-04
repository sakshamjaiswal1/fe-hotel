import {
  SampleDataActionTypes,
  LOAD_SAMPLE_DATA_REQUEST,
  LOAD_SAMPLE_DATA_SUCCESS,
  LOAD_SAMPLE_DATA_FAILURE,
} from "./action";
import { SampleDataState } from "./interface";

const initialState: SampleDataState = {
  data: null,
  loading: false,
  error: null,
};

const sampleDataReducer = (
  state = initialState,
  action: SampleDataActionTypes
): SampleDataState => {
  switch (action.type) {
    case LOAD_SAMPLE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_SAMPLE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case LOAD_SAMPLE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Action creators for compatibility
export const setSampleData = (data: any) => ({
  type: LOAD_SAMPLE_DATA_SUCCESS,
  payload: data,
});

export const setSampleDataLoadingStart = () => ({
  type: LOAD_SAMPLE_DATA_REQUEST,
});

export const setSampleDataLoadingEnd = () => ({
  type: LOAD_SAMPLE_DATA_SUCCESS,
  payload: [],
});

export const setSampleDataError = (error: string) => ({
  type: LOAD_SAMPLE_DATA_FAILURE,
  payload: error,
});

export const resetSampleData = () => ({
  type: LOAD_SAMPLE_DATA_SUCCESS,
  payload: null,
});

export default sampleDataReducer;
