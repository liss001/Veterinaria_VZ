import React from "react";
import useForm from "../../hooks/useForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import FormCard from "../../components/FormCard";

const initialValues = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
};

const validate = values => {
  const errors = {};
  if (!values.nombre) errors.nombre = "Nombre requerido";
  if (!values.precio) errors.precio = "Precio requerido";
  if (!values.stock) errors.stock = "Stock requerido";
  return errors;
};

function InventarioForm({ onSubmit }) {
  const { values, errors, handleChange, validateForm, resetForm } = useForm(initialValues, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <FormCard title="Registrar Producto">
      <form onSubmit={handleSubmit}>
        <InputField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} />
        <InputField label="Categoría" name="categoria" value={values.categoria} onChange={handleChange} />
        <InputField label="Precio" name="precio" type="number" value={values.precio} onChange={handleChange} />
        <InputField label="Stock" name="stock" type="number" value={values.stock} onChange={handleChange} />

        {Object.values(errors).map((err, i) => <p key={i} style={{ color: 'red' }}>{err}</p>)}

        <Button label="Guardar" />
      </form>
    </FormCard>
  );
}

export default InventarioForm;
