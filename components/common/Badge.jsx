import { cn } from "@/lib/utils";

const VARIANTS = {
  violet: {
    bg: "rgba(124,58,237,0.12)",
    color: "#a78bfa",
    border: "rgba(124,58,237,0.2)",
  },
  blue: {
    bg: "rgba(59,130,246,0.12)",
    color: "#93c5fd",
    border: "rgba(59,130,246,0.2)",
  },
  green: {
    bg: "rgba(16,185,129,0.12)",
    color: "#6ee7b7",
    border: "rgba(16,185,129,0.2)",
  },
  red: {
    bg: "rgba(239,68,68,0.12)",
    color: "#fca5a5",
    border: "rgba(239,68,68,0.2)",
  },
};

export default function Badge({ children, variant = "violet", className, onClick }) {
  const v = VARIANTS[variant] ?? VARIANTS.violet;
  return (
    <span
      className={cn("inline-block text-xs font-semibold rounded-lg px-2.5 py-1", className)}
      onClick={onClick}
      style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}` }}
    >
      {children}
    </span>
  );
}
