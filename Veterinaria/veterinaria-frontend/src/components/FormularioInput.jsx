export default function FormularioInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  children, // para <select> u otros casos personalizados
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children ? (
        children
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );
}
