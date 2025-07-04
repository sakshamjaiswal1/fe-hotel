import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadSampleData } from "../../../redux/sampleData/action";
import {
  selectSampleDataLoading,
  selectAllHotels,
} from "../../../redux/sampleData/selectors";

import { Hotel } from "../../../interface/room.interface";
import HotelCard from "@/components/home/hotelCard";

const InfiniteRoomList: React.FC = () => {
  const dispatch = useDispatch();

  const allHotels = useSelector(selectAllHotels);
  const loading = useSelector(selectSampleDataLoading);

  const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hotelsPerPage = 6;

  // Load initial data
  useEffect(() => {
    if (allHotels.length === 0) {
      dispatch(loadSampleData() as any);
    }
  }, [dispatch, allHotels.length]);

  // Load more hotels
  const loadMoreHotels = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * hotelsPerPage;
      const endIndex = startIndex + hotelsPerPage;
      const nextHotels = allHotels.slice(startIndex, endIndex);

      if (nextHotels.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedHotels((prev) => [...prev, ...nextHotels]);
        setCurrentPage((prev) => prev + 1);
      }

      setIsLoadingMore(false);
    }, 1000);
  }, [allHotels, currentPage, isLoadingMore, hasMore, hotelsPerPage]);

  // Initial load
  useEffect(() => {
    if (allHotels.length > 0 && displayedHotels.length === 0) {
      loadMoreHotels();
    }
  }, [allHotels, displayedHotels.length, loadMoreHotels]);

  // Debounced scroll handler
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedScrollHandler = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreHotels();
      }
    }, 150); // 150ms debounce delay
  }, [loadMoreHotels]);

  // Infinite scroll handler
  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [debouncedScrollHandler]);

  if (loading && displayedHotels.length === 0) {
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

          {/* Search Results Info */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Find Your Perfect Stay
            </h2>
            <p className="text-gray-600">
              Discover amazing hotels with great amenities and competitive
              prices
            </p>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Total Hotels Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Available Hotels
          </h2>
          <p className="text-gray-600">
            {allHotels.length} hotels available with great amenities and
            competitive rates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayedHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              className="transform hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading more hotels...</span>
          </div>
        )}

        {/* Load More Button */}
        {!isLoadingMore && hasMore && displayedHotels.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreHotels}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Load More Hotels
            </button>
          </div>
        )}

        {/* No More Hotels Message */}
        {!hasMore && displayedHotels.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">All hotels loaded</p>
            <p className="text-sm text-gray-400">
              Showing {displayedHotels.length} of {allHotels.length} hotels
            </p>
          </div>
        )}

        {/* No Hotels Available */}
        {!loading && allHotels.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <p className="text-gray-500 text-lg mb-2">No hotels available</p>
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
