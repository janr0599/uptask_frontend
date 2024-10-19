import { ProjectFormData } from "@/types/projectTypes";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

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
        const { data } = await api.get("/projects");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
