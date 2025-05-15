"use client";

import React, { useState } from "react";
import { client } from "@prisma/client";
import { clientSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  TextField,
  Select,
  Flex,
  TextArea,
} from "@radix-ui/themes";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

type ClientFormData = z.infer<typeof clientSchema>;

const ClientEditForm = ({ client }: { client?: client }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      phone: client?.phone || "",
      status: client?.status || "ACTIVE",
      type: client?.type || "individual",
      country: client?.country || "Bulgaria",
      ic_city: client?.ic_city || "Varna",
      address: client?.address || "",
      counterpart_name: client?.counterpart_name || "",
      counterpart_id: client?.counterpart_id || "",
      language: client?.language || "Bulgarian",
      representative: client?.representative || "Dimitar",
      pro_retail: client?.pro_retail || "retail",
      risk_profile: client?.risk_profile || "no",
      comment: client?.comment || "",
      registration_date: client?.registration_date?.toISOString(),
    },
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (client) {
        await fetch(`/api/clients/${client.eurosys_id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        router.push(`/clients/${client.eurosys_id}`);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred.");
      setSubmitting(false);
    }
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      p="8"
      mb="6"
    >
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-4 w-50%" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Name"
              {...register("name")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        {/* Email */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="E-mail"
              {...register("email")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        {/* Phone */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Phone"
              {...register("phone")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>

        {/* Country */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Country"
              {...register("country")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.country?.message}</ErrorMessage>

        {/* City */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="City"
              {...register("ic_city")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.ic_city?.message}</ErrorMessage>

        {/* Address */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Address"
              {...register("address")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.address?.message}</ErrorMessage>

        {/* Counterpart Name */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Counterpart Name"
              {...register("counterpart_name")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.counterpart_name?.message}</ErrorMessage>

        {/* Counterpart ID */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Counterpart ID"
              {...register("counterpart_id")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.counterpart_id?.message}</ErrorMessage>

        {/* Language */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Language"
              {...register("language")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.language?.message}</ErrorMessage>

        {/* Representative */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Representative"
              {...register("representative")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.representative?.message}</ErrorMessage>

        {/* Pro Retail */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Pro Retail"
              {...register("pro_retail")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.pro_retail?.message}</ErrorMessage>

        {/* Risk Profile */}
        <TextField.Root>
          <TextField.Slot>
            <input
              className="radix-input"
              placeholder="Risk Profile"
              {...register("risk_profile")}
            />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.risk_profile?.message}</ErrorMessage>

        {/* Comment */}
        <TextArea
          className="radix-input"
          placeholder="Comment"
          {...register("comment")}
          rows={3}
        />
        <ErrorMessage>{errors.comment?.message}</ErrorMessage>

        <Flex direction="row" justify="between">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="radix-select-trigger" />
                  <Select.Content>
                    <Select.Item value="ACTIVE">Active</Select.Item>
                    <Select.Item value="INACTIVE">Inactive</Select.Item>
                  </Select.Content>
                </Select.Root>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>
              </div>
            )}
          />

          {/* Type */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="radix-select-trigger" />
                  <Select.Content>
                    <Select.Item value="individual">Individual</Select.Item>
                    <Select.Item value="business">Business</Select.Item>
                  </Select.Content>
                </Select.Root>
                <ErrorMessage>{errors.type?.message}</ErrorMessage>
              </div>
            )}
          />
        </Flex>
        <Flex justify="center" align="center" mt="8">
          <Button
            variant="soft"
            size="3"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Update Client {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ClientEditForm;
