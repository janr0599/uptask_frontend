import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/projectTypes";
import { createProject } from "@/api/projectAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/schemas/projectSchemas";

function CreateProjectView() {
    const navigate = useNavigate();

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        defaultValues: initialValues,
        resolver: zodResolver(projectFormSchema),
    });

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: () => {},
        onSuccess: (message) => {
            toast.success(message);
            navigate("/");
        },
    });

    const handleForm = (formData: ProjectFormData) => mutate(formData);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create a Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Fill out the form with your project details
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
                    <ProjectForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Create Project"
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    );
}

export default CreateProjectView;
