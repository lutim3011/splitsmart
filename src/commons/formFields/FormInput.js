import React from "react";

import { getDynamicFilter } from "commons/Utils.js";
import FormError from "commons/formFields/FormError";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const FormInput = ({
  type,
  id,
  children,
  autoFocus,
  register,
  errors,
  name,
  rules,
  label,
  rows,
  divClassName,
  decimal,
  inputDivClassName,
  errorMsg,
  placeholder,
  disabled,
  maxLength,
  isRequired,
}) => {
  const { ref, ...rest } = register(name, rules);

  if (type === "textarea")
    rules.maxLength = {
      value: 500,
      message:
        (getDynamicFilter(label) ?? "Input") + " cannot exceed 500 characters",
    };
  if (type === "text")
    rules.maxLength = {
      value: 50,
      message:
        (getDynamicFilter(label) ?? "Input") + " cannot exceed 50 characters",
    };

  function onKeyDown(ev) {
    if (type === "number" && (ev.keyCode === 38 || ev.keyCode === 40)) {
      ev.preventDefault();
    }
  }

  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <div className={inputDivClassName}>
        <Input
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          name={name}
          rows={rows}
          type={decimal ? "text" : type}
          id={id}
          className={
            errorMsg || errors[name]?.message
              ? "form-control required"
              : "form-control"
          }
          {...rest}
          innerRef={ref}
          onWheel={ev => ev.target.blur()}
          placeholder={placeholder}
          maxLength={maxLength || rules?.maxLength?.value}
        />
      </div>
      <FormError msg={errorMsg || errors[name]?.message} />
      {children}
    </FormControl>
  );
};

export default FormInput;
