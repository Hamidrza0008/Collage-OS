// =============================================================================
// College OS - Lost & Found Master Dataset & Filter Utilities
// Derived for: All Items, Lost Items, Found Items, Categories, Search, Filters, Stats, Recent
// =============================================================================

export const LOST_FOUND_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "electronics", label: "Electronics" },
  { id: "bags", label: "Bags" },
  { id: "documents", label: "Documents" },
  { id: "clothing", label: "Clothing" },
  { id: "accessories", label: "Accessories" },
  { id: "others", label: "Others" },
];

export const LOCATIONS_LIST = [
  "All",
  "Library",
  "Main Gate",
  "Canteen",
  "Academic Block",
  "Hostel",
  "Sports Ground",
  "Other",
];

export const STATUS_STYLES = {
  Lost: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200/80 dark:border-rose-900/50",
    dot: "bg-rose-500",
  },
  Found: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200/80 dark:border-emerald-900/50",
    dot: "bg-emerald-500",
  },
  Resolved: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    text: "text-sky-700 dark:text-sky-400",
    border: "border-sky-200/80 dark:border-sky-900/50",
    dot: "bg-sky-500",
  },
};

export const INITIAL_LOST_FOUND_ITEMS = [
  {
    id: "item-1",
    status: "Lost",
    title: "MacBook Air (M2) – Space Grey",
    description:
      "Lost my MacBook Air (M2) 13-inch, space grey color. It was last seen in the library (2nd floor) on 18 Aug 2025.",
    category: "Electronics",
    tags: ["Electronics", "Laptop", "Apple"],
    location: "Library (2nd Floor)",
    locationCategory: "Library",
    date: "18 Aug 2025, 01:30 PM",
    rawDate: "2025-08-18T13:30:00",
    reportedBy: "Hamid Rza",
    contactEmail: "hamid.rza@college.edu",
    contactPhone: "+91 98765 43210",
    views: 124,
    commentsCount: 6,
    image: "/assets/lost-and-found/items/macbook-air.jpg",
    actionLabel: "View Details →",
    isCurrentUser: true,
  },
  {
    id: "item-2",
    status: "Found",
    title: "Black Wallet",
    description:
      "Found a black leather wallet near the main gate. Contains ID cards and some cash. Please claim it from campus office.",
    category: "Accessories",
    tags: ["Accessories", "Wallet", "Leather"],
    location: "Main Gate",
    locationCategory: "Main Gate",
    date: "17 Aug 2025, 04:45 PM",
    rawDate: "2025-08-17T16:45:00",
    reportedBy: "Rohan Mehta",
    contactEmail: "rohan.mehta@college.edu",
    contactPhone: "+91 98123 45678",
    views: 98,
    commentsCount: 4,
    image: "/assets/lost-and-found/items/black-wallet.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
  {
    id: "item-3",
    status: "Lost",
    title: "White Hoodie",
    description:
      "Lost my white hoodie (with small logo on chest) somewhere between hostel and academic block. Last seen on 16 Aug.",
    category: "Clothing",
    tags: ["Clothing", "Hoodie", "White"],
    location: "Between Hostel & Academic Block",
    locationCategory: "Hostel",
    date: "16 Aug 2025, 06:20 PM",
    rawDate: "2025-08-16T18:20:00",
    reportedBy: "Ayesha Khan",
    contactEmail: "ayesha.khan@college.edu",
    contactPhone: "+91 97234 56789",
    views: 87,
    commentsCount: 3,
    image: "/assets/lost-and-found/items/white-hoodie.jpg",
    actionLabel: "View Details →",
    isCurrentUser: false,
  },
  {
    id: "item-4",
    status: "Found",
    title: "AirPods Pro (Case)",
    description:
      "Found an AirPods Pro case near the canteen seating area. No earphones inside. Please claim with proof of ownership.",
    category: "Electronics",
    tags: ["Electronics", "Audio", "Apple"],
    location: "Canteen Seating Area",
    locationCategory: "Canteen",
    date: "15 Aug 2025, 12:10 PM",
    rawDate: "2025-08-15T12:10:00",
    reportedBy: "Karan Singh",
    contactEmail: "karan.singh@college.edu",
    contactPhone: "+91 98345 67890",
    views: 76,
    commentsCount: 2,
    image: "/assets/lost-and-found/items/airpods-pro.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
  {
    id: "item-5",
    status: "Lost",
    title: "Casio fx-991EX Scientific Calculator",
    description:
      "Left my Casio fx-991EX calculator in Lecture Hall 3 after the Engineering Maths exam. Initials HR inscribed on the back slide cover.",
    category: "Electronics",
    tags: ["Electronics", "Calculator", "Study"],
    location: "Academic Block (Hall 3)",
    locationCategory: "Academic Block",
    date: "14 Aug 2025, 11:15 AM",
    rawDate: "2025-08-14T11:15:00",
    reportedBy: "Hamid Rza",
    contactEmail: "hamid.rza@college.edu",
    contactPhone: "+91 98765 43210",
    views: 52,
    commentsCount: 1,
    image: "/assets/lost-and-found/items/calculator.jpg",
    actionLabel: "View Details →",
    isCurrentUser: true,
  },
  {
    id: "item-6",
    status: "Found",
    title: "Blue North Face Backpack",
    description:
      "Found a navy blue backpack on the wooden bench outside the Sports Ground. Contains lecture notes, a pen case, and a water bottle.",
    category: "Bags",
    tags: ["Bags", "Backpack", "Navy"],
    location: "Sports Ground Bench",
    locationCategory: "Sports Ground",
    date: "13 Aug 2025, 05:30 PM",
    rawDate: "2025-08-13T17:30:00",
    reportedBy: "Vikram Joshi",
    contactEmail: "vikram.joshi@college.edu",
    contactPhone: "+91 98456 78901",
    views: 110,
    commentsCount: 5,
    image: "/assets/lost-and-found/items/blue-backpack.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
  {
    id: "item-7",
    status: "Resolved",
    title: "Student ID Card & Green Lanyard",
    description:
      "Found student ID card of Sarah Chen (Computer Science) with green neck lanyard near the Library cafe entrance. Handed over to security desk.",
    category: "Documents",
    tags: ["Documents", "ID Card", "Lanyard"],
    location: "Library Cafe",
    locationCategory: "Library",
    date: "12 Aug 2025, 02:15 PM",
    rawDate: "2025-08-12T14:15:00",
    reportedBy: "Sneha Patel",
    contactEmail: "sneha.patel@college.edu",
    contactPhone: "+91 98567 89012",
    views: 142,
    commentsCount: 8,
    image: "/assets/lost-and-found/items/id-card.jpg",
    actionLabel: "View Details →",
    isCurrentUser: false,
  },
  {
    id: "item-8",
    status: "Lost",
    title: "Sony Noise Cancelling Headphones",
    description:
      "Lost my matte black over-ear wireless headphones with zippered protective travel case in Academic Block Computer Lab 2 on desk 14.",
    category: "Electronics",
    tags: ["Electronics", "Audio", "Sony"],
    location: "Academic Block (Lab 2)",
    locationCategory: "Academic Block",
    date: "11 Aug 2025, 04:10 PM",
    rawDate: "2025-08-11T16:10:00",
    reportedBy: "Hamid Rza",
    contactEmail: "hamid.rza@college.edu",
    contactPhone: "+91 98765 43210",
    views: 138,
    commentsCount: 7,
    image: "/assets/lost-and-found/items/headphones.jpg",
    actionLabel: "View Details →",
    isCurrentUser: true,
  },
  {
    id: "item-9",
    status: "Found",
    title: "Hydro Flask Olive Water Bottle",
    description:
      "Found an olive green 32oz vacuum insulated Hydro Flask bottle on the amphitheater steps after evening club practice.",
    category: "Others",
    tags: ["Others", "Bottle", "Green"],
    location: "Amphitheater Steps",
    locationCategory: "Other",
    date: "10 Aug 2025, 06:00 PM",
    rawDate: "2025-08-10T18:00:00",
    reportedBy: "Rohit Kumar",
    contactEmail: "rohit.kumar@college.edu",
    contactPhone: "+91 98678 90123",
    views: 43,
    commentsCount: 1,
    image: "/assets/lost-and-found/items/water-bottle.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
  {
    id: "item-10",
    status: "Lost",
    title: "Ray-Ban Aviator Sunglasses in Leather Case",
    description:
      "Lost classic gold-frame aviator sunglasses in a brown leather case. Likely left in the 1st floor reading room of Central Library.",
    category: "Accessories",
    tags: ["Accessories", "Eyewear", "RayBan"],
    location: "Library (1st Floor)",
    locationCategory: "Library",
    date: "09 Aug 2025, 03:40 PM",
    rawDate: "2025-08-09T15:40:00",
    reportedBy: "Aman Verma",
    contactEmail: "aman.verma@college.edu",
    contactPhone: "+91 98789 01234",
    views: 65,
    commentsCount: 2,
    image: "/assets/lost-and-found/items/sunglasses.jpg",
    actionLabel: "View Details →",
    isCurrentUser: false,
  },
  {
    id: "item-11",
    status: "Found",
    title: "College ID Card with Green Strap",
    description:
      "Found a student ID card near the main gate security cabin. Please show verification to collect from security.",
    category: "Documents",
    tags: ["Documents", "ID Card", "Campus"],
    location: "Main Gate Security",
    locationCategory: "Main Gate",
    date: "08 Aug 2025, 09:20 AM",
    rawDate: "2025-08-08T09:20:00",
    reportedBy: "Deepak Nair",
    contactEmail: "deepak.nair@college.edu",
    contactPhone: "+91 98890 12345",
    views: 89,
    commentsCount: 3,
    image: "/assets/lost-and-found/items/id-card.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
  {
    id: "item-12",
    status: "Lost",
    title: "White College Sports Hoodie",
    description:
      "Lost a white collegiate hoodie in the indoor badminton court changing room. Has an embroidered crest on the sleeve.",
    category: "Clothing",
    tags: ["Clothing", "Hoodie", "Sports"],
    location: "Sports Ground Complex",
    locationCategory: "Sports Ground",
    date: "07 Aug 2025, 07:15 PM",
    rawDate: "2025-08-07T19:15:00",
    reportedBy: "Pooja Reddy",
    contactEmail: "pooja.reddy@college.edu",
    contactPhone: "+91 98901 23456",
    views: 58,
    commentsCount: 1,
    image: "/assets/lost-and-found/items/white-hoodie.jpg",
    actionLabel: "View Details →",
    isCurrentUser: false,
  },
  {
    id: "item-13",
    status: "Resolved",
    title: "Black Leather Bi-fold Wallet",
    description:
      "Found and successfully returned to owner! Black wallet containing driving license and metro pass found in Canteen.",
    category: "Accessories",
    tags: ["Accessories", "Wallet", "Resolved"],
    location: "Canteen Area",
    locationCategory: "Canteen",
    date: "06 Aug 2025, 01:00 PM",
    rawDate: "2025-08-06T13:00:00",
    reportedBy: "Hamid Rza",
    contactEmail: "hamid.rza@college.edu",
    contactPhone: "+91 98765 43210",
    views: 112,
    commentsCount: 5,
    image: "/assets/lost-and-found/items/black-wallet.jpg",
    actionLabel: "View Details →",
    isCurrentUser: true,
  },
  {
    id: "item-14",
    status: "Found",
    title: "AirPods Pro Case (White)",
    description:
      "Found an extra white wireless charging case near Hostel B common room study table. Engraved with small star symbol.",
    category: "Electronics",
    tags: ["Electronics", "Audio", "Apple"],
    location: "Hostel B Common Room",
    locationCategory: "Hostel",
    date: "05 Aug 2025, 10:30 AM",
    rawDate: "2025-08-05T10:30:00",
    reportedBy: "Ananya Roy",
    contactEmail: "ananya.roy@college.edu",
    contactPhone: "+91 99012 34567",
    views: 94,
    commentsCount: 4,
    image: "/assets/lost-and-found/items/airpods-pro.jpg",
    actionLabel: "Contact Owner",
    isCurrentUser: false,
  },
];

// Pure filter function
export function filterLostFoundItems(items, { tab, category, search, advancedFilters }) {
  return items.filter((item) => {
    // 1. Tab filter: 'all' | 'lost' | 'found'
    if (tab === "lost" && item.status.toLowerCase() !== "lost") {
      return false;
    }
    if (tab === "found" && item.status.toLowerCase() !== "found") {
      return false;
    }

    // 2. Category Chip filter
    if (category && category !== "all" && category !== "All") {
      if (item.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    // 3. Search query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      const matchLoc = item.location?.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      const matchReporter = item.reportedBy?.toLowerCase().includes(q);

      if (!matchTitle && !matchDesc && !matchCat && !matchLoc && !matchTags && !matchReporter) {
        return false;
      }
    }

    // 4. Advanced Filters
    if (advancedFilters) {
      // Item Type (Lost | Found)
      if (advancedFilters.type && advancedFilters.type !== "All") {
        if (item.status.toLowerCase() !== advancedFilters.type.toLowerCase()) {
          return false;
        }
      }

      // Location
      if (advancedFilters.location && advancedFilters.location !== "All") {
        const matchesLoc =
          item.locationCategory?.toLowerCase() === advancedFilters.location.toLowerCase() ||
          item.location?.toLowerCase().includes(advancedFilters.location.toLowerCase());
        if (!matchesLoc) return false;
      }

      // Category
      if (advancedFilters.category && advancedFilters.category !== "All") {
        if (item.category.toLowerCase() !== advancedFilters.category.toLowerCase()) {
          return false;
        }
      }

      // Status
      if (advancedFilters.status && advancedFilters.status !== "All") {
        if (item.status.toLowerCase() !== advancedFilters.status.toLowerCase()) {
          return false;
        }
      }

      // Reported By (All | Me)
      if (advancedFilters.reportedBy === "Me" && !item.isCurrentUser) {
        return false;
      }
    }

    return true;
  });
}
