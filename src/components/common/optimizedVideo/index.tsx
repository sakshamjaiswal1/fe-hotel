import React, { useMemo } from "react";
import { useVideoViewport } from "../../../hooks/useVideoViewport";

interface OptimizedVideoProps {
  src: string;
  thumbnail?: string;
  alt?: string;
  className?: string;
  // Easy configuration options
  autoPlay?: boolean;
  respectDataSaver?: boolean;
  loadingDistance?: number; // How far before loading (in pixels)
  playVisibility?: number; // How much visible before playing (0-1)
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = React.memo(
  ({
    src,
    thumbnail,
    alt = "Video content",
    className = "",
    autoPlay = true,
    respectDataSaver = true,
    loadingDistance = 200,
    playVisibility = 0.3,
  }) => {
    const {
      videoState,
      videoRef,
      containerRef,
      videoEventHandlers,
      controls: _controls,
      getPreloadStrategy,
      shouldShowThumbnail,
      shouldShowVideo,
    } = useVideoViewport({
      src,
      thumbnail,
      loadingThreshold: 0.1,
      playThreshold: playVisibility,
      unloadThreshold: loadingDistance * 2,
      rootMargin: `${loadingDistance}px`,
      enablePrefetch: autoPlay,
      respectDataSaver,
    });

    const thumbnailSrc = useMemo(() => {
      return (
        thumbnail ||
        `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <circle cx="50" cy="50" r="8" fill="none" stroke="#6b7280" stroke-width="2"/>
        </svg>
      `)}`
      );
    }, [thumbnail]);

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden bg-gray-100 ${className}`}
      >
        {shouldShowThumbnail ? (
          <div className="relative w-full h-full">
            <img
              src={thumbnailSrc}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Status indicators */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {videoState.connectionSpeed === "slow" && (
                <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                  Slow connection
                </div>
              )}
              {videoState.error && (
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  {videoState.error}
                </div>
              )}
            </div>

            {/* Circular loading indicator */}
            {shouldShowVideo && !videoState.isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="w-2 h-2 border-1 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
          shouldShowVideo && (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload={getPreloadStrategy()}
                {...videoEventHandlers}
              >
                <source src={src} type="video/mp4" />
                <p className="p-4 text-center text-gray-500">
                  Your browser does not support the video tag.
                </p>
              </video>

              {/* Circular loader for video without thumbnail */}
              {!videoState.isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for optimal performance
    return (
      prevProps.src === nextProps.src &&
      prevProps.thumbnail === nextProps.thumbnail &&
      prevProps.alt === nextProps.alt &&
      prevProps.className === nextProps.className &&
      prevProps.autoPlay === nextProps.autoPlay &&
      prevProps.respectDataSaver === nextProps.respectDataSaver &&
      prevProps.loadingDistance === nextProps.loadingDistance &&
      prevProps.playVisibility === nextProps.playVisibility
    );
  }
);

OptimizedVideo.displayName = "OptimizedVideo";

export default OptimizedVideo;
