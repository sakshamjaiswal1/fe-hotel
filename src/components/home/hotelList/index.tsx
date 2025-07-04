import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadSampleData } from "../../../redux/sampleData/action";
import {
  selectSampleDataLoading,
  selectAllHotels,
} from "../../../redux/sampleData/selectors";

import { Hotel } from "../../../interface/room.interface";
import HotelCard from "@/components/home/hotelCard";
import HotelCardSkeleton from "@/components/home/hotelCard/HotelCardSkeleton";

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

  // Memoize pagination calculations for better performance
  const paginationData = useMemo(() => {
    const startIndex = currentPage * hotelsPerPage;
    const endIndex = startIndex + hotelsPerPage;
    const nextHotels = allHotels.slice(startIndex, endIndex);

    return {
      startIndex,
      endIndex,
      nextHotels,
      hasNextPage: nextHotels.length > 0,
    };
  }, [allHotels, currentPage, hotelsPerPage]);

  // Load more hotels
  const loadMoreHotels = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      const { nextHotels, hasNextPage } = paginationData;

      if (!hasNextPage) {
        setHasMore(false);
      } else {
        setDisplayedHotels((prev) => [...prev, ...nextHotels]);
        setCurrentPage((prev) => prev + 1);
      }

      setIsLoadingMore(false);
    }, 1000);
  }, [isLoadingMore, hasMore, paginationData]);

  // Initial load
  useEffect(() => {
    if (allHotels.length > 0 && displayedHotels.length === 0) {
      loadMoreHotels();
    }
  }, [allHotels, displayedHotels.length, loadMoreHotels]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreHotels();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreHotels]);

  if (loading && displayedHotels.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Unravel Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Brand Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600 mr-8">
                  Unravel
                </h1>
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
                Loading amazing hotels with great amenities...
              </p>
            </div>
          </div>
        </div>

        {/* Skeleton Hotel Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Title Skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(6)].map((_, index) => (
              <HotelCardSkeleton key={index} />
            ))}
          </div>
        </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(hotelsPerPage)].map((_, index) => (
                <HotelCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
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
