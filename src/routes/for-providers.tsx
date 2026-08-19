import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Clock, LineChart, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/nour/PageShell";
import { PROVIDERS } from "@/lib/nour/data";

export const Route = createFileRoute("/for-providers")({
  head: () => ({
    meta: [
      { title: "For Food Providers — Donate Surplus Food | Nour Ivy" },
      {
        name: "description",
        content:
          "Restaurants, hotels, bakeries, caterers, supermarkets and cafeterias can list safe surplus food and let Nour Ivy match it to a verified NGO in minutes.",
      },
      { property: "og:title", content: "For Food Providers | Nour Ivy" },
      {
        property: "og:description",
        content: "List surplus food in a minute and let AI find the right NGO to receive it.",
      },
    ],
  }),
  component: ForProviders,
});

function ForProviders() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For food providers"
        title="Your surplus is someone's next meal."
        description="Any verified organisation with safe surplus food can donate — restaurants, hotels, cafés, bakeries, caterers, event organisers, supermarkets, manufacturers and corporate cafeterias."
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Clock, t: "One-minute listing", d: "Quantity, category, consume-by time, pickup window. Done." },
          { icon: PackageCheck, t: "Matched, not broadcast", d: "One best-fit NGO recommended, with the reasoning shown." },
          { icon: LineChart, t: "Impact reporting", d: "Meals saved and people served, ready for CSR reports." },
          { icon: AlertTriangle, t: "Safety first", d: "Clear food-condition fields and consume-by enforcement." },
        ].map((c) => (
          <div key={c.t} className="card-surface p-6">
            <c.icon className="size-6 text-primary" />
            <h2 className="mt-4 text-lg">{c.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl">Providers already on Nour Ivy</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="card-surface p-5">
                <p className="font-display text-lg">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {p.type} · {p.location}
                </p>
                <p className="mt-2 text-xs text-primary">
                  Verified · {Math.round(p.reliability * 100)}% reliability
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
            Only safe and legally distributable food should be donated.
          </div>
          <Link to="/auth" search={{ role: "provider" }} className="mt-8 inline-block">
            <Button size="lg">Start donating surplus food</Button>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
