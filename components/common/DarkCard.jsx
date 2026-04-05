"use client";
import { cn } from "@/lib/utils";

export default function DarkCard({ children, className, hoverBorder = "rgba(124,58,237,0.3)", ...props }) {
  return (
    <div
      className={cn("rounded-2xl p-5 transition-all duration-200", className)}
      style={{
        background: "#13131f",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorder;
        e.currentTarget.style.background = "#16162a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "#13131f";
      }}
      {...props}
    >
      {children}
    </div>
  );
}
