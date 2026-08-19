import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusTimeline";
import { ngoById, providerById } from "@/lib/nour/store";
import type { Donation } from "@/lib/nour/types";

export function DonationRow({ donation, show = "ngo" }: { donation: Donation; show?: "ngo" | "provider" }) {
  const other =
    show === "ngo"
      ? (ngoById(donation.matchedNgoId)?.name ?? "Awaiting match")
      : (providerById(donation.providerId)?.name ?? "Provider");
  return (
    <Link
      to="/donations/$id"
      params={{ id: donation.id }}
      className="card-surface flex items-center justify-between gap-4 p-4 transition-shadow hover:shadow-lift"
    >
      <div className="min-w-0">
        <p className="truncate font-medium">{donation.foodName}</p>
        <p className="truncate text-sm text-muted-foreground">
          {donation.category} · {donation.servings} servings · {other}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <StatusBadge status={donation.status} />
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </Link>
  );
}
