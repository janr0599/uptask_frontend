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
        console.log("Fetching project with ID:", projectId);
        const { data } = await api<{ project: Project }>(
            `/projects/${projectId}`
        );

        const validation = projectSchema.safeParse(data.project);
        if (!validation.success) {
            throw new Error("Project data validation failed");
        }

        return validation.data; // Return validated data
    } catch (error) {
        console.error("Error fetching project:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.error || "Failed to fetch project"
            );
        }
        throw new Error("An unexpected error occurred in getProjectById");
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
    }
};
