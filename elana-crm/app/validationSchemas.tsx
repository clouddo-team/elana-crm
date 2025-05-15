import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  counterpart_name: z.string().optional(),
  counterpart_id: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().optional(),
  email: z.string().email("Invalid email address"),
  ic_city: z.string().optional(),
  language: z.string().optional(),
  representative: z.string().optional(),
  risk_profile: z.string().optional(),
  pro_retail: z.string().optional(),
  registration_date: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  type: z.enum(["individual", "business"]),
  comment: z.string().optional(),
});
