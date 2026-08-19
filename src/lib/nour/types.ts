export type Role = "provider" | "ngo" | "volunteer" | "admin";

export type FoodCategory =
  | "Cooked meals"
  | "Bakery"
  | "Fruits"
  | "Vegetables"
  | "Packaged food"
  | "Dairy"
  | "Other";

export const FOOD_CATEGORIES: FoodCategory[] = [
  "Cooked meals",
  "Bakery",
  "Fruits",
  "Vegetables",
  "Packaged food",
  "Dairy",
  "Other",
];

export type ProviderType =
  | "Restaurant"
  | "Hotel"
  | "Café"
  | "Bakery"
  | "Caterer"
  | "Event"
  | "Supermarket"
  | "Food manufacturer"
  | "Corporate cafeteria";

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  location: string;
  lat: number;
  lng: number;
  verified: boolean;
  reliability: number; // 0-1
}

export interface Ngo {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  verified: boolean;
  capacityMeals: number;
  acceptedCategories: FoodCategory[];
  pickupWindowMinutes: number; // how fast they can collect
  reliability: number;
  peopleServed: number;
}

export type DonationStatus =
  | "Listed"
  | "AI Matched"
  | "Accepted"
  | "Pickup Scheduled"
  | "Collected"
  | "Distributed"
  | "Completed";

export const STATUS_FLOW: DonationStatus[] = [
  "Listed",
  "AI Matched",
  "Accepted",
  "Pickup Scheduled",
  "Collected",
  "Distributed",
  "Completed",
];

export interface Donation {
  id: string;
  providerId: string;
  foodName: string;
  category: FoodCategory;
  quantity: string;
  servings: number;
  preparedAt: string; // ISO
  consumeBy: string; // ISO
  pickupLocation: string;
  pickupWindow: string;
  condition: string;
  notes?: string;
  imageUrl?: string;
  createdAt: string;
  status: DonationStatus;
  matchedNgoId?: string;
  matchScore?: number;
  matchReason?: string;
}

export interface SessionUser {
  name: string;
  role: Role;
  orgId: string; // provider id or ngo id, "admin" for admin
}
