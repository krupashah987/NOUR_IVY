import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/nour/PageShell";
import { NGOS } from "@/lib/nour/data";

export const Route = createFileRoute("/for-ngos")({
  head: () => ({
    meta: [
      { title: "For NGOs — Receive Matched Surplus Food | Nour Ivy" },
      {
        name: "description",
        content:
          "Verified NGOs and community organisations receive AI-matched surplus food offers based on capacity, food requirements and pickup availability.",
      },
      { property: "og:title", content: "For NGOs | Nour Ivy" },
      {
        property: "og:description",
        content: "Reliable surplus food offers matched to your capacity and requirements.",
      },
    ],
  }),
  component: ForNgos,
});

function ForNgos() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For NGOs & community organisations"
        title="Reliable food offers that actually fit your capacity."
        description="Set your capacity, accepted food types and pickup speed once. Nour Ivy only sends you donations you can genuinely collect and distribute."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl">Partner NGOs</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {NGOS.map((n) => (
            <div key={n.id} className="card-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl">{n.name}</p>
                  <p className="text-sm text-muted-foreground">{n.location}</p>
                </div>
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
                  Verified
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-secondary px-3 py-2">
                  Capacity: {n.capacityMeals} meals
                </div>
                <div className="rounded-lg bg-secondary px-3 py-2">
                  Pickup: {n.pickupWindowMinutes} min
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Accepts: {n.acceptedCategories.join(", ")}
              </p>
              <p className="mt-1 text-xs text-primary">
                {n.peopleServed.toLocaleString()} people served to date
              </p>
            </div>
          ))}
        </div>
        <Link to="/auth" search={{ role: "ngo" }} className="mt-8 inline-block">
          <Button size="lg">Join as an NGO</Button>
        </Link>
      </section>
    </PageShell>
  );
}
