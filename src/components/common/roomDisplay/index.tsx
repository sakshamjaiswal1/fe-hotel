import React, { useState, useRef, useEffect, useCallback } from "react";
import { Room, MediaItem } from "../../../interface/room.interface";

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

interface LazyVideoProps {
  src: string;
  thumbnail?: string;
  alt?: string;
  className?: string;
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

// Lazy Video Component with Viewport Detection
const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  thumbnail,
  alt,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        // Load video when it comes into view
        if (entry.isIntersecting && !shouldLoadVideo) {
          setShouldLoadVideo(true);
        }

        // Auto-play/pause based on viewport visibility
        if (videoRef.current && shouldLoadVideo && isLoaded) {
          if (entry.isIntersecting) {
            // Autoplay when entering viewport (muted to respect browser policies)
            videoRef.current.play().catch((error) => {
              console.log("Autoplay failed:", error);
              // Autoplay failed, keep showing thumbnail
              setIsPlaying(false);
            });
          } else if (!entry.isIntersecting && !videoRef.current.paused) {
            // Pause when leaving viewport
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: 0.5, // Video must be 50% visible
        rootMargin: "50px", // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoadVideo, hasUserInteracted]);

  // Autoplay when video is loaded and in view
  useEffect(() => {
    if (videoRef.current && isLoaded && isInView && shouldLoadVideo) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay on load failed:", error);
        setIsPlaying(false);
      });
    }
  }, [isLoaded, isInView, shouldLoadVideo]);

  // Handle manual play
  const handlePlay = useCallback(async () => {
    setHasUserInteracted(true);
    setIsPlaying(true);

    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.log("Play failed:", error);
        setIsPlaying(false);
      }
    }
  }, []);

  // Handle manual pause
  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Handle video events
  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full block ${className}`}
    >
      {!shouldLoadVideo || (!isInView && !isPlaying) ? (
        <div className="relative">
          <LazyImage
            src={
              thumbnail ||
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
            }
            alt={alt || "Video thumbnail"}
            className="w-full h-full"
            onClick={handlePlay}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
              aria-label="Play video"
            >
              <svg
                className="w-6 h-6 text-gray-800 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Loading indicator */}
            {shouldLoadVideo && !isLoaded && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
                Loading video...
              </div>
            )}
          </div>
        </div>
      ) : (
        shouldLoadVideo && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata" // Only load metadata initially
            onLoadedData={() => setIsLoaded(true)}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
            onLoadStart={() => console.log("Video loading started")}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}

      {/* Video controls overlay when playing */}
      {isPlaying && shouldLoadVideo && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handlePause}
            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-all duration-200"
            aria-label="Pause video"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

// Media Gallery Component
const MediaGallery: React.FC<{ media: MediaItem[] }> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className="relative w-full block">
      {/* Main Media Display */}
      <div className="w-full aspect-[4/3] h-80 overflow-hidden rounded-t-xl">
        {currentMedia.type === "image" ? (
          <LazyImage
            src={currentMedia.url}
            alt={currentMedia.alt || "Room image"}
            className="w-full h-full"
            onClick={() => setShowGallery(true)}
          />
        ) : (
          <LazyVideo
            src={currentMedia.url}
            thumbnail={currentMedia.thumbnail}
            alt={currentMedia.alt}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Media Navigation */}
      {media.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {media.map((item, index) => (
            <button
              key={item.id}
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
        {currentIndex + 1} / {media.length}
      </div>

      {/* Media Type Badge */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
        {currentMedia.type === "video" ? "🎥 Video" : "📸 Photo"}
      </div>
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
          <MediaGallery media={room.media} />
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
