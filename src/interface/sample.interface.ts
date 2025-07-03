import { RoomBySerialNo } from "./room.interface";

export interface ImageFormat {
  square: string;
  portrait: string;
  landscape?: string;
  thumbnail?: string;
  fullscreen?: string;
  transcoded?: string;
}

export interface ImageData {
  twoX: ImageFormat;
  threeX?: ImageFormat;
}

export interface Address {
  city: string;
  country: string;
  continent: string;
  country_code: string;
  neighbourhood?: string;
}

export interface VideoUrl {
  med: string;
}

export interface PromptItem {
  usage: number;
  prompt_id: string;
  text: string;
  order: number;
  type: number;
}

export interface VideoItem {
  item_id: string;
  item_id_string: string;
  video_id: string;
  position: number;
  image: ImageData;
  video_caption: string;
  address: Address;
  video_url: VideoUrl;
  prompt_list: PromptItem[];
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AdditionalInfoValue {
  html: string;
}

export interface AdditionalInfo {
  value: AdditionalInfoValue;
  name: string;
  display_name: string;
  icon_url: string;
  icon_name: string;
  type: string;
  color: string | null;
  order: number;
  display_limit: number;
  subtitle: string | null;
  metadata: string | null;
}

export interface LayoutItem {
  value: any | null;
  name: string;
  display_name: string;
  icon_url: string;
  icon_name: string | null;
  type: string;
  color: string | null;
  order: number;
  display_limit?: number;
  subtitle?: string | null;
  metadata?: string | null;
}

export interface PriceInfo {
  is_discount_present: boolean;
  total_price: number;
  discounted_price: number;
  unit: string;
}

export interface PriceItem {
  text: string;
  type: string;
  unit: string;
  value: number;
}

export interface ReviewSummary {
  tag: string;
  source: string;
  max_rating: number;
  review_count: number;
  review_rating: number;
}

export interface DistFromCentre {
  text: string;
  unit: string;
  value: number;
}

export interface Properties {
  price: PriceItem[];
  budget: string;
  star_rating: number;
  stay_awards: string[];
  sub_heading: string | null;
  redirect_url: string;
  redirect_text: string;
  review_summary: ReviewSummary[];
  dist_from_centre: DistFromCentre;
  primary_sub_category: string;
}

export interface Markup {
  markup: number;
  dynamic_markup: number;
}

export interface MarkupShare {
  discount: number;
  client_commission: number;
  unravel_commission: number;
}

export interface HotelDetails {
  item_id: string;
  client_id: string | null;
  display_name: string;
  item_type: string;
  item_sub_type: string | null;
  name: string;
  address: Address;
  description: string;
  images: ImageData[];
  videos: any[]; // Empty array in the data
  new_videos: VideoItem[];
  components: any | null;
  location: Location;
  prompts: any | null;
  display_properties: any[];
  additional_info: AdditionalInfo[];
  layout: LayoutItem[];
  is_default: boolean;
  curator_info: any | null;
  destination_info: any;
  notes: any | null;
  linkable_items: any | null;
  bookable: any | null;
  google_place_id: string;
  reviews: any[];
  vendor_id: string;
  action_text: string;
  promo_list: any[];
  price_info: PriceInfo;
  exclusive_coupons: any | null;
  prompts_exist: number;
  vendor_properties: any[];
  hotel_properties: any[];
  tpa_properties: any[];
  properties: Properties;
  new_properties: any[];
  markup: Markup;
  markup_share: MarkupShare;
  video_caption?: string;
  video_url?: VideoUrl;
  prompt_list?: PromptItem[];
}

export interface BookingDetails {
  booking_type: string | null;
  extra_bed: string | null;
  bedding_preference: string | null;
  special_requests: string | null;
  cancellation_status: string | null;
  cancel_reason: string | null;
  booking_reference_number: string | null;
  additional_requests: string | null;
  additional_services: string | null;
  supplier_reference: string | null;
  context: string | null;
  package_price: string | null;
  package_cancellation_info: string | null;
  package_cancellation_timeline: string | null;
}

export interface SampleData {
  hotel_details: HotelDetails;
  rooms_by_serial_no: RoomBySerialNo[];
  avail_id: string;
  [key: string]: any; // For any additional properties in the large JSON
}
