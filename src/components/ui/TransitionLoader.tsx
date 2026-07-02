import { Progress } from "./Progress";

export function TransitionLoader({
  value,
  label = "Transitioning",
}: {
  value: number;
  label?: string;
}) {
  return (
    <div className="w-full max-w-xs">
      <Progress value={value} label={label} />
    </div>
  );
}
