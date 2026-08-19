import { createFileRoute } from "@tanstack/react-router";
import { Building2, HandHeart, Recycle, Truck, Users, UtensilsCrossed } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, PageShell } from "@/components/nour/PageShell";
import { StatCard } from "@/components/nour/StatCard";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Meals Saved & People Served | Nour Ivy" },
      {
        name: "description",
        content:
          "Track Nour Ivy's measurable impact: meals redirected from waste, people served, successful pickups and estimated food waste reduced.",
      },
      { property: "og:title", content: "Nour Ivy Impact" },
      {
        property: "og:description",
        content: "Meals redirected, people served and food waste avoided across the network.",
      },
    ],
  }),
  component: Impact,
});

const monthly = [
  { month: "Mar", meals: 1820 },
  { month: "Apr", meals: 2410 },
  { month: "May", meals: 2980 },
  { month: "Jun", meals: 3640 },
  { month: "Jul", meals: 4310 },
  { month: "Aug", meals: 5120 },
];

const categories = [
  { name: "Cooked meals", value: 42 },
  { name: "Bakery", value: 21 },
  { name: "Fruits & Veg", value: 19 },
  { name: "Packaged", value: 11 },
  { name: "Dairy", value: 7 },
];

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function Impact() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Impact"
        title="Every meal rescued, counted."
        description="Nour Ivy records what was saved, who received it and how much waste was avoided — so impact is provable, not estimated on a whiteboard."
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={UtensilsCrossed} label="🍱 Meals redirected from waste" value="26,700" />
          <StatCard icon={Users} label="👥 People served" value="18,240" />
          <StatCard icon={Building2} label="🏢 Active food providers" value="132" />
          <StatCard icon={HandHeart} label="🤝 Partner NGOs" value="48" />
          <StatCard icon={Truck} label="🚚 Successful pickups" value="3,914" />
          <StatCard
            icon={Recycle}
            label="♻️ Food waste reduced"
            value="11.4 t"
            hint="≈ 29 t CO₂e avoided"
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="card-surface p-6 lg:col-span-2">
            <h2 className="text-xl">Meals redistributed per month</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="meals" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-xl">By food category</h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categories} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80}>
                    {categories.map((c, i) => (
                      <Cell key={c.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {categories.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  {c.name} — {c.value}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
