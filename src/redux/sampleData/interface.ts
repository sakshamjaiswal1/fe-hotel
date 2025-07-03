import { SampleData } from "../../interface/sample.interface";

export interface ISampleDataState {
  isLoading: boolean;
  error: string;
  data: SampleData | null;
}
