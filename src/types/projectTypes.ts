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
