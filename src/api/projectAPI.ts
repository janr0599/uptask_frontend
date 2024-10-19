import { ProjectFormData } from "@/types/projectTypes";
import api from "@/lib/axios";

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post("/projects", formData);
        return data.message;
    } catch (error) {
        console.log(error);
    }
};
