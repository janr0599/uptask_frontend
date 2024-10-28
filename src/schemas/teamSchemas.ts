import { z } from "zod";
import { authenticatedUserSchema } from "./authSchemas";

export const teamMemberSchema = authenticatedUserSchema.pick({
    _id: true,
    email: true,
    name: true,
});
export const teamMemberFormSchema = teamMemberSchema.pick({
    email: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
