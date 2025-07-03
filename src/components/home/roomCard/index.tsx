import React from "react";

interface RoomCardProps {
  name: string;
  imageUrl: string;
  bedType: string;
  occupancy: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  currency: string;
  cancellationPolicy: string;
  onSelect: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  imageUrl,
  bedType,
  occupancy,
  originalPrice,
  discountedPrice,
  discountPercentage,
  currency,
  cancellationPolicy,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">🏠</span>
            <span className="text-sm text-gray-700">Room only</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">🛏️</span>
            <span className="text-sm text-gray-700">{bedType}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">👥</span>
            <span className="text-sm text-gray-700">{occupancy}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Price for 1 night</p>
              <p className="text-xs text-gray-500">Includes taxes & fees</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">
                  {currency}
                  {originalPrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {currency}
                  {discountedPrice.toFixed(2)}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {discountPercentage}% off
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button className="text-sm text-blue-600 hover:text-blue-800 underline">
            {cancellationPolicy} →
          </button>
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-600">
            Select rooms to add special request
          </span>
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          onClick={onSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
