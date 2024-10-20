import { Project, ProjectFormData } from "@/types/projectTypes";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
    dashboardProjectSchema,
    projectSchema,
} from "@/schemas/projectSchemas";

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post("/projects", formData);
        return data.message;
    } catch (error) {
        console.log(error);
    }
};

export const getProjects = async () => {
    try {
        const { data } = await api("/projects");
        const response = dashboardProjectSchema.safeParse(data.projects);
        if (response.success) {
            return data.projects;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const getProjectById = async (id: Project["_id"]) => {
    try {
        const { data } = await api(`/projects/${id}`);
        const response = projectSchema.safeParse(data.project);
        if (response.success) {
            return data.project;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
