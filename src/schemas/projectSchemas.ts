import { z } from "zod";

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z
        .string()
        .trim()
        .min(1, "Project name is required")
        .regex(/^[a-zA-Z\s]*$/, "Project name must only contain letters"),
    clientName: z
        .string()
        .trim()
        .min(1, "Client name is required")
        .regex(/^[a-zA-Z\s]*$/, "Client name must only contain letters"),
    description: z
        .string()
        .trim()
        .min(1, "Project description is required")
        .regex(/^[a-zA-Z\s]*$/, "description must only contain letters"),
});

export const projectFormSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
});
