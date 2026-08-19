import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-ivy text-primary-foreground">
              <Leaf className="size-4" />
            </span>
            <span className="font-display text-lg">Nour Ivy</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Good food should reach people, not landfills.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm">Platform</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/impact">Impact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm">Get involved</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/for-providers">Donate surplus food</Link>
            </li>
            <li>
              <Link to="/for-ngos">Find food support</Link>
            </li>
            <li>
              <Link to="/auth" search={{ role: "volunteer" }}>Volunteer with us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm">Note</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Demo prototype with fictional organisations. Only safe and legally distributable
            food should ever be donated.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nour Ivy — Turning surplus food into shared nourishment.
      </div>
    </footer>
  );
}
