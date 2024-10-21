import api from "@/lib/axios";
import { CreateTask } from "@/types/taskTypes";
import { isAxiosError } from "axios";

export const createTask = async ({ formData, projectId }: CreateTask) => {
    try {
        const { data } = await api.post<{ message: string }>(
            `/projects/${projectId}/tasks`,
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
