import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/nour/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nour Ivy — Good Food Should Reach People" },
      {
        name: "description",
        content:
          "Nour Ivy is an AI-powered surplus food redistribution platform built to cut waste, save coordination time and get safe food to communities faster.",
      },
      { property: "og:title", content: "About Nour Ivy" },
      {
        property: "og:description",
        content: "Why we built an AI matcher for surplus food redistribution.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Good food should reach people, not landfills."
        description="Nour Ivy exists to make that happen — every day, at speed, with verified organisations."
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-6 text-muted-foreground">
          <p>
            Every day, safe and edible food becomes surplus across restaurants, hotels, bakeries,
            caterers, supermarkets, manufacturers and corporate cafeterias. At the same time, NGOs
            and community kitchens spend hours hunting for reliable food sources.
          </p>
          <p>
            The gap is rarely goodwill — it's coordination. Surplus food has a short safe window,
            and manual phone-and-spreadsheet matching burns that window away.
          </p>
          <p>
            Nour Ivy is one digital platform where surplus food can be listed, intelligently
            matched, collected and distributed. Our matching engine scores every verified NGO on
            distance, capacity, food-type fit, urgency and reliability, then recommends the single
            best recipient — and explains the reasoning in plain language.
          </p>
          <h2 className="pt-4 text-2xl text-foreground">What's next</h2>
          <p>
            The architecture is ready for AI food-safety assistance, demand prediction, route
            optimisation, volunteer delivery matching, real-time and WhatsApp notifications,
            multilingual support, geographic heatmaps and carbon-impact estimation.
          </p>
          <p className="text-sm">
            This build is a hackathon MVP. Organisations shown are fictional demo data.
          </p>
        </div>
        <Link to="/auth" search={{ role: "provider" }} className="mt-8 inline-block">
          <Button size="lg">Explore the demo</Button>
        </Link>
      </section>
    </PageShell>
  );
}
