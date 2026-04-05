import { cn } from "@/lib/utils";

export default function GhostButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "h-9 rounded-xl text-xs font-medium text-[#7070a0] transition-all hover:text-white",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      {...props}
    >
      {children}
    </button>
  );
}
