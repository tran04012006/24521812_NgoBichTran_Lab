import React from "react";
import { useAppealForm } from "./AppealFormContext.jsx";

export default function AppealForm() {
  const {
    values,
    updateField,
    fieldError,
    validateOnSubmit,
    isValidated,
  } = useAppealForm();

  const emailError = fieldError("email");
  const statementError = fieldError("statement");

  function handleSubmit(event) {
    event.preventDefault();
    validateOnSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby="appeal-form-title">
      <h3 id="appeal-form-title">Appeal form</h3>

      <div>
        <label htmlFor="appeal-email">Contact email</label>
        <input
          id="appeal-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "appeal-email-error" : undefined}
        />
        <div id="appeal-email-error" aria-live="polite">
          {emailError}
        </div>
      </div>

      <div>
        <label htmlFor="appeal-statement">Appeal statement</label>
        <textarea
          id="appeal-statement"
          name="statement"
          rows={5}
          required
          value={values.statement}
          onChange={(event) => updateField("statement", event.target.value)}
          aria-invalid={Boolean(statementError)}
          aria-describedby={statementError ? "appeal-statement-error" : undefined}
        />
        <div id="appeal-statement-error" aria-live="polite">
          {statementError}
        </div>
      </div>

      <button type="submit">Validate appeal</button>
      <div role="status">{isValidated && "Your appeal passed validation."}</div>
    </form>
  );
}