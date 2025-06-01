export default function Tabla({ titulo, columnas, datos }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">{titulo}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-800 border-b-2 border-lime-500">
              {columnas.map((col, idx) => (
                <th
                  key={idx}
                  className="py-3 px-5 font-semibold text-white tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.length === 0 ? (
              <tr>
                <td
                  colSpan={columnas.length}
                  className="py-6 text-center text-gray-400 italic"
                >
                  No hay datos para mostrar
                </td>
              </tr>
            ) : (
              datos.map((fila, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-200 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-lime-100 transition-colors duration-200`}
                >
                  {fila.map((celda, j) => (
                    <td
                      key={j}
                      className="py-3 px-5 text-gray-900"
                    >
                      {celda}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
