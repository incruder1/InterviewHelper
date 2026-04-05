export default function LoadingGrid({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-2xl animate-pulse"
          style={{ background: "#13131f" }}
        />
      ))}
    </div>
  );
}
