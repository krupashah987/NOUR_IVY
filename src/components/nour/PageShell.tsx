import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-gradient-warm border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {eyebrow && (
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 max-w-3xl text-4xl text-foreground sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
