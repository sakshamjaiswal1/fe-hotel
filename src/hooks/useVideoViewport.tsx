import React, { useState, useEffect, useRef, useCallback } from "react";

interface UseVideoViewportOptions {
  src: string;
  thumbnail?: string;
  // Advanced options
  loadingThreshold?: number; // How close to viewport before loading starts
  playThreshold?: number; // How much visible before playing
  unloadThreshold?: number; // How far before unloading video
  rootMargin?: string;
  enablePrefetch?: boolean;
  respectDataSaver?: boolean;
}

interface VideoState {
  isLoaded: boolean;
  isPlaying: boolean;
  isInView: boolean;
  shouldLoad: boolean;
  hasUserInteracted: boolean;
  loadingProgress: number;
  error: string | null;
  connectionSpeed: "slow" | "medium" | "fast";
}

export const useVideoViewport = (options: UseVideoViewportOptions) => {
  const {
    src: _src,
    thumbnail: _thumbnail,
    loadingThreshold = 0.1,
    playThreshold = 0.5,
    unloadThreshold = 2000, // pixels
    rootMargin = "200px",
    enablePrefetch = true,
    respectDataSaver = true,
  } = options;

  const [videoState, setVideoState] = useState<VideoState>({
    isLoaded: false,
    isPlaying: false,
    isInView: false,
    shouldLoad: false,
    hasUserInteracted: false,
    loadingProgress: 0,
    error: null,
    connectionSpeed: "medium",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect connection speed
  const detectConnectionSpeed = useCallback(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      const { effectiveType, saveData } = connection;

      if (saveData && respectDataSaver) {
        return "slow";
      }

      switch (effectiveType) {
        case "slow-2g":
        case "2g":
          return "slow";
        case "3g":
          return "medium";
        case "4g":
          return "fast";
        default:
          return "medium";
      }
    }
    return "medium";
  }, [respectDataSaver]);

  // Initialize connection speed detection
  useEffect(() => {
    const speed = detectConnectionSpeed();
    setVideoState((prev) => ({ ...prev, connectionSpeed: speed }));
  }, [detectConnectionSpeed]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersectionRatio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;

          setVideoState((prev) => ({
            ...prev,
            isInView: isIntersecting,
          }));

          // Loading logic based on connection speed and threshold
          if (isIntersecting && intersectionRatio >= loadingThreshold) {
            const shouldStartLoading =
              enablePrefetch ||
              videoState.connectionSpeed === "fast" ||
              intersectionRatio >= playThreshold;

            if (shouldStartLoading && !videoState.shouldLoad) {
              // Delay loading slightly to avoid loading too many videos at once
              timeoutRef.current = setTimeout(
                () => {
                  setVideoState((prev) => ({
                    ...prev,
                    shouldLoad: true,
                    error: null,
                  }));
                },
                videoState.connectionSpeed === "slow" ? 500 : 100
              );
            }
          }

          // Playing logic
          if (
            videoRef.current &&
            videoState.isLoaded &&
            videoState.shouldLoad
          ) {
            if (isIntersecting && intersectionRatio >= playThreshold) {
              // Auto-play when sufficiently visible
              videoRef.current.play().catch((error) => {
                console.log("Autoplay failed:", error);
                setVideoState((prev) => ({
                  ...prev,
                  isPlaying: false,
                  error: "Autoplay failed",
                }));
              });
            } else if (!isIntersecting && !videoRef.current.paused) {
              // Pause when leaving viewport
              videoRef.current.pause();
              setVideoState((prev) => ({
                ...prev,
                isPlaying: false,
              }));
            }
          }

          // Unloading logic for memory optimization
          if (!isIntersecting && videoState.shouldLoad) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const distanceFromViewport =
              rect.top > viewportHeight
                ? rect.top - viewportHeight
                : viewportHeight - rect.bottom;

            if (distanceFromViewport > unloadThreshold) {
              // Unload video to free memory
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = "";
                videoRef.current.load();
              }

              setVideoState((prev) => ({
                ...prev,
                shouldLoad: false,
                isLoaded: false,
                isPlaying: false,
                loadingProgress: 0,
              }));
            }
          }
        });
      },
      {
        threshold: [0, loadingThreshold, playThreshold, 0.75, 1],
        rootMargin,
      }
    );

    observer.observe(containerRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    loadingThreshold,
    playThreshold,
    unloadThreshold,
    rootMargin,
    enablePrefetch,
    videoState.connectionSpeed,
    videoState.shouldLoad,
    videoState.isLoaded,
  ]);

  // Auto-play when video is loaded and in view
  useEffect(() => {
    if (
      videoRef.current &&
      videoState.isLoaded &&
      videoState.isInView &&
      videoState.shouldLoad &&
      !videoState.isPlaying
    ) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay on load failed:", error);
        setVideoState((prev) => ({
          ...prev,
          error: "Autoplay failed",
          isPlaying: false,
        }));
      });
    }
  }, [
    videoState.isLoaded,
    videoState.isInView,
    videoState.shouldLoad,
    videoState.isPlaying,
  ]);

  // Video event handlers
  const handleVideoLoad = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      isLoaded: true,
      loadingProgress: 100,
      error: null,
    }));
  }, []);

  const handleVideoProgress = useCallback(() => {
    if (videoRef.current) {
      const { buffered, duration } = videoRef.current;
      if (buffered.length > 0 && duration > 0) {
        const progress = (buffered.end(buffered.length - 1) / duration) * 100;
        setVideoState((prev) => ({
          ...prev,
          loadingProgress: progress,
        }));
      }
    }
  }, []);

  const handleVideoPlay = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      isPlaying: true,
      error: null,
    }));
  }, []);

  const handleVideoPause = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  }, []);

  const handleVideoError = useCallback(
    (error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      console.error("Video error:", error);
      setVideoState((prev) => ({
        ...prev,
        error: "Failed to load video",
        isLoaded: false,
        isPlaying: false,
      }));
    },
    []
  );

  // Manual controls
  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        setVideoState((prev) => ({ ...prev, hasUserInteracted: true }));
        await videoRef.current.play();
      } catch (error) {
        console.error("Play failed:", error);
        setVideoState((prev) => ({
          ...prev,
          error: "Play failed",
          isPlaying: false,
        }));
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [videoState.isPlaying, play, pause]);

  // Preload based on connection speed
  const getPreloadStrategy = useCallback(() => {
    switch (videoState.connectionSpeed) {
      case "slow":
        return "none";
      case "medium":
        return "metadata";
      case "fast":
        return "auto";
      default:
        return "metadata";
    }
  }, [videoState.connectionSpeed]);

  return {
    videoState,
    videoRef,
    containerRef,
    videoEventHandlers: {
      onLoadedData: handleVideoLoad,
      onProgress: handleVideoProgress,
      onPlay: handleVideoPlay,
      onPause: handleVideoPause,
      onError: handleVideoError,
    },
    controls: {
      play,
      pause,
      togglePlay,
    },
    getPreloadStrategy,
    shouldShowThumbnail:
      !videoState.shouldLoad || (!videoState.isInView && !videoState.isPlaying),
    shouldShowVideo: videoState.shouldLoad,
  };
};
