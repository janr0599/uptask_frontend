import {
    DashboardProjects,
    Project,
    ProjectFormData,
    ProjectUpdate,
} from "@/types/projectTypes";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
    dashboardProjectSchema,
    projectFormSchema,
    projectSchema,
} from "@/schemas/projectSchemas";

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/projects",
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const getProjects = async (): Promise<DashboardProjects> => {
    try {
        const { data } = await api<{ projects: DashboardProjects }>(
            "/projects"
        );
        const validation = dashboardProjectSchema.safeParse(data.projects);
        if (validation.success) {
            return validation.data;
        }
        throw new Error("Validation failed");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const getProjectById = async (projectId: string): Promise<Project> => {
    try {
        // Fetch the project data
        const { data } = await api<{ project: Project }>(
            `/projects/${projectId}`
        );
        // Validate the project data using Zod
        const validation = projectSchema.safeParse(data.project);

        // Log the validation result
        if (!validation.success) {
            console.error(
                "Project data validation failed:",
                validation.error.errors
            );
            throw new Error("Project data validation failed");
        }
        return validation.data; // Return validated data
    } catch (error) {
        // Log the error if it's an Axios error with a response
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.error || "Failed to fetch project"
            );
        }

        // Log unexpected errors
        throw new Error("An unexpected error occurred");
    }
};

export const getProjectToEdit = async (
    projectId: string
): Promise<ProjectFormData> => {
    try {
        // Fetch the project data
        const { data } = await api<{ project: Project }>(
            `/projects/${projectId}`
        );
        // Validate the project data using Zod
        const validation = projectFormSchema.safeParse(data.project);

        // Log the validation result
        if (!validation.success) {
            console.error(
                "Project data validation failed:",
                validation.error.errors
            );
            throw new Error("Project data validation failed");
        }
        return validation.data; // Return validated data
    } catch (error) {
        // Log the error if it's an Axios error with a response
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.error || "Failed to fetch project"
            );
        }

        // Log unexpected errors
        throw new Error("An unexpected error occurred");
    }
};

export const updateProject = async ({ formData, projectId }: ProjectUpdate) => {
    try {
        const { data } = await api.put<{ message: string }>(
            `/projects/${projectId}`,
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const deleteProject = async (id: Project["_id"]) => {
    try {
        const { data } = await api.delete<{ message: string }>(
            `/projects/${id}`
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};
