import React from "react";

interface HotelRoomCardSkeletonProps {
  className?: string;
}

const HotelRoomCardSkeleton: React.FC<HotelRoomCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {/* Media Skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse">
        {/* Navigation Buttons Skeleton */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>

        {/* Indicator Dots Skeleton */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Availability Badge Skeleton */}
        <div className="absolute top-2 right-2 bg-gray-300 rounded-md px-2 py-1 animate-pulse">
          <div className="w-16 h-3 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Room Name and Size Skeleton */}
        <div className="flex items-start justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>

        {/* Room Info Skeleton */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-1 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-1 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-16 animate-pulse line-through"></div>
          <div className="h-5 bg-gray-300 rounded w-12 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
        </div>

        {/* Amenities Skeleton */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Cancellation Policy Skeleton */}
        <div className="mb-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded mr-1 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default HotelRoomCardSkeleton;
