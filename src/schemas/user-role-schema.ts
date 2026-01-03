import { z } from "zod";

export const userRoleSchema = z.object({
  roleIds: z.array(z.string()).min(1, "Please select at least one role"),
});

export type UserRoleFormValues = z.infer<typeof userRoleSchema>;
