import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/nour/PageShell";
import { MatchCard } from "@/components/nour/MatchCard";
import { StatusBadge, StatusTimeline } from "@/components/nour/StatusTimeline";
import { NGOS } from "@/lib/nour/data";
import { rankNgos } from "@/lib/nour/matching";
import { ngoById, providerById, useNour } from "@/lib/nour/store";
import { STATUS_FLOW, type DonationStatus } from "@/lib/nour/types";

export const Route = createFileRoute("/donations/$id")({
  head: () => ({
    meta: [
      { title: "Donation Tracking | Nour Ivy" },
      {
        name: "description",
        content:
          "Follow a Nour Ivy donation from listing through AI matching, acceptance, pickup, collection and distribution.",
      },
      { property: "og:title", content: "Donation Tracking | Nour Ivy" },
      {
        property: "og:description",
        content: "Live status timeline for a surplus food donation.",
      },
    ],
  }),
  component: DonationDetail,
});

function DonationDetail() {
  const { id } = Route.useParams();
  const { donations, updateDonation, advanceStatus, session } = useNour();
  const navigate = useNavigate();
  const donation = donations.find((d) => d.id === id);
  const [showMatches, setShowMatches] = useState(false);

  const matches = useMemo(() => (donation ? rankNgos(donation, NGOS) : []), [donation]);

  if (!donation) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-3xl">Donation not found</h1>
          <Link to="/dashboard" className="mt-6 inline-block">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  const provider = providerById(donation.providerId);
  const matchedNgo = ngoById(donation.matchedNgoId);
  const currentIndex = STATUS_FLOW.indexOf(donation.status);
  const nextStatus: DonationStatus | undefined = STATUS_FLOW[currentIndex + 1];

  const runMatch = () => {
    const best = matches[0];
    if (!best) return;
    updateDonation(donation.id, {
      status: "AI Matched",
      matchedNgoId: best.ngo.id,
      matchScore: best.score,
      matchReason: best.reason,
    });
    setShowMatches(true);
    toast.success(`Best match found: ${best.ngo.name} (${best.score}%)`);
  };

  const acceptWith = (ngoId: string, score: number, reason: string) => {
    updateDonation(donation.id, {
      status: "Accepted",
      matchedNgoId: ngoId,
      matchScore: score,
      matchReason: reason,
    });
    toast.success("Donation accepted. Arrange pickup next.");
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    #{donation.id} · {provider?.name ?? "Provider"}
                  </p>
                  <h1 className="mt-1 text-3xl">{donation.foodName}</h1>
                  <p className="mt-1 text-muted-foreground">
                    {donation.category} · {donation.quantity} · ~{donation.servings} servings
                  </p>
                </div>
                <StatusBadge status={donation.status} />
              </div>

              <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                  <MapPin className="size-4 text-primary" /> {donation.pickupLocation}
                </span>
                <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                  <Clock className="size-4 text-primary" /> {donation.pickupWindow}
                </span>
                <span className="rounded-lg bg-secondary px-3 py-2">
                  Prepared: {new Date(donation.preparedAt).toLocaleString()}
                </span>
                <span className="rounded-lg bg-secondary px-3 py-2">
                  Consume by: {new Date(donation.consumeBy).toLocaleString()}
                </span>
                <span className="rounded-lg bg-secondary px-3 py-2">
                  Condition: {donation.condition}
                </span>
                {donation.notes && (
                  <span className="rounded-lg bg-secondary px-3 py-2">Notes: {donation.notes}</span>
                )}
              </div>

              {donation.imageUrl && (
                <img
                  src={donation.imageUrl}
                  alt={donation.foodName}
                  loading="lazy"
                  className="mt-5 max-h-64 w-full rounded-xl object-cover"
                />
              )}
            </div>

            {donation.status === "Listed" ? (
              <div className="card-surface p-6 text-center">
                <Sparkles className="mx-auto size-7 text-primary" />
                <h2 className="mt-3 text-xl">Run AI matching</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nour Ivy will score every verified NGO on distance, capacity, food fit, urgency
                  and reliability.
                </p>
                <Button className="mt-5" onClick={runMatch}>
                  Find the best NGO match
                </Button>
              </div>
            ) : (
              matchedNgo &&
              donation.matchScore && (
                <div>
                  <h2 className="mb-3 text-xl">
                    {donation.status === "AI Matched" ? "AI recommendation" : "Matched NGO"}
                  </h2>
                  <MatchCard
                    highlight
                    match={{
                      ngo: matchedNgo,
                      score: donation.matchScore,
                      distance: matches.find((m) => m.ngo.id === matchedNgo.id)?.distance ?? 0,
                      reason: donation.matchReason ?? "",
                      factors: matches.find((m) => m.ngo.id === matchedNgo.id)?.factors ?? [],
                    }}
                    {...(donation.status === "AI Matched"
                      ? {
                          onAccept: () =>
                            acceptWith(
                              matchedNgo.id,
                              donation.matchScore!,
                              donation.matchReason ?? "",
                            ),
                        }
                      : {})}
                  />
                </div>
              )
            )}

            {(donation.status === "AI Matched" || showMatches) && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl">Other recommended NGOs</h2>
                </div>
                <div className="grid gap-4">
                  {matches
                    .filter((m) => m.ngo.id !== donation.matchedNgoId)
                    .slice(0, 3)
                    .map((m) => (
                      <MatchCard
                        key={m.ngo.id}
                        match={m}
                        actionLabel={`Accept with ${m.ngo.name}`}
                        onAccept={() => acceptWith(m.ngo.id, m.score, m.reason)}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card-surface p-6">
              <h2 className="text-lg">Status timeline</h2>
              <div className="mt-5">
                <StatusTimeline status={donation.status} />
              </div>
              {nextStatus && donation.status !== "Listed" && (
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={() => {
                    advanceStatus(donation.id, nextStatus);
                    toast.success(`Marked as ${nextStatus}`);
                  }}
                >
                  Mark as {nextStatus}
                </Button>
              )}
              {session && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Acting as {session.name}. In production, each stage is restricted to the
                  responsible role.
                </p>
              )}
            </div>

            <div className="card-surface p-6">
              <h2 className="text-lg">Estimated impact</h2>
              <p className="mt-3 font-display text-3xl text-primary">{donation.servings}</p>
              <p className="text-sm text-muted-foreground">meals redirected from waste</p>
              <p className="mt-3 text-sm text-muted-foreground">
                ≈ {(donation.servings * 0.42).toFixed(1)} kg food saved · ≈{" "}
                {(donation.servings * 1.1).toFixed(1)} kg CO₂e avoided
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
