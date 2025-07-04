import React, { useState } from "react";
import { Room } from "../../../interface/room.interface";
import OptimizedVideo from "../optimizedVideo";

interface HotelRoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  className?: string;
  isSelected?: boolean;
}

const HotelRoomCard: React.FC<HotelRoomCardProps> = ({
  room,
  onSelect,
  className = "",
  isSelected = false,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Get media for the room (videos first, then images)
  const getMediaItems = () => {
    const mediaItems: Array<{
      url: string;
      type: "video" | "image";
      index: number;
    }> = [];

    if (room.video_url && room.video_url.length > 0) {
      mediaItems.push(
        ...room.video_url.map((url, index) => ({
          url,
          type: "video" as const,
          index,
        }))
      );
    }

    if (room.room_images && room.room_images.length > 0) {
      mediaItems.push(
        ...room.room_images.map((url, index) => ({
          url,
          type: "image" as const,
          index,
        }))
      );
    }

    return mediaItems;
  };

  const mediaItems = getMediaItems();
  const currentMedia = mediaItems[currentMediaIndex];

  const handleSelect = () => {
    if (onSelect) {
      onSelect(room);
    }
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } ${className}`}
    >
      {/* Media Section */}
      {mediaItems.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={`${room.name} - ${currentMedia.type} ${
                currentMedia.index + 1
              }`}
              className="w-full h-full object-cover"
            />
          ) : (
            <OptimizedVideo
              src={currentMedia.url}
              alt={`${room.name} - video tour`}
              className="w-full h-full"
              autoPlay={true}
              respectDataSaver={true}
              loadingDistance={200}
              playVisibility={0.3}
            />
          )}

          {/* Media Navigation */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
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
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
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

          {/* Availability Badge */}
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
              room.availability
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {room.availability ? "Available" : "Unavailable"}
          </div>
        </div>
      )}

      {/* Room Details */}
      <div className="p-4">
        {/* Room Name and Size */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {room.name}
          </h3>
          <span className="text-sm text-gray-500 ml-2">{room.size}</span>
        </div>

        {/* Room Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
              />
            </svg>
            {room.bed_type}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {room.capacity.adults} adults, {room.capacity.children} children
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {room.price.currency} {room.price.discounted}
          </span>
          {room.price.original > room.price.discounted && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {room.price.currency} {room.price.original}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                {room.price.discount_percentage}% OFF
              </span>
            </>
          )}
          <span className="text-sm text-gray-500">per night</span>
        </div>

        {/* Amenities Preview */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-3">
          <p className="text-xs text-green-600 flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {room.cancellation_policy}
          </p>
        </div>

        {/* Select Button */}
        <button
          onClick={handleSelect}
          disabled={!room.availability}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            room.availability
              ? isSelected
                ? "bg-blue-700 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSelected
            ? "Selected"
            : room.availability
            ? "Select Room"
            : "Not Available"}
        </button>
      </div>
    </div>
  );
};

export default HotelRoomCard;
