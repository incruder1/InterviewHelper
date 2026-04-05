export default function SectionHeader({ tag, title, subtitle, children }) {
  return (
    <div className="text-center mb-20">
      {tag && (
        <p className="text-violet-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          {tag}
        </p>
      )}
      {title && (
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
          {children ?? title}
        </h2>
      )}
      {subtitle && (
        <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
