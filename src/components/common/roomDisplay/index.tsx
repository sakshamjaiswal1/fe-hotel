import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Room } from "../../../interface/room.interface";

import OptimizedVideo from "../optimizedVideo";

interface RoomDisplayProps {
  room: Room;
  onSelect?: (room: Room) => void;
  className?: string;
  showFullDescription?: boolean;
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

// Lazy Image Component with Intersection Observer
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative overflow-hidden w-full h-full block ${className}`}
    >
      <img
        ref={imgRef}
        src={
          isInView
            ? src
            : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
        }
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 block ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${
          onClick
            ? "cursor-pointer hover:scale-105 transition-transform duration-200"
            : ""
        }`}
        onLoad={() => setIsLoaded(true)}
        onClick={onClick}
        loading="lazy"
      />
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

// Media Gallery Component with Priority: Videos First, then Images
const MediaGallery: React.FC<{
  room: Room;
  roomName: string;
}> = ({ room, roomName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combined media: videos first, then images - memoized for performance
  const mediaItems = useMemo(() => {
    const hasVideos = room.video_url && room.video_url.length > 0;
    const hasImages = room.room_images && room.room_images.length > 0;

    // Combine videos and images (videos first)
    let items: Array<{
      url: string;
      type: "video" | "image";
      index: number;
    }> = [];

    if (hasVideos) {
      // Add all videos first
      items = room.video_url!.map((url, index) => ({
        url,
        type: "video" as const,
        index,
      }));
    }

    if (hasImages) {
      // Add all images after videos
      const imageItems = room.room_images!.map((url, index) => ({
        url,
        type: "image" as const,
        index,
      }));
      items = [...items, ...imageItems];
    }

    return items;
  }, [room.video_url, room.room_images]);

  // Don't show anything if no media
  if (mediaItems.length === 0) return null;

  const hasVideos = room.video_url && room.video_url.length > 0;
  const hasImages = room.room_images && room.room_images.length > 0;

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="relative w-full block">
      {/* Main Media Display */}
      <div className="w-full aspect-[4/3] h-80 overflow-hidden rounded-t-xl">
        {currentMedia.type === "image" ? (
          <LazyImage
            src={currentMedia.url}
            alt={`${roomName} image ${currentMedia.index + 1}`}
            className="w-full h-full"
          />
        ) : (
          <OptimizedVideo
            src={currentMedia.url}
            thumbnail={undefined} // No thumbnail for direct video URLs
            alt={`${roomName} video tour ${currentMedia.index + 1}`}
            className="w-full h-full rounded-t-xl"
            autoPlay={true}
            respectDataSaver={true}
            loadingDistance={250}
            playVisibility={0.2}
          />
        )}
      </div>

      {/* Media Navigation */}
      {mediaItems.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {mediaItems.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`View ${item.type} ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Media Counter */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm">
        {currentIndex + 1} / {mediaItems.length}
      </div>

      {/* Media Type Badge */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
        {hasVideos && hasImages
          ? "🎥📸 Videos & Images"
          : hasVideos
          ? "🎥 Videos Only"
          : "📸 Images Only"}
      </div>

      {/* Priority Indicator */}
      {hasVideos && (
        <div className="absolute bottom-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs">
          Video Priority
        </div>
      )}
    </div>
  );
};

// Main Room Display Component
const RoomDisplay: React.FC<RoomDisplayProps> = ({
  room,
  onSelect,
  className = "",
  showFullDescription = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(showFullDescription);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(room);
    }
  }, [room, onSelect]);

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-none ${className}`}
    >
      {/* Media Gallery - Full Width */}
      <div className="relative w-full">
        <div className="w-full">
          <MediaGallery room={room} roomName={room.name} />
        </div>

        {/* Availability Badge */}
        <div
          className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
            room.availability
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {room.availability ? "Available" : "Not Available"}
        </div>
      </div>

      {/* Room Details */}
      <div className="p-8">
        {/* Room Name and Size */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {room.name}
          </h3>
          <span className="text-sm text-gray-500 ml-2">{room.size}</span>
        </div>

        {/* Room Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span className="flex items-center">🛏️ {room.bed_type}</span>
          <span className="flex items-center">
            👥 {room.capacity.adults} adults, {room.capacity.children} children
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {room.price.currency} {room.price.discounted}
          </span>
          {room.price.original > room.price.discounted && (
            <>
              <span className="text-lg text-gray-500 line-through">
                {room.price.currency} {room.price.original}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                {room.price.discount_percentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {isExpanded
              ? room.description
              : truncateDescription(room.description)}
          </p>
          {room.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-gray-500 text-sm">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-4">
          <p className="text-sm text-green-600 flex items-center">
            ✅ {room.cancellation_policy}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSelect}
          disabled={!room.availability}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            room.availability
              ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {room.availability ? "Select Room" : "Not Available"}
        </button>
      </div>
    </div>
  );
};

export default RoomDisplay;
