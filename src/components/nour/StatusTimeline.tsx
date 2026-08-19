import { Check } from "lucide-react";
import { STATUS_FLOW, type DonationStatus } from "@/lib/nour/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: DonationStatus }) {
  const tone =
    status === "Completed"
      ? "bg-success/15 text-success"
      : status === "Listed"
        ? "bg-warning/20 text-warning-foreground"
        : "bg-primary/10 text-primary";
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", tone)}>{status}</span>
  );
}

export function StatusTimeline({ status }: { status: DonationStatus }) {
  const current = STATUS_FLOW.indexOf(status);
  return (
    <ol className="space-y-0">
      {STATUS_FLOW.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              {i < STATUS_FLOW.length - 1 && (
                <span
                  className={cn("h-8 w-px", i < current ? "bg-primary" : "bg-border")}
                  aria-hidden
                />
              )}
            </div>
            <div className="pb-2">
              <p
                className={cn(
                  "text-sm",
                  done ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {s}
              </p>
              {i === current && (
                <p className="text-xs text-muted-foreground">Current stage</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
