import api from "@/lib/axios";
import { NoteAPIType } from "@/types/noteTypes";
import { isAxiosError } from "axios";

export const createNote = async ({
    projectId,
    taskId,
    formData,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) => {
    try {
        const { data } = await api.post<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}/notes`,
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

export const updateNote = async ({
    projectId,
    taskId,
    noteId,
    formData,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId" | "formData">) => {
    try {
        const { data } = await api.put<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`,
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

export const deleteNote = async ({
    projectId,
    taskId,
    noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
    try {
        const { data } = await api.delete<{ message: string }>(
            `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};
