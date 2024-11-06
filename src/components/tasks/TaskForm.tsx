import { useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetFocus } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { TaskFormData } from "@/types/taskTypes";

type TaskFormProps = {
    register: UseFormRegister<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
    setFocus: UseFormSetFocus<TaskFormData>;
};

function TaskForm({ register, errors, setFocus }: TaskFormProps) {
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    return (
        <>
            <div className="flex flex-col gap-5">
                <label htmlFor="name" className="font-normal text-2xl">
                    Task Name
                </label>
                <input
                    id="name"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Task Name"
                    {...register("name", {
                        required: "Task name is required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label htmlFor="description" className="font-normal text-2xl">
                    Task Description
                </label>
                <input
                    id="description"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Task Description"
                    {...register("description", {
                        required: "Client name is required",
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}

export default TaskForm;
