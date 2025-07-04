import React from "react";

interface HotelCardSkeletonProps {
  className?: string;
}

const HotelCardSkeleton: React.FC<HotelCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200 animate-pulse">
        {/* Rating Badge Skeleton */}
        <div className="absolute top-4 left-4 bg-gray-300 rounded-lg px-3 py-1 animate-pulse">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <div className="ml-1 w-6 h-3 bg-gray-400 rounded"></div>
          </div>
        </div>

        {/* Available Rooms Badge Skeleton */}
        <div className="absolute bottom-4 left-4 bg-gray-300 rounded-lg px-3 py-1 animate-pulse">
          <div className="w-20 h-3 bg-gray-400 rounded"></div>
        </div>

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
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Hotel Name Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Location Skeleton */}
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse"></div>
        </div>

        {/* Amenities Skeleton */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Price and Info Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-3 bg-gray-300 rounded w-20 mb-1 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-24 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
          <div className="text-right">
            <div className="h-4 bg-gray-300 rounded w-20 mb-1 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
