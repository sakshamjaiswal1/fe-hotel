# 🏨 Hotel Room Listing WebApp

A highly optimized, responsive hotel room listing application built with React, featuring infinite scrolling, advanced media optimization, and scalable architecture.

## 🚀 Live Demo

[View Live Application](https://your-deployment-url.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Performance Optimizations](#performance-optimizations)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Media Optimization Strategy](#media-optimization-strategy)
- [Scalability Considerations](#scalability-considerations)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Features

- **Responsive Design**: Fully responsive layout supporting mobile, tablet, and desktop
- **Infinite Scrolling**: Automatic loading of additional room data as user scrolls
- **Advanced Media Optimization**: Efficient loading of images and videos based on viewport visibility
- **Media Prioritization**: Videos displayed first, then images per room variant
- **Skeleton Loading**: Smooth loading states with skeleton placeholders
- **Error Handling**: Graceful error handling with user-friendly feedback
- **State Management**: Redux-powered state management for scalable data handling

### Media Features

- **Responsive Images**: Automatic srcset generation with multiple breakpoints
- **Lazy Loading**: Images and videos load only when entering viewport
- **Video Optimization**: Auto-play/pause based on viewport visibility
- **Efficient Resource Loading**: Prevents unnecessary loading of off-screen media
- **Placeholder System**: Maintains layout during media loading

### Performance Features

- **Memoization**: React.memo and useMemo for preventing unnecessary re-renders
- **Intersection Observer**: Efficient viewport detection for media loading
- **Debounced Scrolling**: Optimized scroll handling to prevent excessive API calls
- **Code Splitting**: Lazy loading of heavy components
- **Network Optimization**: Reduced bandwidth usage with responsive images

## 🛠 Technologies Used

### Frontend

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe development experience
- **Redux Toolkit**: Modern Redux with RTK Query for state management
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Fast build tool and development server

### Performance & Optimization

- **Intersection Observer API**: Viewport-based media loading
- **React.memo**: Component memoization
- **useMemo & useCallback**: Hook-based memoization
- **Lazy Loading**: Native and custom lazy loading implementations

### Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

## 🏗 Architecture

### Component Architecture

```
src/
├── components/
│   ├── common/            # Reusable UI components
│   │   ├── hotelRoomCard/ # Individual room card component
│   │   ├── roomDisplay/   # Detailed room display with media gallery
│   │   ├── optimizedVideo/# Viewport-aware video component
│   │   ├── loading/       # Skeleton loading components
│   │   └── header/        # Application header
│   └── home/              # Home page specific components
│       ├── hotelCard/     # Hotel overview card
│       ├── hotelList/     # Hotel listing container
│       ├── infiniteRoomList/ # Infinite scroll room list
│       └── roomCard/      # Room card variant
├── redux/                 # State management
│   ├── globalData/        # Global app state
│   └── sampleData/        # Sample data management
├── hooks/                 # Custom React hooks
│   ├── useApiRequest.tsx  # API request hook
│   ├── useVideoViewport.tsx # Video viewport detection
│   └── useLocalStorage.tsx # Local storage management
├── interface/             # TypeScript interfaces
├── constants/             # App constants and sample data
└── utility/               # Utility functions
```

### State Management Flow

1. **Redux Store**: Centralized state management
2. **Async Actions**: Handle API calls and data fetching
3. **Selectors**: Memoized state selectors for performance
4. **Component State**: Local state for UI-specific data

## ⚡ Performance Optimizations

### Media Optimization

- **Responsive Images**: Multiple image sizes (400w, 800w, 1200w) with srcset
- **Lazy Loading**: Images load only when 200px from viewport
- **Video Optimization**: Auto-play/pause based on 30% viewport visibility
- **Efficient Thumbnails**: Optimized thumbnail generation and loading

### Rendering Optimization

- **React.memo**: Prevents unnecessary re-renders of media components
- **useMemo**: Memoizes expensive calculations (media arrays, price ranges)
- **useCallback**: Stable function references for event handlers
- **Virtual Scrolling**: Efficient rendering of large lists

### Network Optimization

- **Debounced Scrolling**: Prevents excessive API calls during scroll
- **Intersection Observer**: Battery-efficient viewport detection
- **Resource Prioritization**: Critical resources load first
- **Connection-Aware Loading**: Adapts to user's connection speed

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/hotel-room-listing.git
cd hotel-room-listing
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start development server**

```bash
npm run dev
# or
yarn dev
```

4. **Build for production**

```bash
npm run build
# or
yarn build
```

5. **Preview production build**

```bash
npm run preview
# or
yarn preview
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Hotel Room Listing
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── dropdown/
│   │   ├── header/
│   │   ├── hotelRoomCard/      # ✅ Room card with media gallery
│   │   ├── loading/            # ✅ Skeleton loading states
│   │   ├── optimizedVideo/     # ✅ Viewport-aware video component
│   │   └── roomDisplay/        # ✅ Detailed room view
│   └── home/
│       ├── hotelCard/          # ✅ Hotel overview card
│       ├── hotelList/          # ✅ Hotel container
│       ├── infiniteRoomList/   # ✅ Infinite scroll implementation
│       └── roomCard/           # ✅ Individual room card
├── redux/                      # ✅ State management
├── hooks/                      # ✅ Custom hooks
├── interface/                  # ✅ TypeScript interfaces
├── constants/                  # ✅ Sample data (100+ items)
├── utility/                    # ✅ Helper functions
└── assets/                     # Static assets
```

## 🧩 Key Components

### 1. InfiniteRoomList

- Implements infinite scrolling with intersection observer
- Loads additional rooms as user approaches bottom
- Maintains scroll position and prevents duplicate loading
- Handles loading states and error conditions

### 2. OptimizedVideo

- Viewport-aware video loading and playback
- Auto-play when 30% visible, pause when leaving viewport
- Respects user's data saver preferences
- Efficient memory management with video unloading

### 3. HotelRoomCard

- Displays room information with media gallery
- Responsive image loading with srcset
- Media prioritization (videos first, then images)
- Skeleton loading during media fetch

### 4. RoomDisplay

- Detailed room view with full media gallery
- Expandable descriptions and amenity lists
- Responsive design for all screen sizes
- Accessibility features and keyboard navigation

## 📱 Media Optimization Strategy

### Image Optimization

```typescript
// Responsive image generation
const generateResponsiveImage = (baseUrl: string, alt: string) => ({
  src: `${baseUrl}&w=800`,
  srcset: `${baseUrl}&w=400 400w, ${baseUrl}&w=800 800w, ${baseUrl}&w=1200 1200w`,
  sizes: "(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px",
  alt,
});
```

### Video Optimization

```typescript
// Viewport-based video loading
const useVideoViewport = {
  loadingThreshold: 0.1, // Start loading when 10% visible
  playThreshold: 0.3, // Auto-play when 30% visible
  unloadThreshold: 400, // Unload when 400px away
  respectDataSaver: true, // Respect user preferences
};
```

### Media Prioritization

1. **Videos First**: If `video_url` exists, display videos
2. **Images Fallback**: If no videos, display `room_images`
3. **No Media**: Hide media section if neither exists

## 🔄 Scalability Considerations

### Performance Scalability

- **Lazy Loading**: Components load only when needed
- **Memory Management**: Efficient cleanup of off-screen media
- **Memoization**: Prevents unnecessary computations
- **Virtual Scrolling**: Handles large datasets efficiently

### Code Scalability

- **Modular Architecture**: Reusable components and hooks
- **TypeScript**: Type safety for large codebases
- **Custom Hooks**: Shared logic across components
- **Separation of Concerns**: Clear separation between UI and business logic

### Data Scalability

- **Pagination**: Efficient data fetching with pagination
- **Caching**: Redux state caching for visited data
- **Debouncing**: Prevents excessive API calls
- **Error Boundaries**: Graceful error handling

## 🛡 Error Handling

### Network Errors

- Retry mechanism for failed requests
- Fallback content for missing media
- User-friendly error messages
- Graceful degradation

### Media Loading Errors

- Placeholder images for broken media
- Video fallback to thumbnail
- Progressive enhancement approach
- Error reporting and logging

### Component Errors

- Error boundaries for component failures
- Fallback UI components
- State recovery mechanisms
- Development error overlay

## 🎯 Key Performance Metrics

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Media Loading

- **Time to First Image**: < 1s
- **Video Start Time**: < 2s
- **Bandwidth Usage**: Optimized for mobile

## 🔮 Future Enhancements

### Planned Features

- [ ] Virtual scrolling for massive datasets
- [ ] Advanced filtering and search
- [ ] Offline support with service workers
- [ ] Push notifications for new listings
- [ ] A/B testing framework
- [ ] Analytics integration
- [ ] Progressive Web App (PWA) features

### Performance Improvements

- [ ] WebP/AVIF image format support
- [ ] HTTP/2 server push optimization
- [ ] CDN integration for media delivery
- [ ] Advanced caching strategies
- [ ] Bundle splitting optimization

## 📊 Testing Strategy

### Unit Tests

- Component rendering tests
- Hook functionality tests
- Utility function tests
- Redux state management tests

### Integration Tests

- Media loading workflows
- Infinite scroll behavior
- Error handling scenarios
- Performance benchmarks

### E2E Tests

- Full user journey testing
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Unsplash for high-quality sample images
- Google for sample video content
- Open source community for inspiration

---

**Built with ❤️ by Saksham Jaiswal**

For questions or support, please open an issue in the GitHub repository.
