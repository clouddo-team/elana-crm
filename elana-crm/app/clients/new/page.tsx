"use client";

import FormField from "@/app/components/FormField";
import SelectField from "@/app/components/SelectField";
import Spinner from "@/app/components/Spinner";
import { clientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IssueForm = z.infer<typeof clientSchema>;

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Pending Payment", value: "PENDING_PAYMENT" },
];

const NewClientPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IssueForm>({
    resolver: zodResolver(clientSchema),
  });
  const [error, setError] = useState(""); // This is your error state
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/clients", data);
            router.push("/clients");
          } catch (error: unknown) {
            setSubmitting(false);

            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError("Something went wrong");
            }
          }
        })}
      >
        <h1 className="text-2xl font-bold">Add New Client</h1>

        <div className="space-y-4">
          <FormField
            id="first_name"
            label="First Name"
            placeholder="John"
            register={register}
            errorMessage={errors.first_name?.message}
          />
          <FormField
            id="last_name"
            label="Last Name"
            placeholder="Doe"
            register={register}
            errorMessage={errors.last_name?.message}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            register={register}
            errorMessage={errors.email?.message}
          />

          <SelectField
            id="status"
            label="Status"
            options={statusOptions}
            placeholder="Select status..."
            register={register}
            errorMessage={errors.status?.message}
            setValue={setValue}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Client
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewClientPage;
