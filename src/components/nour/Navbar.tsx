import { Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNour, roleLabel } from "@/lib/nour/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/for-providers", label: "For Food Providers" },
  { to: "/for-ngos", label: "For NGOs" },
  { to: "/impact", label: "Impact" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { session, signOut } = useNour();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-ivy text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-xl text-foreground">Nour Ivy</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  {roleLabel[session.role]} dashboard
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  signOut();
                  navigate({ to: "/", replace: true });
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth" search={{ role: "provider" }}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/auth" search={{ role: "provider" }}>
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {session ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1">
                    <Button className="w-full" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                      navigate({ to: "/", replace: true });
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Link to="/auth" search={{ role: "provider" }} onClick={() => setOpen(false)} className="flex-1">
                  <Button className="w-full" size="sm">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
