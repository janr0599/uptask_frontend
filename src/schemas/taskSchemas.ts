import { z } from "zod";

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
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const taskFormSchema = taskSchema.pick({
    name: true,
    description: true,
});
