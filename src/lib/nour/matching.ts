import type { Donation, Ngo } from "./types";
import { PROVIDERS } from "./data";

export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(la1) * Math.cos(la2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

export function hoursLeft(donation: Donation): number {
  return (new Date(donation.consumeBy).getTime() - Date.now()) / 3600_000;
}

export interface MatchResult {
  ngo: Ngo;
  score: number;
  distance: number;
  reason: string;
  factors: { label: string; value: string; weight: number }[];
}

/**
 * Nour Ivy matching engine — scores every verified NGO against a donation on
 * distance, capacity, food-type fit, urgency vs. pickup speed and reliability.
 */
export function rankNgos(donation: Donation, ngos: Ngo[]): MatchResult[] {
  const provider = PROVIDERS.find((p) => p.id === donation.providerId);
  const origin = provider ?? { lat: 17.43, lng: 78.42 };
  const urgency = hoursLeft(donation);

  return ngos
    .filter((n) => n.verified)
    .map((ngo) => {
      const distance = distanceKm(origin, ngo);
      const distanceScore = Math.max(0, 1 - distance / 15);
      const capacityRatio = ngo.capacityMeals / Math.max(donation.servings, 1);
      const capacityScore =
        capacityRatio >= 1 ? Math.min(1, 0.75 + 0.25 / capacityRatio) : capacityRatio * 0.8;
      const typeScore = ngo.acceptedCategories.includes(donation.category) ? 1 : 0.25;
      const pickupHours = ngo.pickupWindowMinutes / 60;
      const urgencyScore =
        urgency <= 0 ? 0.2 : Math.max(0.15, Math.min(1, (urgency - pickupHours) / urgency + 0.2));
      const reliabilityScore = ngo.reliability;

      const score = Math.round(
        (distanceScore * 0.3 +
          capacityScore * 0.25 +
          typeScore * 0.2 +
          urgencyScore * 0.15 +
          reliabilityScore * 0.1) *
          100,
      );

      const reason = `Recommended because ${ngo.name} is ${distance} km away, currently has capacity for ${ngo.capacityMeals} meals, ${
        typeScore === 1 ? `accepts ${donation.category.toLowerCase()}` : "can handle mixed food types"
      }, and can arrange pickup within ${ngo.pickupWindowMinutes} minutes.`;

      return {
        ngo,
        score: Math.max(35, Math.min(99, score)),
        distance,
        reason,
        factors: [
          { label: "Distance", value: `${distance} km`, weight: Math.round(distanceScore * 100) },
          {
            label: "Capacity",
            value: `${ngo.capacityMeals} meals`,
            weight: Math.round(capacityScore * 100),
          },
          {
            label: "Food type fit",
            value: typeScore === 1 ? "Accepted" : "Partial",
            weight: Math.round(typeScore * 100),
          },
          {
            label: "Pickup speed",
            value: `${ngo.pickupWindowMinutes} min`,
            weight: Math.round(urgencyScore * 100),
          },
          {
            label: "Reliability",
            value: `${Math.round(ngo.reliability * 100)}%`,
            weight: Math.round(reliabilityScore * 100),
          },
        ],
      };
    })
    .sort((a, b) => b.score - a.score);
}
