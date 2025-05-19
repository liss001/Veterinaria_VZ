import React from "react";
import useForm from "../../hooks/useForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import FormCard from "../../components/FormCard";

const initialValues = {
  mascota: "",
  fecha: "",
  motivo: "",
  veterinario: "",
};

const validate = values => {
  const errors = {};
  if (!values.mascota) errors.mascota = "Mascota requerida";
  if (!values.fecha) errors.fecha = "Fecha requerida";
  if (!values.motivo) errors.motivo = "Motivo requerido";
  return errors;
};

function CitasForm({ onSubmit }) {
  const { values, errors, handleChange, validateForm, resetForm } = useForm(initialValues, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <FormCard title="Agendar Cita">
      <form onSubmit={handleSubmit}>
        <InputField label="Mascota" name="mascota" value={values.mascota} onChange={handleChange} />
        <InputField label="Fecha" name="fecha" type="datetime-local" value={values.fecha} onChange={handleChange} />
        <InputField label="Motivo" name="motivo" value={values.motivo} onChange={handleChange} />
        <InputField label="Veterinario" name="veterinario" value={values.veterinario} onChange={handleChange} />

        {Object.values(errors).map((err, i) => <p key={i} style={{ color: 'red' }}>{err}</p>)}

        <Button label="Guardar" />
      </form>
    </FormCard>
  );
}

export default CitasForm;
