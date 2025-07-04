import { RootState } from "../rootreducers";
import { Hotel, Room } from "../../interface/room.interface";

// Basic selectors
export const selectSampleData = (state: RootState): Hotel[] | null =>
  state.sampleData.data;

export const selectSampleDataLoading = (state: RootState): boolean =>
  state.sampleData.loading;

export const selectSampleDataError = (state: RootState): string | null =>
  state.sampleData.error;

// Hotel selectors
export const selectAllHotels = (state: RootState): Hotel[] =>
  state.sampleData.data || [];

export const selectHotelById =
  (hotelId: string) =>
  (state: RootState): Hotel | undefined =>
    state.sampleData.data?.find((hotel) => hotel.id === hotelId);

export const selectHotelDetails = (state: RootState): Hotel | null => {
  const hotels = state.sampleData.data;
  return hotels && hotels.length > 0 ? hotels[0] : null;
};

// Room selectors
export const selectAllRooms = (state: RootState): Room[] => {
  const hotels = state.sampleData.data;
  if (!hotels) return [];

  return hotels.reduce((allRooms: Room[], hotel) => {
    return [...allRooms, ...hotel.rooms];
  }, []);
};

export const selectRoomsByHotelId =
  (hotelId: string) =>
  (state: RootState): Room[] => {
    const hotel = selectHotelById(hotelId)(state);
    return hotel?.rooms || [];
  };

export const selectRoomById =
  (roomId: string) =>
  (state: RootState): Room | undefined => {
    const allRooms = selectAllRooms(state);
    return allRooms.find((room) => room.id === roomId);
  };

// Legacy compatibility selectors
export const selectRoomsBySerialNo = (): any[] => {
  // For backward compatibility, return empty array
  return [];
};
