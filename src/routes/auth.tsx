import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, HandHeart, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell } from "@/components/nour/PageShell";
import { NGOS, PROVIDERS } from "@/lib/nour/data";
import { useNour } from "@/lib/nour/store";
import type { Role } from "@/lib/nour/types";
import { cn } from "@/lib/utils";

const ROLES: Role[] = ["provider", "ngo", "volunteer", "admin"];

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: ROLES.includes(search["role"] as Role) ? (search["role"] as Role) : "provider",
  }),
  head: () => ({
    meta: [
      { title: "Sign in to Nour Ivy — Role-Based Access" },
      {
        name: "description",
        content:
          "Sign in to Nour Ivy as a food provider, NGO, volunteer or administrator to access your dashboard.",
      },
      { property: "og:title", content: "Sign in to Nour Ivy" },
      {
        property: "og:description",
        content: "Role-based access for providers, NGOs, volunteers and admins.",
      },
    ],
  }),
  component: AuthPage,
});

const roleCards = [
  {
    role: "provider" as Role,
    icon: Building2,
    title: "Food Provider",
    body: "Restaurants, hotels, cafés, bakeries, caterers, events, supermarkets, cafeterias.",
  },
  {
    role: "ngo" as Role,
    icon: HandHeart,
    title: "NGO / Community",
    body: "Receive AI-matched surplus food and log distributions.",
  },
  {
    role: "volunteer" as Role,
    icon: Truck,
    title: "Volunteer",
    body: "Help transport food from providers to NGOs.",
  },
  {
    role: "admin" as Role,
    icon: ShieldCheck,
    title: "Administrator",
    body: "Verify organisations and monitor platform activity.",
  },
];

function AuthPage() {
  const { role: initialRole } = Route.useSearch();
  const { signIn } = useNour();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(initialRole);
  const [orgId, setOrgId] = useState<string>(
    initialRole === "ngo" ? "n1" : initialRole === "provider" ? "p1" : "admin",
  );
  const [email, setEmail] = useState("demo@nourivy.app");

  const orgOptions =
    role === "provider" ? PROVIDERS : role === "ngo" ? NGOS : [{ id: "admin", name: "Nour Ivy HQ" }];

  const handleRole = (r: Role) => {
    setRole(r);
    setOrgId(r === "provider" ? "p1" : r === "ngo" ? "n1" : "admin");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const org = orgOptions.find((o) => o.id === orgId) ?? orgOptions[0]!;
    signIn({ name: org.name, role, orgId: org.id });
    toast.success(`Signed in as ${org.name}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl">Choose how you're joining Nour Ivy.</h1>
          <p className="mt-3 text-muted-foreground">
            This prototype uses mock authentication — pick a role and a demo organisation to
            explore the full flow. Real authentication can be plugged in later without changing
            the app structure.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {roleCards.map((c) => (
              <button
                key={c.role}
                type="button"
                onClick={() => handleRole(c.role)}
                className={cn(
                  "card-surface p-5 text-left transition-all",
                  role === c.role
                    ? "border-primary ring-2 ring-primary/25"
                    : "hover:shadow-lift",
                )}
              >
                <c.icon className="size-5 text-primary" />
                <p className="mt-3 font-medium">{c.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="card-surface h-fit p-8">
          <h2 className="text-2xl">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Demo access — no password required.</p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Organisation</Label>
              <Select value={orgId} onValueChange={setOrgId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {orgOptions.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Continue to dashboard
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              You'll land on the dashboard for your selected role.
            </p>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
