import React from "react";

// Beautiful loading component for lazy loaded components
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="text-center">
      {/* Animated Hotel Building */}
      <div className="relative mx-auto mb-8 w-24 h-24">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg shadow-lg animate-pulse">
          {/* Building windows */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"></div>
          <div
            className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-6 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-6 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-10 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-10 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-ping"
            style={{ animationDelay: "2.5s" }}
          ></div>

          {/* Hotel door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-amber-800 rounded-t-lg"></div>
          <div
            className="absolute bottom-0 left-1/2 transform translate-x-1 w-1 h-1 bg-yellow-400 rounded-full"
            style={{ top: "70%" }}
          ></div>
        </div>

        {/* Floating star */}
        <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      {/* Loading text with animation */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Preparing Your Stay
        </h2>
        <p className="text-gray-600 text-lg">Loading luxury hotel details...</p>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center space-x-2 mb-8">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>

      {/* Hotel amenities preview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md mx-auto">
        <div className="flex justify-center space-x-6 text-gray-600">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">24/7 Service</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Free WiFi</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Prime Location</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingFallback;
