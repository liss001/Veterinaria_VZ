export default function CardResumen({ titulo, cantidad, color, icono }) {
  return (
    <div className={`p-4 rounded-xl shadow flex justify-between items-center ${color}`}>
      <div>
        <p className="text-sm text-gray-200">{titulo}</p>
        <h3 className="text-2xl font-bold text-white">{cantidad}</h3>
      </div>
      {icono && <div className="opacity-70">{icono}</div>}
    </div>
  );
}
