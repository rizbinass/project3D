"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface ClientErrorBoundaryProps {
  children: ReactNode;
  label: string;
  className?: string;
  resetKey?: string | number | null;
}

interface ClientErrorBoundaryState {
  error: Error | null;
  resetKey?: string | number | null;
}

export class ClientErrorBoundary extends Component<
  ClientErrorBoundaryProps,
  ClientErrorBoundaryState
> {
  state: ClientErrorBoundaryState = {
    error: null,
    resetKey: this.props.resetKey,
  };

  static getDerivedStateFromError(error: Error): ClientErrorBoundaryState {
    return { error };
  }

  static getDerivedStateFromProps(
    props: ClientErrorBoundaryProps,
    state: ClientErrorBoundaryState,
  ): Partial<ClientErrorBoundaryState> | null {
    if (props.resetKey !== state.resetKey) {
      return { error: null, resetKey: props.resetKey };
    }

    return null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(`${this.props.label} failed`, error, errorInfo);
    }
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <section
        role="alert"
        aria-live="assertive"
        className={cn(
          "border-border bg-card/90 text-text-primary shadow-floating grid min-h-48 place-items-center rounded-[var(--radius-xl)] border p-6 text-center backdrop-blur-xl",
          this.props.className,
        )}
      >
        <div className="max-w-md">
          <p className="text-caption text-accent mb-2 tracking-[0.18em] uppercase">
            Experience paused
          </p>
          <h2 className="text-heading-s mb-3">{this.props.label} could not load.</h2>
          <p className="text-body-sm text-text-secondary mb-5">
            Retry the module after the current build finishes compiling.
          </p>
          <Button variant="glass" onClick={() => this.setState({ error: null })}>
            Retry
          </Button>
        </div>
      </section>
    );
  }
}
