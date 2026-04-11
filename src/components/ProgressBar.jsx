export default function ProgressBar({ value, label }) {
  return (
    <div className="my-4">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium" style={{ color: '#a1a1aa' }}>{label}</p>
          <span className="text-sm font-semibold" style={{ color: '#a78bfa' }}>{value}%</span>
        </div>
      )}
      <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: '#27272a' }}>
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${value}%`,
            background: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)',
            boxShadow: '0 0 8px rgba(124,58,237,0.5)',
          }}
        />
      </div>
    </div>
  );
}
