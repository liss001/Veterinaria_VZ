import React from "react";
import useForm from "../../hooks/useForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import FormCard from "../../components/FormCard";

const initialValues = {
  nombre: "",
  edad: "",
  raza: "",
  especie: "",
};

const validate = values => {
  const errors = {};
  if (!values.nombre) errors.nombre = "Nombre requerido";
  if (!values.edad) errors.edad = "Edad requerida";
  if (!values.raza) errors.raza = "Raza requerida";
  return errors;
};

function MascotasForm({ onSubmit }) {
  const { values, errors, handleChange, validateForm, resetForm } = useForm(initialValues, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <FormCard title="Registrar Mascota">
      <form onSubmit={handleSubmit}>
        <InputField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} />
        <InputField label="Edad" name="edad" value={values.edad} onChange={handleChange} type="number" />
        <InputField label="Raza" name="raza" value={values.raza} onChange={handleChange} />
        <InputField label="Especie" name="especie" value={values.especie} onChange={handleChange} />

        {Object.values(errors).map((err, i) => <p key={i} style={{ color: 'red' }}>{err}</p>)}

        <Button label="Guardar" />
      </form>
    </FormCard>
  );
}

export default MascotasForm;
