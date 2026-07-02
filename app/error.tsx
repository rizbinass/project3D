"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <main className="bg-background text-text-primary grid min-h-dvh place-items-center px-6">
      <Container size="sm">
        <section
          aria-labelledby="runtime-error-title"
          className="border-border bg-surface/80 shadow-floating rounded-[var(--radius-2xl)] border p-8 text-center backdrop-blur-xl"
        >
          <p className="text-accent text-caption mb-3 tracking-[0.18em] uppercase">
            Workspace interrupted
          </p>
          <h1 id="runtime-error-title" className="text-heading-l mb-4">
            The experience could not finish loading.
          </h1>
          <p className="text-text-secondary text-body-m mb-6">
            Refresh the workspace or try again after the current development build finishes
            compiling.
          </p>
          <Button variant="primary" onClick={reset}>
            Retry
          </Button>
        </section>
      </Container>
    </main>
  );
}
