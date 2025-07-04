import { Hotel } from "../../interface/room.interface";

export interface SampleDataState {
  data: Hotel[] | null;
  loading: boolean;
  error: string | null;
}
