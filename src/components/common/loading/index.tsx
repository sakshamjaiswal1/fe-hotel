import React from "react";

interface LoadingProps {
  variant?: "spinner" | "skeleton" | "dots";
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = "spinner",
  size = "medium",
  text,
  className = "",
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const renderSpinner = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      ></div>
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );

  const renderSkeleton = () => (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-200 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 rounded h-4 w-1/2"></div>
        <div className="bg-gray-200 rounded h-4 w-2/3"></div>
      </div>
    </div>
  );

  const renderDots = () => (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );

  switch (variant) {
    case "skeleton":
      return renderSkeleton();
    case "dots":
      return renderDots();
    default:
      return renderSpinner();
  }
};

export default Loading;
