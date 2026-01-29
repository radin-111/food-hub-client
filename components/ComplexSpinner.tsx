import { cn } from "@/lib/utils";

interface ComplexSpinnerProps {
  size?: number;
  className?: string;
}

export default function ComplexSpinner({
  size = 64,
  className,
}: ComplexSpinnerProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer rotating ring */}
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-primary border-l-primary/60" />

      {/* Middle gradient ring */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary via-purple-500 to-pink-500 opacity-70 blur-[1px] animate-[spin_1.6s_linear_infinite]" />

      {/* Inner pulse core */}
      <div className="absolute inset-4 rounded-full bg-background shadow-inner animate-pulse" />

      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-60" />
    </div>
  );
}
