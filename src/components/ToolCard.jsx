import { Link } from 'react-router-dom';

export default function ToolCard({ icon, title, description, href }) {
  return (
    <Link
      to={href}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center text-center gap-3"
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </Link>
  );
}
