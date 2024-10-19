import { z } from "zod";
import { projectSchema } from "schemas/projectSchemas";

// For validating the API response
export type Project = z.infer<typeof projectSchema>;

// For validating form data
export type ProjectFormData = Pick<
    Project,
    "clientName" | "projectName" | "description"
>;
