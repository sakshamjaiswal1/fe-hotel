export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
}

export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: {
    original: number;
    discounted: number;
    currency: string;
    discount_percentage: number;
  };
  amenities: string[];
  capacity: {
    adults: number;
    children: number;
  };
  bed_type: string;
  size: string;
  media: MediaItem[];
  video_url?: string[]; // New: Array of video URLs (priority 1)
  room_images?: ResponsiveImage[]; // New: Array of responsive images with srcset
  cancellation_policy: string;
  availability: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  star_rating: number;
  description: string;
  amenities: string[];
  rooms: Room[];
}

// Legacy interfaces (keeping for backward compatibility)
export interface CancellationRule {
  currently_here: boolean;
  title: string;
  sub_title: string;
  type: number;
  amount: number;
  currency: string;
  to_date: string;
  from_date: string;
}

export interface CancellationTimeline {
  cancellation_rules: CancellationRule[];
  free_cancellation: number;
  no_show: number;
  no_show_description: string | null;
  free_cancellation_description: string | null;
}

export interface RoomVariant {
  cancellation_timeline: CancellationTimeline;
  old_cancellation_timeline: CancellationTimeline;
  [key: string]: any;
}

export interface RoomBySerialNo {
  serial_no: number;
  rooms: Room[];
}

export interface RoomCardData {
  name: string;
  imageUrl: string;
  bedType: string;
  occupancy: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  currency: string;
  cancellationPolicy: string;
  roomTypeCode: string;
  variantsCount: number;
}
