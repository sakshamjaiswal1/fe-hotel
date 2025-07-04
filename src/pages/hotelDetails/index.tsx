import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Hotel, Room } from "@/interface/room.interface";
import { hotelsData } from "@/constants/sample";
import HotelRoomCard from "@/components/common/hotelRoomCard";

const HotelDetails: React.FC = () => {
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize hotel lookup for better performance
  const hotelData = useMemo(() => {
    const foundHotel = hotelsData.find((h) => h.id === hotelId);
    return foundHotel || null;
  }, [hotelId]);

  // Memoize room lookup for better performance
  const roomData = useMemo(() => {
    if (!hotelData || !roomId) return null;
    return hotelData.rooms.find((r) => r.id === roomId) || null;
  }, [hotelData, roomId]);

  useEffect(() => {
    setHotel(hotelData);
    setSelectedRoom(roomData);
    setLoading(false);
  }, [hotelData, roomData]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    // Update URL to include room ID
    navigate(`/hotel/${hotelId}/room/${room.id}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Hotel Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The hotel you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4 flex-shrink-0"
            >
              <svg
                className="w-5 h-5 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Back to Search</span>
              <span className="sm:hidden">Back</span>
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate flex-1 text-center sm:text-left">
              {hotel.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Room Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Rooms ({hotel.rooms.length})
          </h2>

          {selectedRoom ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Selected Room
                </h3>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All Rooms
                </button>
              </div>
              <div className="max-w-2xl">
                <HotelRoomCard
                  room={selectedRoom}
                  onSelect={handleRoomSelect}
                  isSelected={true}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotel.rooms.map((room) => (
                <HotelRoomCard
                  key={room.id}
                  room={room}
                  onSelect={handleRoomSelect}
                  isSelected={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hotel Information */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(hotel.star_rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {hotel.star_rating} Star Hotel
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {hotel.rating.toFixed(1)}/5
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  📍 {hotel.address.street}, {hotel.address.city},{" "}
                  {hotel.address.country}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {hotel.description}
                </p>
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hotel Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {hotel.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Actions */}
        {selectedRoom && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ready to Book?
                </h3>
                <p className="text-gray-600">
                  {selectedRoom.name} - {selectedRoom.price.currency}{" "}
                  {selectedRoom.price.discounted}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    alert("Contact functionality would be implemented here")
                  }
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Hotel
                </button>
                <button
                  onClick={() =>
                    alert("Booking functionality would be implemented here")
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
