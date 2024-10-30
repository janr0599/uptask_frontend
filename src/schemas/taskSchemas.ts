import { z } from "zod";
import { authenticatedUserSchema } from "./authSchemas";

export const taskStatusSchema = z.enum([
    "pending",
    "onHold",
    "inProgress",
    "underReview",
    "completed",
]);

const completedBySchema = z.object({
    user: z.union([z.string(), authenticatedUserSchema]), // Union type for user to allow as string when coming from getProjectById and object when coming from GetTaskById
    status: z.string(),
    _id: z.string(),
});

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string().trim().min(1, "Task name is required"),
    description: z.string().trim().min(1, "Task description is required"),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(completedBySchema),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const taskFormSchema = taskSchema.pick({
    name: true,
    description: true,
});
