import api from "@/lib/axios";
import { taskSchema } from "@/schemas/taskSchemas";
import { TaskAPI, Task } from "@/types/taskTypes";
import { isAxiosError } from "axios";

export const createTask = async ({
    projectId,
    formData,
}: Pick<TaskAPI, "projectId" | "formData">) => {
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

export const getTaskById = async ({
    projectId,
    taskId,
}: Pick<TaskAPI, "projectId" | "taskId">): Promise<Task> => {
    try {
        // Fetch the task data from the API
        const { data } = await api<{ task: Task }>(
            `/projects/${projectId}/tasks/${taskId}`
        );
        console.log(data);

        // Validate the task data using Zod
        const validation = taskSchema.safeParse(data.task);
        if (validation.success) {
            console.log(validation.data);
            return validation.data; // Return validated data
        } else {
            // Log the validation errors if validation fails
            console.error("Task validation failed:", validation.error.errors);
            throw new Error("Validation failed");
        }
    } catch (error) {
        // Log the error if it's an Axios error with a response
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        // Log unexpected errors
        throw new Error("An unexpected error occurred");
    }
};

export const updateTask = async ({
    projectId,
    taskId,
    formData,
}: Pick<TaskAPI, "projectId" | "taskId" | "formData">) => {
    try {
        const { data } = await api.put<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}`,
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const deleteTask = async ({
    projectId,
    taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) => {
    try {
        const { data } = await api.delete<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}`
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const updateTaskStatus = async ({
    projectId,
    taskId,
    status,
}: Pick<TaskAPI, "projectId" | "taskId" | "status">) => {
    try {
        const { data } = await api.post<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}/status`,
            { status }
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
