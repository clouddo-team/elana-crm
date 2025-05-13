import * as Label from "@radix-ui/react-label";
import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  register?: UseFormRegister<TFieldValues>;
  errorMessage?: string;
}

const FormField = <TFieldValues extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errorMessage,
}: FormFieldProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label.Root
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </Label.Root>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...(register && register(id))}
      />
      {errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormField;
