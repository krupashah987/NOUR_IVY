import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, PageShell } from "@/components/nour/PageShell";
import { useNour } from "@/lib/nour/store";
import { FOOD_CATEGORIES, type FoodCategory } from "@/lib/nour/types";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Create a Surplus Food Donation | Nour Ivy" },
      {
        name: "description",
        content:
          "List safe surplus food on Nour Ivy: quantity, servings, consume-by time, pickup location and window — then get an AI-matched NGO.",
      },
      { property: "og:title", content: "Create a Surplus Food Donation" },
      {
        property: "og:description",
        content: "List surplus food and get matched to a verified NGO in seconds.",
      },
    ],
  }),
  component: DonatePage,
});

const schema = z.object({
  foodName: z.string().trim().min(2, "Food name is required").max(100),
  quantity: z.string().trim().min(1, "Quantity is required").max(60),
  servings: z.coerce.number().int().min(1, "At least 1 serving").max(100000),
  preparedAt: z.string().min(1, "Preparation time is required"),
  consumeBy: z.string().min(1, "Consume-by time is required"),
  pickupLocation: z.string().trim().min(3, "Pickup location is required").max(160),
  pickupWindow: z.string().trim().min(3, "Pickup window is required").max(80),
  condition: z.string().trim().min(2, "Food condition is required").max(80),
  notes: z.string().trim().max(500).optional(),
  imageUrl: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
});

const localNow = (offsetHours = 0) =>
  new Date(Date.now() + offsetHours * 3600_000 - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

function DonatePage() {
  const { session, addDonation } = useNour();
  const navigate = useNavigate();
  const [category, setCategory] = useState<FoodCategory>("Cooked meals");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(fd);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    const v = parsed.data;
    const donation = addDonation({
      providerId: session?.role === "provider" ? session.orgId : "p1",
      foodName: v.foodName,
      category,
      quantity: v.quantity,
      servings: v.servings,
      preparedAt: new Date(v.preparedAt).toISOString(),
      consumeBy: new Date(v.consumeBy).toISOString(),
      pickupLocation: v.pickupLocation,
      pickupWindow: v.pickupWindow,
      condition: v.condition,
      ...(v.notes ? { notes: v.notes } : {}),
      ...(v.imageUrl ? { imageUrl: v.imageUrl } : {}),
    });
    toast.success("Listing created — running AI match…");
    navigate({ to: "/donations/$id", params: { id: donation.id } });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="New donation"
        title="List your surplus food"
        description="Takes about a minute. Nour Ivy will immediately score nearby verified NGOs and recommend the best recipient."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 flex gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
          <span>Only safe and legally distributable food should be donated.</span>
        </div>

        <form onSubmit={onSubmit} className="card-surface space-y-5 p-6 sm:p-8">
          <Field label="Food name" error={errors["foodName"]}>
            <Input name="foodName" placeholder="e.g. Assorted breads & croissants" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Food category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as FoodCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FOOD_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Field label="Quantity" error={errors["quantity"]}>
              <Input name="quantity" placeholder="e.g. 50 items / 12 trays" />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Approximate servings" error={errors["servings"]}>
              <Input name="servings" type="number" min={1} defaultValue={50} />
            </Field>
            <Field label="Food condition" error={errors["condition"]}>
              <Input name="condition" placeholder="e.g. Chilled, sealed" defaultValue="Fresh, packed" />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Prepared on" error={errors["preparedAt"]}>
              <Input name="preparedAt" type="datetime-local" defaultValue={localNow(-3)} />
            </Field>
            <Field label="Best consumed by" error={errors["consumeBy"]}>
              <Input name="consumeBy" type="datetime-local" defaultValue={localNow(8)} />
            </Field>
          </div>

          <Field label="Pickup location" error={errors["pickupLocation"]}>
            <Input name="pickupLocation" placeholder="Street, area, city" />
          </Field>

          <Field label="Pickup time window" error={errors["pickupWindow"]}>
            <Input name="pickupWindow" placeholder="e.g. Today 18:00 – 20:00" />
          </Field>

          <Field label="Special notes (optional)" error={errors["notes"]}>
            <Textarea name="notes" rows={3} placeholder="Allergens, packaging, access instructions…" />
          </Field>

          <Field label="Image URL (optional)" error={errors["imageUrl"]}>
            <Input name="imageUrl" placeholder="https://…" />
          </Field>

          <Button type="submit" size="lg" className="w-full">
            Submit listing & run AI match
          </Button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
