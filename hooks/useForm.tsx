import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const resetForm = () => {
    setFormValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditValues = (editValues) => {
    setFormValues({
      ...formValues,
      ...editValues,
    });
  };

  return { formValues, handleInputChange, resetForm, handleEditValues };
};