import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { IGlobalReducerState } from "./interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";

const userDetails = getLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
  isDarkModeEnabled: true,
  isMobile: window?.innerWidth < 768,
  isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
});

export const initialState: IGlobalReducerState = {
  isLoading: false,
  error: "",
  isMobile: window?.innerWidth < 768,
  data: {
    isDarkModeEnabled: userDetails?.isDarkModeEnabled,
    isMboile: userDetails.isMobile,
    isPWAOpened: userDetails?.isPWAOpened,
  },
};

export const globalDataSlice = createSlice({
  name: "themeData",
  initialState,
  reducers: {
    setGlobalData: (
      state,
      { payload }: PayloadAction<IGlobalReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isDarkModeEnabled: payload.isDarkModeEnabled,
        isMobile: payload.isMboile,
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
      });

      if (payload.isDarkModeEnabled) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...payload,
          isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
        },
      };
    },
    globalDataGetFail: (
      state,
      { payload }: PayloadAction<IGlobalReducerState["error"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,

        isDarkModeEnabled: true,

        isMboile: false,
      });

      return {
        ...state,
        isLoading: false,
        error: payload,
        data: {
          isDarkModeEnabled: false,

          isMboile: false,
          isPWAOpened: false,
        },
      };
    },
    resetGlobalData: (state) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,

        isDarkModeEnabled: true,

        isMboile: false,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          isDarkModeEnabled: true,

          isMboile: false,
          isPWAOpened: false,
        },
      };
    },
    setGLobalDataLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setGLobalDataLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    setGLobalMobileData: (state) => {
      return {
        ...state,
        isMobile: window?.innerWidth < 768,
      };
    },
  },
});

// Export actions
export const {
  setGlobalData,
  globalDataGetFail,
  resetGlobalData,
  setGLobalDataLoadingStart,
  setGLobalDataLoadingEnd,
  setGLobalMobileData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
