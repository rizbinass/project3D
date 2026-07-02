import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <main className="bg-background text-text-primary grid min-h-dvh place-items-center px-6">
      <Container size="sm">
        <section className="border-border bg-surface/80 shadow-floating rounded-[var(--radius-2xl)] border p-8 text-center backdrop-blur-xl">
          <p className="text-caption text-accent mb-3 tracking-[0.18em] uppercase">404</p>
          <h1 className="text-heading-l mb-4">This workspace does not exist.</h1>
          <p className="text-body-m text-text-secondary mb-6">
            Return to the portfolio room and continue exploring the interactive experience.
          </p>
          <Link
            href="/"
            className="focus-visible:outline-accent bg-primary text-background shadow-soft hover:bg-text-secondary inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Enter portfolio room
          </Link>
        </section>
      </Container>
    </main>
  );
}
