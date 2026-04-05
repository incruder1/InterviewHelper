import { cn } from "@/lib/utils";

const PRESETS = {
  violet: {
    bg: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    bgHover: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    shadow: "0 0 20px -6px rgba(124,58,237,0.7)",
  },
  blue: {
    bg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    bgHover: "linear-gradient(135deg, #3b82f6, #2563eb)",
    shadow: "0 0 20px -6px rgba(37,99,235,0.7)",
  },
};

export default function GlowButton({
  children,
  variant = "violet",
  className,
  disabled,
  ...props
}) {
  const p = PRESETS[variant] ?? PRESETS.violet;
  return (
    <button
      disabled={disabled}
      className={cn(
        "h-9 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50",
        className
      )}
      style={{
        background: disabled ? p.bg : p.bg,
        boxShadow: disabled ? "none" : p.shadow,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = p.bgHover;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = p.bg;
      }}
      {...props}
    >
      {children}
    </button>
  );
}
