import { z } from "zod";

export const clientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING_PAYMENT"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});
