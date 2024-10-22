import { taskFormSchema, taskSchema } from "@/schemas/taskSchemas";
import { z } from "zod";
import { Project } from "./projectTypes";

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = z.infer<typeof taskFormSchema>;

export type TaskAPI = {
    formData: TaskFormData;
    projectId: Project["_id"];
    taskId: Task["_id"];
    status: Task["status"];
};
