import { z } from "zod";

export const systemSettingsSchema = z
  .object({
    whatsapp_number: z.string().optional(),
    lodging_name: z.string().optional(),
    airport_distance: z.string().optional(),
    checkin_time: z.string().optional(),
    checkout_time: z.string().optional(),
    min_dp_percent: z.string().optional(),
  })
  .catchall(z.string());

export type SystemSettings = z.infer<typeof systemSettingsSchema>;

export const updateSettingsInputSchema = z
  .object({
    whatsapp_number: z.string().optional(),
    lodging_name: z.string().optional(),
    airport_distance: z.string().optional(),
    checkin_time: z.string().optional(),
    checkout_time: z.string().optional(),
    min_dp_percent: z.string().optional(),
  })
  .catchall(z.string());

export type UpdateSettingsInput = z.infer<typeof updateSettingsInputSchema>;
