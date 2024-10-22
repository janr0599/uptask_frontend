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
        const { data } = await api<{ task: Task }>(
            `/projects/${projectId}/tasks/${taskId}`
        );
        const validation = taskSchema.safeParse(data.task);
        if (validation.success) {
            return data.task;
        }
        throw new Error("Validation failed");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
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
