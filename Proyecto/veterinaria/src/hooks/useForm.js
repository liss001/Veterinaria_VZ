import { useState } from "react";

function useForm(initialValues = {}, validate = () => ({})) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setValues,
    setErrors,
  };
}

export default useForm;
