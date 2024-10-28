import { z } from "zod";
import { taskSchema } from "./taskSchemas";
import { authenticatedUserSchema } from "./authSchemas";

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string().trim().min(1, "Project name is required"),
    clientName: z.string().trim().min(1, "Client name is required"),
    description: z.string().trim().min(1, "Project description is required"),
    manager: z.string(authenticatedUserSchema.pick({ _id: true })),
    tasks: z.array(taskSchema),
});

// For validating Form input when creating new project
export const projectFormSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
});

// For validating the API response that gets all projects in dashboard
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
    })
);
