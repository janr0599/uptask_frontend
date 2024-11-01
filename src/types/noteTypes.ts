import { z } from "zod";
import { noteFormSchema, noteSchema } from "@/schemas/noteSchemas";
import { Project } from "./projectTypes";
import { Task } from "./taskTypes";

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = z.infer<typeof noteFormSchema>;
export type NoteAPIType = {
    formData: NoteFormData;
    projectId: Project["_id"];
    taskId: Task["_id"];
    noteId: Note["_id"];
};
