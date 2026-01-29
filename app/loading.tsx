import { cn } from "@/lib/utils";

interface FoodLoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({
  size = 72,
  className,
}: FoodLoaderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-orange-500 border-r-red-500 animate-spin" />

      {/* Gradient heat ring */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-orange-400 via-red-500 to-rose-600 opacity-80 blur-[1px] animate-[spin_1.6s_linear_infinite]" />

      {/* Inner core */}
      <div className="absolute inset-4 rounded-full bg-background shadow-inner animate-pulse" />

      {/* Warm glow */}
      <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-2xl opacity-70" />
    </div>
  );
}
