import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSampleData } from "../../../redux/sampleData/action";
import {
  selectAllRooms,
  selectSampleDataLoading,
  selectAllHotels,
} from "../../../redux/sampleData/selectors";

import { Room } from "../../../interface/room.interface";
import RoomDisplay from "@/components/common/roomDisplay";

const InfiniteRoomList: React.FC = () => {
  const dispatch = useDispatch();
  const allRooms = useSelector(selectAllRooms);
  const allHotels = useSelector(selectAllHotels);
  const loading = useSelector(selectSampleDataLoading);

  const [displayedRooms, setDisplayedRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const roomsPerPage = 6;

  // Load initial data
  useEffect(() => {
    if (allHotels.length === 0) {
      dispatch(loadSampleData() as any);
    }
  }, [dispatch, allHotels.length]);

  // Load more rooms
  const loadMoreRooms = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * roomsPerPage;
      const endIndex = startIndex + roomsPerPage;
      const nextRooms = allRooms.slice(startIndex, endIndex);

      if (nextRooms.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedRooms((prev) => [...prev, ...nextRooms]);
        setCurrentPage((prev) => prev + 1);
      }

      setIsLoadingMore(false);
    }, 1000);
  }, [allRooms, currentPage, isLoadingMore, hasMore, roomsPerPage]);

  // Initial load
  useEffect(() => {
    if (allRooms.length > 0 && displayedRooms.length === 0) {
      loadMoreRooms();
    }
  }, [allRooms, displayedRooms.length, loadMoreRooms]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreRooms();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreRooms]);

  const handleRoomSelect = (room: Room) => {
    console.log("Selected room:", room);
    // Add your room selection logic here
  };

  const currentHotel = allHotels.length > 0 ? allHotels[0] : null;

  if (loading && displayedRooms.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Unravel Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 mr-8">Unravel</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Hotels
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Flights
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Packages
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">
                <span className="sr-only">Search</span>
                🔍
              </button>
              <button className="text-gray-700 hover:text-blue-600">
                <span className="sr-only">Account</span>
                👤
              </button>
            </div>
          </div>

          {/* Hotel Info */}
          {currentHotel && (
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentHotel.name}
              </h2>
              <p className="text-gray-600 mb-3">
                {currentHotel.address.city}, {currentHotel.address.country}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 text-sm font-medium">
                    {currentHotel.star_rating} Star
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400">📊</span>
                  <span className="ml-1 text-sm font-medium">
                    {currentHotel.rating}/5 Rating
                  </span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  ✓{" "}
                  {currentHotel.amenities.includes("Free WiFi")
                    ? "Free WiFi"
                    : "Premium amenities"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Total Rooms Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Available Rooms
          </h2>
          <p className="text-gray-600">
            {allRooms.length} rooms available across {allHotels.length}{" "}
            {allHotels.length === 1 ? "hotel" : "hotels"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedRooms.map((room) => (
            <RoomDisplay
              key={room.id}
              room={room}
              onSelect={handleRoomSelect}
              className="transform hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading more rooms...</span>
          </div>
        )}

        {/* Load More Button */}
        {!isLoadingMore && hasMore && displayedRooms.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreRooms}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Load More Rooms
            </button>
          </div>
        )}

        {/* No More Rooms Message */}
        {!hasMore && displayedRooms.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">All rooms loaded</p>
            <p className="text-sm text-gray-400">
              Showing {displayedRooms.length} of {allRooms.length} rooms
            </p>
          </div>
        )}

        {/* No Rooms Available */}
        {!loading && allRooms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <p className="text-gray-500 text-lg mb-2">No rooms available</p>
            <p className="text-gray-400">
              Please check back later or adjust your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteRoomList;
