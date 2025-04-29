"use client";

import * as Select from "@radix-ui/react-select";
import React, { useState } from "react";
import { clientSchema } from "@/app/validationSchemas";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from "zod";

export type IssueForm = z.infer<typeof clientSchema>;

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: keyof IssueForm; // restrict to exact field names
  label: string;
  options: Option[];
  placeholder?: string;
  register: UseFormRegister<IssueForm>;
  errorMessage?: string;
  setValue: UseFormSetValue<IssueForm>;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  placeholder,
  register,
  errorMessage,
  setValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setValue(id, value);
  };
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select.Root onValueChange={handleValueChange} value={selectedValue}>
        <Select.Trigger
          id={id}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
        >
          <Select.Value placeholder={placeholder || "Select..."} />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-md z-50">
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <input {...register(id)} type="hidden" value={selectedValue} />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
