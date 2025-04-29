"use client";
import React, { useState } from "react";
import { client, client_status } from "@prisma/client";
import { clientSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField, Select, Flex } from "@radix-ui/themes";
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";

type ClientFormData = z.infer<typeof clientSchema>;

const statusMap: Record<
  client_status,
  "ACTIVE" | "INACTIVE" | "PENDING_PAYMENT" | undefined
> = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING_PAYMENT: "PENDING_PAYMENT",
};

const ClientEditForm = ({ client }: { client?: client }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (client)
        await fetch(`/api/clients/${client.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      router.push(`/clients/${client?.id}`);
      router.refresh();
    } catch {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      width={{ initial: "100%", sm: "100%", md: "500px" }}
    >
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={client?.first_name}
          placeholder="First Name"
          {...register("first_name")}
        ></TextField.Root>
        <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={client?.last_name}
          placeholder="Last Name"
          {...register("last_name")}
        ></TextField.Root>
        <TextField.Root
          defaultValue={client?.email}
          placeholder="E-mail"
          {...register("email")}
        ></TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Controller
          name="status"
          control={control}
          defaultValue={statusMap[client?.status as client_status]}
          render={({ field }) => (
            <Select.Root
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Trigger>{field.value}</Select.Trigger>
              <Select.Content>
                <Select.Item value="ACTIVE">Active</Select.Item>
                <Select.Item value="INACTIVE">Inactive</Select.Item>
                <Select.Item value="PENDING_PAYMENT">
                  Pending Payment
                </Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        />

        <ErrorMessage>{errors.status?.message}</ErrorMessage>
        <br />
        <Button disabled={isSubmitting}>
          Update Client {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Flex>
  );
};

export default ClientEditForm;
