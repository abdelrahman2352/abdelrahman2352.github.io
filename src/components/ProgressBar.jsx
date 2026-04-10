export default function ProgressBar({ value, label }) {
  return (
    <div className="my-4">
      {label && <p className="text-sm text-gray-600 mb-1">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1 text-left">{value}%</p>
    </div>
  );
}
