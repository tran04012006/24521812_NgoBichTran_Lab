import React, { createContext, useContext, useState } from "react";

const AppealFormContext = createContext(null);

function validateAppeal(values) {
  const errors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "Enter your contact email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.statement.trim()) {
    errors.statement = "Enter your appeal statement.";
  }

  return errors;
}

export function AppealFormProvider({ children }) {
  const [values, setValues] = useState({ email: "", statement: "" });
  const [editedFields, setEditedFields] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const errors = validateAppeal(values);

  function updateField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setEditedFields((current) => ({ ...current, [name]: true }));
    setIsValidated(false);
  }

  function fieldError(name) {
    return submitAttempted || editedFields[name] ? errors[name] : undefined;
  }

  function validateOnSubmit() {
    setSubmitAttempted(true);
    setIsValidated(Object.keys(errors).length === 0);
  }

  return (
    <AppealFormContext.Provider
      value={{ values, updateField, fieldError, validateOnSubmit, isValidated }}
    >
      {children}
    </AppealFormContext.Provider>
  );
}

export function useAppealForm() {
  const context = useContext(AppealFormContext);

  if (!context) {
    throw new Error("useAppealForm must be used within AppealFormProvider.");
  }

  return context;
}