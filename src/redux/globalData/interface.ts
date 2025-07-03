export interface IGlobalData {
  isDarkModeEnabled: boolean;
  isMboile: boolean;
  isPWAOpened: boolean;
}

export interface IGlobalReducerState {
  isLoading: boolean;
  error: string;
  data: IGlobalData;
  isMobile: boolean;
}
