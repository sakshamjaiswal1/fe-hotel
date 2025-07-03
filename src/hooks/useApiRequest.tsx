import { useReducer, useCallback } from "react";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { FixTypeLater } from "react-redux";
// import qs from 'querystring';

type fetchAction = "FETCHING" | "SUCCESS" | "ERROR";

const API_BASE_URL = "/api";

export const initialState = {
  status: null,
  response: null,
};

const reducer = (state = initialState, action: FixTypeLater): FixTypeLater => {
  switch (action.type) {
    case "FETCHING":
      return { ...initialState, status: "FETCHING" };
    case "SUCCESS":
      return { ...state, status: "SUCCESS", response: action.response };
    case "ERROR":
      return { ...state, status: "ERROR", response: action.response };
    default:
      return state;
  }
};

// Actions
const fetching = () => ({ type: "FETCHING" });
const success = (response: FixTypeLater) => ({ type: "SUCCESS", response });
const error = (response: FixTypeLater) => ({ type: "ERROR", response });

type Params = {
  verb?: string;
  params?: { [index: string]: unknown };
  cancel?: CancelTokenSource;
};
type MakeRequestWithParams = (
  endpoint?: string,
  localParams?: Params
) => Promise<void>;

type UseApiRequest = [
  { status: fetchAction; response: FixTypeLater },
  MakeRequestWithParams
];

export const useApiRequest = (
  endpoint: string,
  { verb = "get", params = undefined } = {}
): UseApiRequest => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = useCallback(
    async (localEndpoint?: string, localParams?: Params) => {
      const apiEndpoint = localEndpoint || endpoint;
      const apiParams = localParams?.params || params;
      const apiVerb = localParams?.verb || verb;
      dispatch(fetching());

      try {
        const axiosInstance = axios.create({
          baseURL: API_BASE_URL, // Replace with your base URL
          timeout: 5000,
        });

        const response = await axiosInstance({
          method: apiVerb,
          url: apiEndpoint,
          data: apiParams,
          params: apiVerb === "get" ? apiParams : undefined,
          paramsSerializer: (params) => JSON.stringify(params),
        } as AxiosRequestConfig);
        dispatch(success(response));
      } catch (e) {
        dispatch(error(e));
        console.error(e);
      }
    },
    [endpoint, verb, params]
  );

  return [state, makeRequest];
};
