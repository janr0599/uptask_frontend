import { projectFormSchema } from "@/schemas/projectSchemas";
import { Project, ProjectFormData } from "@/types/projectTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/projectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project["_id"];
};

function EditProjectForm({ data, projectId }: EditProjectFormProps) {
    const navigate = useNavigate();

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
    } = useForm<ProjectFormData>({
        defaultValues: initialValues,
        resolver: zodResolver(projectFormSchema),
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            toast.success(message);
            navigate("/");
        },
    });

    const handleForm = (formData: ProjectFormData) => {
        mutate({ formData, projectId });
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edit Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Update your project details using the form below
                </p>

                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors inline-block my-3 rounded-lg"
                    to="/"
                >
                    Back to Projects
                </Link>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                        setFocus={setFocus}
                    />
                    <input
                        type="submit"
                        value="Update Project"
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    );
}

export default EditProjectForm;
