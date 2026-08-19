import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  HandHeart,
  PackagePlus,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/nour/PageShell";
import { StatCard } from "@/components/nour/StatCard";
import { DonationRow } from "@/components/nour/DonationRow";
import { MatchCard } from "@/components/nour/MatchCard";
import { NGOS, PROVIDERS } from "@/lib/nour/data";
import { rankNgos } from "@/lib/nour/matching";
import { ngoById, providerById, roleLabel, useNour } from "@/lib/nour/store";
import type { Donation } from "@/lib/nour/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Nour Ivy" },
      {
        name: "description",
        content:
          "Your Nour Ivy dashboard: active donations, AI matches, pickups, distributions and impact metrics for your role.",
      },
      { property: "og:title", content: "Nour Ivy Dashboard" },
      {
        property: "og:description",
        content: "Active donations, AI matches, pickups and impact in one place.",
      },
    ],
  }),
  component: Dashboard,
});

const ACTIVE = ["Listed", "AI Matched", "Accepted", "Pickup Scheduled", "Collected", "Distributed"];

function Dashboard() {
  const { session, donations, hydrated } = useNour();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !session) navigate({ to: "/auth", search: { role: "provider" }, replace: true });
  }, [hydrated, session, navigate]);

  if (!session) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center text-muted-foreground">
          Loading your dashboard…
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="bg-gradient-warm border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-10">
          <div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {roleLabel[session.role]}
            </span>
            <h1 className="mt-1 text-4xl">{session.name}</h1>
          </div>
          {session.role === "provider" && (
            <Link to="/donate">
              <Button size="lg">
                <PackagePlus className="mr-1 size-4" /> Create donation
              </Button>
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {session.role === "provider" && <ProviderView donations={donations} orgId={session.orgId} />}
        {session.role === "ngo" && <NgoView donations={donations} orgId={session.orgId} />}
        {session.role === "volunteer" && <VolunteerView donations={donations} />}
        {session.role === "admin" && <AdminView donations={donations} />}
      </div>
    </PageShell>
  );
}

function ProviderView({ donations, orgId }: { donations: Donation[]; orgId: string }) {
  const mine = donations.filter((d) => d.providerId === orgId);
  const active = mine.filter((d) => ACTIVE.includes(d.status));
  const completed = mine.filter((d) => d.status === "Completed");
  const servings = mine.reduce((s, d) => s + d.servings, 0);
  const latest = active[0];
  const topMatch = useMemo(() => (latest ? rankNgos(latest, NGOS)[0] : undefined), [latest]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={PackagePlus} label="Active donations" value={active.length} />
        <StatCard icon={CheckCircle2} label="Donations completed" value={completed.length} />
        <StatCard
          icon={Recycle}
          label="Food saved"
          value={`${(servings * 0.42).toFixed(0)} kg`}
          hint="Estimated"
        />
        <StatCard icon={Users} label="People served" value={servings} />
      </div>

      {topMatch && latest && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-2xl">
            <Sparkles className="size-5 text-primary" /> AI recommended NGO for "{latest.foodName}"
          </h2>
          <MatchCard match={topMatch} highlight />
          <Link to="/donations/$id" params={{ id: latest.id }} className="mt-3 inline-block">
            <Button variant="outline">Open donation</Button>
          </Link>
        </div>
      )}

      <Section title="Current listings" empty="No active listings yet.">
        {active.map((d) => (
          <DonationRow key={d.id} donation={d} />
        ))}
      </Section>

      <Section title="Donation history" empty="No completed donations yet.">
        {completed.map((d) => (
          <DonationRow key={d.id} donation={d} />
        ))}
      </Section>
    </div>
  );
}

