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

export interface Room {
  name: string;
  room_type_code: string;
  variants_count: number;
  variants: RoomVariant[];
  images: any | null;
  properties: any;
  no_of_adults: any | null;
  no_of_children: any | null;
  no_of_total_adults: any | null;
  no_of_total_children: any | null;
  children_ages: any | null;
  passengers_details: any | null;
  price: any | null;
  booking_code: any | null;
  booking_type: any | null;
  extra_bed: any | null;
  bedding_preference: any | null;
  special_requests: any | null;
  cancellation_status: any | null;
  cancel_reason: any | null;
  booking_reference_number: any | null;
  additional_requests: any | null;
  additional_services: any | null;
  supplier_reference: any | null;
  context: any | null;
  package_price: any | null;
  package_cancellation_info: any | null;
  package_cancellation_timeline: any | null;
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
