import { Spinner } from "./Spinner";

export function SplashScreen({ label = "Initializing experience" }: { label?: string }) {
  return (
    <div className="bg-background fixed inset-0 z-[var(--z-critical)] grid place-items-center">
      <div className="grid justify-items-center gap-5">
        <div className="border-border bg-glass shadow-glass rounded-full border p-5 backdrop-blur-[var(--glass-blur)]">
          <Spinner size="lg" label={label} />
        </div>
        <p className="text-text-secondary text-sm">{label}</p>
      </div>
    </div>
  );
}
