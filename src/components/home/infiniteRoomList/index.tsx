import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSampleData } from "../../../redux/sampleData/action";
import {
  selectSampleData,
  selectSampleDataLoading,
  selectRoomsBySerialNo,
  selectHotelDetails,
} from "../../../redux/sampleData/selectors";
import RoomCard from "../roomCard";
import { Room, RoomBySerialNo } from "../../../interface/room.interface";

const InfiniteRoomList: React.FC = () => {
  const dispatch = useDispatch();
  const sampleData = useSelector(selectSampleData);
  const loading = useSelector(selectSampleDataLoading);
  const roomsBySerialNo = useSelector(selectRoomsBySerialNo);
  const hotelDetails = useSelector(selectHotelDetails);

  const [displayedRooms, setDisplayedRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const roomsPerPage = 6;

  // Load initial data
  useEffect(() => {
    if (!sampleData) {
      dispatch(loadSampleData());
    }
  }, [dispatch, sampleData]);

  // Flatten all rooms from roomsBySerialNo
  const allRooms = React.useMemo(() => {
    if (!roomsBySerialNo || roomsBySerialNo.length === 0) return [];

    const flattenedRooms: Room[] = [];
    roomsBySerialNo.forEach((roomGroup: RoomBySerialNo) => {
      if (roomGroup.rooms && Array.isArray(roomGroup.rooms)) {
        flattenedRooms.push(...roomGroup.rooms);
      }
    });

    return flattenedRooms;
  }, [roomsBySerialNo]);

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

  const getRandomImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

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
          {hotelDetails && (
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {hotelDetails.name}
              </h2>
              <p className="text-gray-600 mb-3">
                {hotelDetails.address.city}, {hotelDetails.address.country}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 text-sm font-medium">
                    {hotelDetails.properties.star_rating} Star
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {hotelDetails.properties.budget}
                </div>
                <div className="text-sm text-green-600 font-medium">
                  ✓ Free cancellation
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRooms.map((room, index) => (
            <RoomCard
              key={`${room.room_type_code}-${index}`}
              name={room.name}
              imageUrl={getRandomImage()}
              bedType="Double bed"
              occupancy="Upto 2 adults"
              originalPrice={hotelDetails?.price_info.total_price || 357}
              discountedPrice={hotelDetails?.price_info.discounted_price || 257}
              discountPercentage={28}
              currency={hotelDetails?.price_info.unit || "EUR"}
              cancellationPolicy="Cancellation policy"
              onSelect={() => handleRoomSelect(room)}
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

        {/* No More Rooms Message */}
        {!hasMore && displayedRooms.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No more rooms to load</p>
            <p className="text-sm text-gray-400">
              Showing {displayedRooms.length} of {allRooms.length} rooms
            </p>
          </div>
        )}

        {/* No Rooms Available */}
        {!loading && displayedRooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No rooms available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteRoomList;
