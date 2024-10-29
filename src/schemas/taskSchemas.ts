import { z } from "zod";
import { authenticatedUserSchema } from "./authSchemas";

export const taskStatusSchema = z.enum([
    "pending",
    "onHold",
    "inProgress",
    "underReview",
    "completed",
]);

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string().trim().min(1, "Task name is required"),
    description: z.string().trim().min(1, "Task description is required"),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.union([
        authenticatedUserSchema, // Validates as an object for the getTakById validation
        z.string().nullable(), // Allows for string (if needed) for getProjectById validation
    ]),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const taskFormSchema = taskSchema.pick({
    name: true,
    description: true,
});
