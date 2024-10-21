import { z } from "zod";
import {
    dashboardProjectSchema,
    projectFormSchema,
    projectSchema,
} from "@/schemas/projectSchemas";

export type Project = z.infer<typeof projectSchema>;

// For validating form data
export type ProjectFormData = z.infer<typeof projectFormSchema>;

// For validating the API response
export type DashboardProjects = z.infer<typeof dashboardProjectSchema>;

// For updating a project
export type ProjectUpdate = {
    formData: ProjectFormData;
    projectId: Project["_id"];
};
