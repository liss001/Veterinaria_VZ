import { Link, useLocation } from "react-router-dom";

export default function BarItem({ href, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-2 py-1 rounded-md transition-colors ${
        isActive ? "bg-lime-600 text-white hover:text-black" : "text-gray-300 hover:text-lime-400"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