function NgoView({ donations, orgId }: { donations: Donation[]; orgId: string }) {
  const { updateDonation } = useNour();
  const ngo = ngoById(orgId);
  const mine = donations.filter((d) => d.matchedNgoId === orgId);
  const available = donations.filter((d) => d.status === "Listed");
  const accepted = mine.filter((d) => ["Accepted", "Pickup Scheduled"].includes(d.status));
  const pending = mine.filter((d) => d.status === "Pickup Scheduled" || d.status === "Collected");
  const completed = mine.filter((d) => ["Distributed", "Completed"].includes(d.status));
  const peopleServed = completed.reduce((s, d) => s + d.servings, 0);
  const aiMatches = mine.filter((d) => d.status === "AI Matched");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UtensilsCrossed} label="Available food nearby" value={available.length} />
        <StatCard icon={Sparkles} label="AI matches" value={aiMatches.length} />
        <StatCard icon={Truck} label="Pending pickups" value={pending.length} />
        <StatCard icon={Users} label="People served" value={peopleServed} />
      </div>

      {ngo && (
        <div className="card-surface p-5 text-sm text-muted-foreground">
          Your profile: capacity {ngo.capacityMeals} meals · pickup within {ngo.pickupWindowMinutes}{" "}
          min · accepts {ngo.acceptedCategories.join(", ")}
        </div>
      )}

      <Section title="AI matches waiting for you" empty="No new matches right now.">
        {aiMatches.map((d) => (
          <div key={d.id} className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg">{d.foodName}</p>
                <p className="text-sm text-muted-foreground">
                  {providerById(d.providerId)?.name} · {d.servings} servings · pickup{" "}
                  {d.pickupWindow}
                </p>
              </div>
              <span className="font-display text-xl text-primary">{d.matchScore}% Match</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{d.matchReason}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  updateDonation(d.id, { status: "Accepted" });
                  toast.success("Donation accepted");
                }}
              >
                Accept Donation
              </Button>
              <Link to="/donations/$id" params={{ id: d.id }}>
                <Button variant="outline">View details</Button>
              </Link>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Available food nearby" empty="Nothing unclaimed nearby.">
        {available.map((d) => (
          <DonationRow key={d.id} donation={d} show="provider" />
        ))}
      </Section>

      <Section title="Accepted donations" empty="No accepted donations.">
        {accepted.map((d) => (
          <DonationRow key={d.id} donation={d} show="provider" />
        ))}
      </Section>

      <Section title="Completed distributions" empty="No distributions logged yet.">
        {completed.map((d) => (
          <DonationRow key={d.id} donation={d} show="provider" />
        ))}
      </Section>
    </div>
  );
}

function VolunteerView({ donations }: { donations: Donation[] }) {
  const { advanceStatus } = useNour();
  const jobs = donations.filter((d) =>
    ["Accepted", "Pickup Scheduled", "Collected"].includes(d.status),
  );
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Truck} label="Pickup jobs available" value={jobs.length} />
        <StatCard
          icon={UtensilsCrossed}
          label="Meals in transit"
          value={jobs.reduce((s, d) => s + d.servings, 0)}
        />
        <StatCard icon={HandHeart} label="NGOs supported" value={NGOS.length} />
      </div>
      <Section title="Pickup runs" empty="No pickup runs right now.">
        {jobs.map((d) => (
          <div key={d.id} className="card-surface p-5">
            <p className="font-display text-lg">{d.foodName}</p>
            <p className="text-sm text-muted-foreground">
              {providerById(d.providerId)?.name} → {ngoById(d.matchedNgoId)?.name ?? "TBD"} ·{" "}
              {d.pickupWindow}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.status !== "Collected" && (
                <Button
                  onClick={() => {
                    advanceStatus(d.id, "Collected");
                    toast.success("Marked as collected");
                  }}
                >
                  Mark collected
                </Button>
              )}
              <Link to="/donations/$id" params={{ id: d.id }}>
                <Button variant="outline">Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function AdminView({ donations }: { donations: Donation[] }) {
  const active = donations.filter((d) => ACTIVE.includes(d.status));
  const completed = donations.filter((d) => d.status === "Completed");
  const servings = donations.reduce((s, d) => s + d.servings, 0);
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Building2} label="Total food providers" value={PROVIDERS.length} />
        <StatCard icon={HandHeart} label="Total NGOs" value={NGOS.length} />
        <StatCard icon={PackagePlus} label="Active donations" value={active.length} />
        <StatCard icon={CheckCircle2} label="Completed donations" value={completed.length} />
        <StatCard icon={Recycle} label="Food saved" value={`${(servings * 0.42).toFixed(0)} kg`} />
        <StatCard icon={Users} label="Estimated people served" value={servings} />
      </div>

      <Section title="Platform activity" empty="No activity.">
        {donations.slice(0, 8).map((d) => (
          <DonationRow key={d.id} donation={d} show="provider" />
        ))}
      </Section>

      <div>
        <h2 className="mb-3 text-2xl">Verification requests</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Meridian Grand Hotel", type: "Hotel · Kondapur" },
            { name: "Anna Daan Trust", type: "NGO · Uppal" },
            { name: "Crust & Crumb Bakery", type: "Bakery · Kompally" },
          ].map((r) => (
            <div key={r.name} className="card-surface flex items-center justify-between gap-3 p-5">
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.type}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`${r.name} verified`)}
              >
                <ShieldCheck className="mr-1 size-4" /> Verify
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode[];
}) {
  return (
    <div>
      <h2 className="mb-3 text-2xl">{title}</h2>
      {children.length ? (
        <div className="grid gap-3">{children}</div>
      ) : (
        <p className="card-surface p-5 text-sm text-muted-foreground">{empty}</p>
      )}
    </div>
  );
}
