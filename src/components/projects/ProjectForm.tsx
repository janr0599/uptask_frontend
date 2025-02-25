import { FieldErrors, UseFormRegister, UseFormSetFocus } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "@/types/projectTypes";
import { useEffect } from "react";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
    setFocus: UseFormSetFocus<ProjectFormData>;
};

export default function ProjectForm({
    register,
    errors,
    setFocus,
}: ProjectFormProps) {
    useEffect(() => {
        setFocus("projectName");
    }, [setFocus]);
    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="projectName"
                    className="text-sm uppercase font-bold"
                >
                    Project Name
                </label>
                <input
                    id="projectName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Project Name"
                    {...register("projectName", {
                        required: "Project name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                    htmlFor="clientName"
                    className="text-sm uppercase font-bold"
                >
                    Client Name
                </label>
                <input
                    id="clientName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Client Name"
                    {...register("clientName", {
                        required: "Client name is required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                    htmlFor="description"
                    className="text-sm uppercase font-bold"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200 rounded-lg"
                    placeholder="Project Description"
                    {...register("description", {
                        required: "Project description is required",
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
