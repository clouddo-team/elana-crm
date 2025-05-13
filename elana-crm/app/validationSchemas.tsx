import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1),
  counterpart_name: z.string().min(1),
  counterpart_id: z.string().min(1),
  risk_profile: z.string().min(1).default("no"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  type: z.enum(["individual", "business"]).default("individual"),
  phone: z.string().min(1),
  country: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
  ic_city: z.string().min(1),
  registration_date: z.string().optional(),
  language: z.string().min(1),
  representative: z.string().min(1),
  pro_retail: z.string().min(1).default("retail"),
  comment: z.string().optional(),
});
