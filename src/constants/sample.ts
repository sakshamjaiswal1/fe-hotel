import { Hotel } from "../interface/room.interface";

// Helper function to generate responsive images with srcset
const generateResponsiveImage = (baseUrl: string, alt: string = "") => {
  // Extract the base URL without width parameter
  const baseUrlWithoutWidth = baseUrl.replace(/&w=\d+/, "");

  return {
    src: `${baseUrlWithoutWidth}&w=800`, // Default/fallback image
    srcset: `${baseUrlWithoutWidth}&w=400 400w, ${baseUrlWithoutWidth}&w=800 800w, ${baseUrlWithoutWidth}&w=1200 1200w`,
    sizes: "(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px",
    alt,
  };
};

const createHotel = (
  id: number,
  type: "luxury" | "beach" | "mountain",
  basePrice: number
): Hotel => {
  const names = ["The Grand Palace", "Luxury Resort", "Mountain View Lodge"];
  const nameIndex = Math.floor(Math.random() * names.length);

  const locations = [
    {
      street: "123 Luxury Avenue",
      city: "New York",
      country: "USA",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      street: "456 Beach Road",
      city: "Miami",
      country: "USA",
      coordinates: { lat: 25.7617, lng: -80.1918 },
    },
    {
      street: "789 Mountain Trail",
      city: "Aspen",
      country: "USA",
      coordinates: { lat: 39.1911, lng: -106.8175 },
    },
    {
      street: "321 Park Lane",
      city: "London",
      country: "UK",
      coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    {
      street: "654 Alpine Street",
      city: "Zurich",
      country: "Switzerland",
      coordinates: { lat: 47.3769, lng: 8.5417 },
    },
  ];

  const location = locations[Math.floor(Math.random() * locations.length)];
  const priceMultiplier = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
  const discountPercent = Math.floor(Math.random() * 30) + 5; // 5% to 35%

  // Optimized stable video URLs
  const videoSet = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ];

  const imageSet = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  const videoIndex = Math.floor(Math.random() * videoSet.length);
  const imageIndex = Math.floor(Math.random() * imageSet.length);

  return {
    id: `hotel-${id}`,
    name: `${names[nameIndex]} ${
      type === "luxury" ? "Hotel" : type === "beach" ? "Resort" : "Lodge"
    }`,
    address: location,
    rating: 3.5 + Math.random() * 1.5, // 3.5 to 5.0
    star_rating: Math.floor(Math.random() * 3) + 3, // 3 to 5 stars
    description:
      type === "luxury"
        ? "Experience unparalleled luxury in the heart of the city. Our hotel offers world-class amenities, exceptional service, and breathtaking views."
        : type === "beach"
        ? "Escape to paradise at our beachfront resort. Enjoy pristine beaches, crystal-clear waters, and endless sunshine."
        : "Discover tranquility in the mountains. Our lodge offers stunning alpine views, outdoor adventures, and cozy comfort.",
    amenities:
      type === "luxury"
        ? [
            "Concierge Service",
            "Spa & Wellness Center",
            "Fine Dining Restaurant",
            "Business Center",
            "Valet Parking",
            "24/7 Room Service",
            "Fitness Center",
            "Conference Rooms",
          ]
        : type === "beach"
        ? [
            "Private Beach",
            "Swimming Pool",
            "Water Sports",
            "Beachside Bar",
            "Spa Services",
            "Kids Club",
            "Snorkeling Equipment",
            "Beach Volleyball",
          ]
        : [
            "Hiking Trails",
            "Ski Equipment Rental",
            "Mountain Guides",
            "Outdoor Fire Pit",
            "Wellness Center",
            "Adventure Tours",
            "Mountain Biking",
            "Hot Tub",
          ],
    rooms: (() => {
      // Define room variants for each hotel type
      const roomVariants = {
        luxury: [
          {
            name: "Standard Room",
            description:
              "Comfortable room with modern amenities and city views.",
            priceMultiple: 1.0,
            bedType: "Queen Bed",
            sizeRange: [25, 35],
            capacity: { adults: 2, children: 1 },
            amenities: [
              "Free WiFi",
              "Air Conditioning",
              "TV",
              "Safe",
              "Minibar",
            ],
          },
          {
            name: "Deluxe King Room",
            description:
              "Spacious room with king bed, city view, and marble bathroom. Perfect for business travelers.",
            priceMultiple: 1.3,
            bedType: "King Bed",
            sizeRange: [35, 45],
            capacity: { adults: 2, children: 2 },
            amenities: [
              "Free WiFi",
              "Air Conditioning",
              "TV",
              "Safe",
              "Minibar",
              "Coffee Machine",
            ],
          },
          {
            name: "Executive Suite",
            description:
              "Luxury suite with separate living area, panoramic city views, and premium amenities.",
            priceMultiple: 1.8,
            bedType: "King Bed + Sofa Bed",
            sizeRange: [60, 80],
            capacity: { adults: 3, children: 2 },
            amenities: [
              "Free WiFi",
              "Air Conditioning",
              "TV",
              "Safe",
              "Minibar",
              "Coffee Machine",
              "Living Area",
              "Balcony",
            ],
          },
          {
            name: "Premium Suite",
            description:
              "Luxury suite with premium amenities, workspace, and butler service.",
            priceMultiple: 2.2,
            bedType: "King Bed + Living Area",
            sizeRange: [80, 100],
            capacity: { adults: 4, children: 2 },
            amenities: [
              "Free WiFi",
              "Air Conditioning",
              "TV",
              "Safe",
              "Premium Minibar",
              "Butler Service",
              "Workspace",
              "Living Area",
              "Premium Balcony",
            ],
          },
          {
            name: "Presidential Suite",
            description:
              "Ultimate luxury with multiple rooms, private dining, and concierge service.",
            priceMultiple: 3.0,
            bedType: "2 King Beds + Living Area",
            sizeRange: [120, 150],
            capacity: { adults: 6, children: 3 },
            amenities: [
              "Free WiFi",
              "Air Conditioning",
              "Multiple TVs",
              "Safe",
              "Premium Bar",
              "Private Dining",
              "Concierge Service",
              "Multiple Balconies",
              "Jacuzzi",
            ],
          },
        ],
        beach: [
          {
            name: "Garden View Room",
            description:
              "Comfortable room with tropical garden views and beach access.",
            priceMultiple: 1.0,
            bedType: "Queen Bed",
            sizeRange: [30, 40],
            capacity: { adults: 2, children: 2 },
            amenities: [
              "Beach Access",
              "Free WiFi",
              "Air Conditioning",
              "TV",
              "Safe",
              "Minibar",
            ],
          },
          {
            name: "Ocean View Suite",
            description:
              "Luxurious suite with panoramic ocean views, private balcony, and premium amenities.",
            priceMultiple: 1.4,
            bedType: "King Bed",
            sizeRange: [40, 50],
            capacity: { adults: 2, children: 2 },
            amenities: [
              "Ocean View",
              "Balcony",
              "Free WiFi",
              "Minibar",
              "Safe",
              "TV",
              "Coffee Machine",
            ],
          },
          {
            name: "Beachfront Suite",
            description:
              "Spacious suite with direct beach access and ocean-facing terrace.",
            priceMultiple: 1.9,
            bedType: "King Bed + Sofa Bed",
            sizeRange: [70, 90],
            capacity: { adults: 4, children: 3 },
            amenities: [
              "Direct Beach Access",
              "Ocean View",
              "Free WiFi",
              "Kitchen",
              "Living Area",
              "Private Terrace",
              "Beach Equipment",
            ],
          },
          {
            name: "Beachfront Villa",
            description:
              "Private villa with direct beach access, private pool, and personalized service.",
            priceMultiple: 2.5,
            bedType: "2 King Beds",
            sizeRange: [100, 120],
            capacity: { adults: 6, children: 4 },
            amenities: [
              "Beach Access",
              "Private Pool",
              "Free WiFi",
              "Kitchen",
              "Living Area",
              "Balcony",
            ],
          },
          {
            name: "Overwater Bungalow",
            description:
              "Unique overwater accommodation with glass floor panels and infinite ocean views.",
            priceMultiple: 3.2,
            bedType: "King Bed + Daybed",
            sizeRange: [80, 100],
            capacity: { adults: 4, children: 2 },
            amenities: [
              "Overwater Location",
              "Glass Floor",
              "Private Deck",
              "Direct Ocean Access",
              "Free WiFi",
              "Minibar",
              "Outdoor Shower",
              "Snorkeling Equipment",
            ],
          },
        ],
        mountain: [
          {
            name: "Standard Mountain Room",
            description: "Cozy room with mountain views and rustic charm.",
            priceMultiple: 1.0,
            bedType: "Queen Bed",
            sizeRange: [25, 35],
            capacity: { adults: 2, children: 1 },
            amenities: [
              "Mountain View",
              "Free WiFi",
              "Fireplace",
              "TV",
              "Safe",
            ],
          },
          {
            name: "Alpine Suite",
            description:
              "Rustic luxury suite with mountain views, fireplace, and premium amenities.",
            priceMultiple: 1.5,
            bedType: "King Bed",
            sizeRange: [45, 60],
            capacity: { adults: 2, children: 2 },
            amenities: [
              "Mountain View",
              "Fireplace",
              "Free WiFi",
              "Minibar",
              "Safe",
              "TV",
              "Balcony",
            ],
          },
          {
            name: "Mountain Cabin",
            description:
              "Cozy cabin with rustic charm, private hot tub, and scenic mountain views.",
            priceMultiple: 2.0,
            bedType: "King Bed + Sofa Bed",
            sizeRange: [70, 90],
            capacity: { adults: 4, children: 2 },
            amenities: [
              "Mountain View",
              "Hot Tub",
              "Fireplace",
              "Free WiFi",
              "Kitchen",
              "Living Area",
            ],
          },
          {
            name: "Lodge Suite",
            description:
              "Spacious lodge-style suite with multiple rooms and premium mountain amenities.",
            priceMultiple: 2.4,
            bedType: "2 Queen Beds",
            sizeRange: [90, 110],
            capacity: { adults: 6, children: 3 },
            amenities: [
              "Multiple Rooms",
              "Mountain View",
              "Fireplace",
              "Free WiFi",
              "Full Kitchen",
              "Living Area",
              "Private Deck",
              "Ski Equipment Storage",
            ],
          },
          {
            name: "Peak Penthouse",
            description:
              "Ultimate mountain luxury with 360-degree views, spa, and private chef service.",
            priceMultiple: 3.5,
            bedType: "2 King Beds + Living Area",
            sizeRange: [150, 200],
            capacity: { adults: 8, children: 4 },
            amenities: [
              "360-Degree Views",
              "Private Spa",
              "Private Chef",
              "Multiple Fireplaces",
              "Free WiFi",
              "Full Kitchen",
              "Multiple Living Areas",
              "Private Elevator",
            ],
          },
        ],
      };

      const variants = roomVariants[type];
      const numRooms = 4 + Math.floor(Math.random() * 2); // 4 or 5 rooms
      const selectedVariants = variants.slice(0, numRooms);

      return selectedVariants.map((variant, index) => {
        const roomVideoIndex = (videoIndex + index) % 5;
        const roomImageIndex = (imageIndex + index) % 4;
        const roomSize =
          variant.sizeRange[0] +
          Math.floor(
            Math.random() * (variant.sizeRange[1] - variant.sizeRange[0])
          );

        return {
          id: `room-${id}-${index + 1}`,
          name: variant.name,
          description: variant.description,
          price: {
            original: Math.round(
              basePrice * priceMultiplier * variant.priceMultiple
            ),
            discounted: Math.round(
              (basePrice *
                priceMultiplier *
                variant.priceMultiple *
                (100 - discountPercent)) /
                100
            ),
            currency:
              location.country === "USA"
                ? "USD"
                : location.country === "UK"
                ? "GBP"
                : "EUR",
            discount_percentage: discountPercent,
          },
          amenities: variant.amenities,
          capacity: variant.capacity,
          bed_type: variant.bedType,
          size: `${roomSize} m²`,
          media: [
            {
              id: `media-${id}-${index * 2 + 1}`,
              type: "image" as const,
              url: imageSet[roomImageIndex],
              thumbnail: imageSet[roomImageIndex].replace("w=1470", "w=400"),
              alt: `${variant.name} Room`,
              title: `${variant.name} Overview`,
            },
            {
              id: `media-${id}-${index * 2 + 2}`,
              type: "video" as const,
              url: videoSet[roomVideoIndex],
              thumbnail: imageSet[roomImageIndex].replace("w=1470", "w=400"),
              alt: "Room Tour Video",
              title: "Virtual Room Tour",
            },
          ],
          // New priority-based media structure
          video_url:
            Math.random() > 0.9
              ? [
                  videoSet[roomVideoIndex],
                  ...(Math.random() > 0.7
                    ? [videoSet[(roomVideoIndex + 1) % 5]]
                    : []),
                ]
              : undefined,
          room_images: [
            generateResponsiveImage(
              imageSet[roomImageIndex],
              `${variant.name} Room`
            ),
            generateResponsiveImage(
              imageSet[(roomImageIndex + 1) % 4],
              `${variant.name} Room View`
            ),
            ...(Math.random() > 0.6
              ? [
                  generateResponsiveImage(
                    imageSet[(roomImageIndex + 2) % 4],
                    `${variant.name} Room Interior`
                  ),
                ]
              : []),
          ],
          cancellation_policy: `Free cancellation until ${
            Math.random() > 0.5 ? "24" : index > 2 ? "72" : "48"
          } hours before check-in`,
          availability:
            Math.random() > (index === 0 ? 0.05 : index > 2 ? 0.2 : 0.1), // Higher-tier rooms have slightly lower availability
        };
      });
    })(),
  };
};

export const hotelsData: Hotel[] = [
  // Luxury Hotels (1-37)
  ...Array.from({ length: 37 }, (_, i) => createHotel(i + 1, "luxury", 350)),

  // Beach Resorts (38-74)
  ...Array.from({ length: 37 }, (_, i) => createHotel(i + 38, "beach", 450)),

  // Mountain Lodges (75-110)
  ...Array.from({ length: 36 }, (_, i) => createHotel(i + 75, "mountain", 520)),
];

export default hotelsData;
