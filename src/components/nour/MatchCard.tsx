import { Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MatchResult } from "@/lib/nour/matching";

export function MatchCard({
  match,
  onAccept,
  actionLabel = "Accept Donation",
  disabled,
  highlight,
}: {
  match: MatchResult;
  onAccept?: () => void;
  actionLabel?: string;
  disabled?: boolean;
  highlight?: boolean;
}) {
  const { ngo, score, distance, reason, factors } = match;
  return (
    <div
      className={`card-surface p-6 ${highlight ? "border-primary ring-2 ring-primary/20" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl">{ngo.name}</h3>
            {ngo.verified && (
              <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs text-success">
                <ShieldCheck className="size-3" /> Verified
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{ngo.location}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-primary">{score}% Match</p>
          <p className="text-xs text-muted-foreground">AI recommendation score</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <MapPin className="size-4 text-primary" /> {distance} km away
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Users className="size-4 text-primary" /> Capacity: {ngo.capacityMeals} meals
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Clock className="size-4 text-primary" /> Pickup in {ngo.pickupWindowMinutes} min
        </span>
      </div>

      <p className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
        {reason}
      </p>

      <div className="mt-4 space-y-2">
        {factors.map((f) => (
          <div key={f.label} className="flex items-center gap-3 text-xs">
            <span className="w-28 shrink-0 text-muted-foreground">{f.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${f.weight}%` }}
              />
            </span>
            <span className="w-20 shrink-0 text-right text-muted-foreground">{f.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Requires: {ngo.acceptedCategories.join(", ")}
      </p>

      {onAccept && (
        <Button className="mt-5 w-full" onClick={onAccept} disabled={disabled}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
