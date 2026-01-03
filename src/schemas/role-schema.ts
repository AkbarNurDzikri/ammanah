import { z } from "zod";
import { PERMISSIONS } from "@/config/permissions";

// Dynamically build the schema based on PERMISSIONS to ensure strict type safety
const permissionsShape = Object.fromEntries(
  PERMISSIONS.map((p) => [p.name, z.boolean().default(false)])
);

export const roleSchema = z.object({
  name: z.string().min(3, "Role name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  ...permissionsShape,
});

export type RoleFormValues = z.infer<typeof roleSchema>;
