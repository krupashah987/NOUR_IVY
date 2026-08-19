import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Cake,
  HandHeart,
  Hotel,
  Recycle,
  Route as RouteIcon,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/nour/PageShell";
import { StatCard } from "@/components/nour/StatCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nour Ivy — Turning Surplus Food Into Shared Nourishment" },
      {
        name: "description",
        content:
          "Nour Ivy uses AI matching to connect surplus food from restaurants, hotels, bakeries, caterers and supermarkets with verified NGOs and communities that need it.",
      },
      { property: "og:title", content: "Nour Ivy — Turning Surplus Food Into Shared Nourishment" },
      {
        property: "og:description",
        content:
          "AI-powered surplus food redistribution: list surplus food, get matched to a verified NGO, track pickup and see real community impact.",
      },
    ],
  }),
  component: Landing,
});

const providers = [
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Hotel, label: "Hotels" },
  { icon: Cake, label: "Bakeries & Cafés" },
  { icon: HandHeart, label: "Caterers & Events" },
  { icon: ShoppingCart, label: "Supermarkets" },
  { icon: Building2, label: "Corporate cafeterias" },
];

const steps = [
  {
    title: "List surplus food",
    body: "A provider adds quantity, food type, prepared time, consume-by time and pickup window in under a minute.",
  },
  {
    title: "AI finds the best match",
    body: "Nour Ivy scores nearby verified NGOs on distance, capacity, food fit, urgency and reliability.",
  },
  {
    title: "NGO accepts & collects",
    body: "The recommended NGO accepts, schedules pickup and confirms collection in the app.",
  },
  {
    title: "Impact is tracked",
    body: "Meals served, food saved and waste avoided are recorded for every donation.",
  },
];

function Landing() {
  return (
    <PageShell>
      <section className="bg-gradient-warm">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" /> AI-powered surplus food redistribution
            </span>
            <h1 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Turning Surplus Food Into Shared Nourishment.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Nour Ivy connects surplus food from businesses and organizations with verified NGOs
              and communities that need it — helping good food reach people instead of becoming
              waste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" search={{ role: "provider" }}>
                <Button size="lg">
                  Donate Surplus Food <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
              <Link to="/auth" search={{ role: "ngo" }}>
                <Button size="lg" variant="outline">
                  Find Food Support
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> Verified organisations
              </span>
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-primary" /> Pickup coordination
              </span>
              <span className="flex items-center gap-2">
                <Recycle className="size-4 text-primary" /> Measured impact
              </span>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Volunteers packing surplus bread, fruit and vegetables into crates for redistribution"
              width={1600}
              height={1104}
              className="rounded-3xl shadow-lift"
            />
            <div className="card-surface absolute -bottom-6 left-4 hidden w-64 p-4 sm:block">
              <p className="text-xs text-muted-foreground">AI recommendation</p>
              <p className="mt-1 font-display text-lg">Hope Foundation</p>
              <p className="text-sm text-primary">92% Match · 2.4 km away</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Capacity for 50 meals, pickup within 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl">How It Works</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          From leftover to lunch in four steps — no phone tag, no spreadsheets.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-display text-primary">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Why Nour Ivy
            </span>
            <h2 className="mt-2 text-3xl">Not a listing board. An intelligent matcher.</h2>
            <p className="mt-4 text-muted-foreground">
              Most surplus food is lost to coordination delays, not to a lack of goodwill. Nour Ivy
              removes the search, the calls and the guesswork by recommending the single best
              recipient for each donation — and explaining exactly why.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Cuts the time between surplus and served meal",
                "Prioritises urgency so food is collected while it's still safe",
                "Respects NGO capacity and dietary/food-type requirements",
                "Transparent status timeline from listing to distribution",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg">AI-Powered Matching</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every listing is scored against verified NGOs on:
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Distance", "30%"],
                ["NGO capacity", "25%"],
                ["Food type fit", "20%"],
                ["Urgency vs pickup speed", "15%"],
                ["Past reliability", "10%"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm"
                >
                  <span>{k}</span>
                  <span className="font-medium text-primary">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
              <p className="font-medium text-primary">92% Match — Hope Foundation</p>
              <p className="mt-1 text-muted-foreground">
                "Recommended because this NGO is 2.4 km away, currently has capacity for 50 meals,
                and can arrange pickup within 30 minutes."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl">Who Can Donate</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Nour Ivy is not limited to restaurants. Any verified organisation with safe surplus food
          can donate.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <div key={p.label} className="card-surface flex items-center gap-3 p-5">
              <span className="flex size-10 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
                <p.icon className="size-5" />
              </span>
              <span className="font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-warm border-y border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl">Impact so far</h2>
          <p className="mt-2 text-muted-foreground">Demo figures from the Nour Ivy network.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={UtensilsCrossed} label="Meals redirected" value="26,700" />
            <StatCard icon={Users} label="People served" value="18,240" />
            <StatCard icon={Building2} label="Food providers" value="132" />
            <StatCard icon={HandHeart} label="Partner NGOs" value="48" />
          </div>
          <Link to="/impact" className="mt-6 inline-block">
            <Button variant="outline">See the impact dashboard</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-20 lg:grid-cols-2">
        <div className="card-surface p-8">
          <HandHeart className="size-8 text-primary" />
          <h2 className="mt-4 text-2xl">For NGOs</h2>
          <p className="mt-2 text-muted-foreground">
            See surplus food available nearby, receive AI matches tuned to your capacity and food
            requirements, accept in one tap and log distributions.
          </p>
          <Link to="/for-ngos" className="mt-5 inline-block">
            <Button variant="outline">Learn more</Button>
          </Link>
        </div>
        <div className="card-surface p-8">
          <RouteIcon className="size-8 text-primary" />
          <h2 className="mt-4 text-2xl">For Volunteers</h2>
          <p className="mt-2 text-muted-foreground">
            Volunteers and delivery partners bridge the last mile — picking up food from providers
            and delivering it to the matched NGO.
          </p>
          <Link to="/auth" search={{ role: "volunteer" }} className="mt-5 inline-block">
            <Button variant="outline">Join as a volunteer</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="bg-gradient-ivy rounded-3xl px-6 py-14 text-center text-primary-foreground shadow-lift">
          <h2 className="text-3xl text-primary-foreground sm:text-4xl">
            Good food should reach people, not landfills.
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Join Nour Ivy and turn today's surplus into tomorrow's shared meal.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/auth" search={{ role: "provider" }}>
              <Button size="lg" variant="secondary">
                Donate Surplus Food
              </Button>
            </Link>
            <Link to="/auth" search={{ role: "ngo" }}>
              <Button size="lg" variant="secondary">
                Find Food Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
