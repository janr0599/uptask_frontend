import { z } from "zod";
import { taskSchema } from "./taskSchemas";

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string().trim().min(1, "Project name is required"),
    clientName: z.string().trim().min(1, "Client name is required"),
    description: z.string().trim().min(1, "Project description is required"),
    manager: z.string(),
    tasks: z.array(taskSchema),
});

// For validating Form input and response when creating or editing a project
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
