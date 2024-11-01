import { z } from "zod";
import { authenticatedUserSchema } from "./authSchemas";

export const noteSchema = z.object({
    _id: z.string(),
    content: z.string().trim().min(1, "The note cannot be empty"),
    createdBy: authenticatedUserSchema,
    task: z.string(),
    createdAt: z.string(),
});

export const noteFormSchema = noteSchema.pick({
    content: true,
});
