import React, { useState, useMemo } from "react";
import { Hotel } from "../../../interface/room.interface";
import { useNavigate } from "react-router-dom";
import OptimizedVideo from "../../common/optimizedVideo";

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

const HotelCard: React.FC<HotelCardProps> = React.memo(
  ({ hotel, className = "" }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    // Get all media from hotel rooms (videos first, then images) - memoized for performance
    const hotelMediaItems = useMemo(() => {
      const mediaItems: Array<{
        url: string;
        type: "video" | "image";
        roomName: string;
        index: number;
      }> = [];

      // Collect all videos first
      hotel.rooms.forEach((room) => {
        if (room.video_url && room.video_url.length > 0) {
          room.video_url.forEach((url, index) => {
            mediaItems.push({
              url,
              type: "video",
              roomName: room.name,
              index,
            });
          });
        }
      });

      // Then collect all images
      hotel.rooms.forEach((room) => {
        if (room.room_images && room.room_images.length > 0) {
          room.room_images.forEach((url, index) => {
            mediaItems.push({
              url,
              type: "image",
              roomName: room.name,
              index,
            });
          });
        }
        // Fallback to media array if no room_images
        if (
          (!room.room_images || room.room_images.length === 0) &&
          room.media &&
          room.media.length > 0
        ) {
          room.media.forEach((media) => {
            if (media.type === "image") {
              mediaItems.push({
                url: media.url,
                type: "image",
                roomName: room.name,
                index: 0,
              });
            }
          });
        }
      });

      // If no media found, return placeholder
      if (mediaItems.length === 0) {
        mediaItems.push({
          url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=",
          type: "image",
          roomName: "Hotel",
          index: 0,
        });
      }

      return mediaItems;
    }, [hotel.rooms]);

    // Get price range from all rooms - memoized for performance
    const priceRange = useMemo(() => {
      const prices = hotel.rooms.map((room) => room.price.discounted);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const currency = hotel.rooms[0]?.price.currency || "USD";

      if (minPrice === maxPrice) {
        return `${currency} ${minPrice}`;
      }
      return `${currency} ${minPrice} - ${maxPrice}`;
    }, [hotel.rooms]);

    // Get available rooms count - memoized for performance
    const availableRoomsCount = useMemo(() => {
      return hotel.rooms.filter((room) => room.availability).length;
    }, [hotel.rooms]);

    const handleViewDetails = () => {
      navigate(`/hotel/${hotel.id}`);
    };

    // Media navigation functions
    const currentMedia = hotelMediaItems[currentMediaIndex];

    const nextMedia = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentMediaIndex((prev) => (prev + 1) % hotelMediaItems.length);
    };

    const prevMedia = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentMediaIndex(
        (prev) => (prev - 1 + hotelMediaItems.length) % hotelMediaItems.length
      );
    };

    const selectMedia = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentMediaIndex(index);
    };

    return (
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
        onClick={handleViewDetails}
      >
        {/* Hotel Media */}
        <div className="relative h-64 overflow-hidden">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={`${hotel.name} - ${currentMedia.roomName}`}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <OptimizedVideo
              src={currentMedia.url}
              alt={`${hotel.name} - ${currentMedia.roomName} video tour`}
              className="w-full h-full"
              autoPlay={true}
              respectDataSaver={true}
              loadingDistance={200}
              playVisibility={0.3}
            />
          )}

          {!imageLoaded && currentMedia.type === "image" && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}

          {/* Media Navigation */}
          {hotelMediaItems.length > 1 && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity z-10"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity z-10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Media Indicator Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                {hotelMediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => selectMedia(index, e)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMediaIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Hotel Rating Badge */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-1 z-10">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="ml-1 text-sm font-semibold">
                {hotel.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Available Rooms Badge */}
          <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium z-10">
            {availableRoomsCount} rooms available
          </div>
        </div>

        {/* Hotel Details */}
        <div className="p-6">
          {/* Hotel Name */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
          </div>

          {/* Location */}
          <div className="flex items-center mb-3 text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">
              {hotel.address.city}, {hotel.address.country}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
            {hotel.description}
          </p>

          {/* Amenities Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-600">Starting from</span>
              <div className="text-xl font-bold text-gray-900">
                {priceRange}
              </div>
              <span className="text-sm text-gray-600">per night</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {hotel.rooms.length} room types
              </div>
              <div className="text-sm text-green-600 font-medium">
                {availableRoomsCount} available
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            View Details & Book
          </button>
        </div>
      </div>
    );
  }
);

HotelCard.displayName = "HotelCard";

export default HotelCard;
