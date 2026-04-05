export default function EmptyState({ icon, message }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 rounded-2xl"
      style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
    >
      {icon && (
        <div
          className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center"
          style={{ background: "rgba(124,58,237,0.1)" }}
        >
          {icon}
        </div>
      )}
      <p className="text-[#6b6b8a] text-sm">{message}</p>
    </div>
  );
}
