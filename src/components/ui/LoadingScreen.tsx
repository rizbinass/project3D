import { Spinner } from "./Spinner";

export interface LoadingScreenProps {
  label?: string;
}

export function LoadingScreen({ label = "Loading experience" }: LoadingScreenProps) {
  return (
    <div className="bg-background text-text-primary grid min-h-dvh place-items-center">
      <div className="grid justify-items-center gap-4">
        <Spinner size="lg" label={label} />
        <p className="text-text-secondary text-sm">{label}</p>
      </div>
    </div>
  );
}
