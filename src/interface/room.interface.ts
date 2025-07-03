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
  free_cancellation_description: string;
}

export interface RoomVariant {
  cancellation_timeline: CancellationTimeline;
  old_cancellation_timeline: CancellationTimeline;
  [key: string]: any;
}

export interface Room {
  name: string;
  room_type_code: string;
  variants_count: number;
  variants: RoomVariant[];
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