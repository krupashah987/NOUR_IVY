import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/nour/PageShell";
import { STATUS_FLOW } from "@/lib/nour/types";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Nour Ivy Works — Surplus Food to Verified NGOs" },
      {
        name: "description",
        content:
          "See how Nour Ivy moves surplus food from listing to AI match, NGO acceptance, pickup, distribution and measured impact.",
      },
      { property: "og:title", content: "How Nour Ivy Works" },
      {
        property: "og:description",
        content: "Listing, AI matching, pickup and distribution — the full Nour Ivy flow.",
      },
    ],
  }),
  component: HowItWorks,
});

const detail = [
  {
    role: "Food Provider",
    steps: [
      "Register and get verified as a provider",
      "Create a surplus food listing with quantity, type and consume-by time",
      "Review the AI-recommended NGO and confirm",
      "Hand over at the pickup window and track completion",
    ],
  },
  {
    role: "Nour Ivy AI",
    steps: [
      "Analyse the listing: quantity, category, urgency, location",
      "Filter verified NGOs with matching requirements and capacity",
      "Score on distance, capacity, food fit, pickup speed, reliability",
      "Recommend the best match with a plain-language explanation",
    ],
  },
  {
    role: "NGO",
    steps: [
      "Receive the match with distance, servings and pickup window",
      "Accept the donation and schedule pickup",
      "Collect the food and confirm receipt",
      "Distribute and record people served",
    ],
  },
];

function HowItWorks() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="How it works"
        title="From surplus to served, in one coordinated flow."
        description="Nour Ivy replaces phone calls and spreadsheets with a single tracked process shared by providers, NGOs and volunteers."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 lg:grid-cols-3">
        {detail.map((d) => (
          <div key={d.role} className="card-surface p-6">
            <h2 className="text-xl">{d.role}</h2>
            <ol className="mt-4 space-y-3">
              {d.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl">Every donation has a visible status</h2>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {STATUS_FLOW.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="card-surface px-4 py-2 text-sm font-medium">{s}</span>
                {i < STATUS_FLOW.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
          <Link to="/auth" search={{ role: "provider" }} className="mt-8 inline-block">
            <Button size="lg">Try the live demo flow</Button>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
