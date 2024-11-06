import { Fragment } from "react";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Task, TaskFormData } from "@/types/taskTypes";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { taskFormSchema } from "@/schemas/taskSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTask } from "@/api/taskAPI";

type EditTaskModalProps = {
    data: Task;
};

export default function EditTaskModal({ data }: EditTaskModalProps) {
    const navigate = useNavigate();
    const initialValues: TaskFormData = {
        name: data.name,
        description: data.description,
    };

    const params = useParams();
    const projectId = params.projectId!;

    const taskId = data._id;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus,
    } = useForm<TaskFormData>({
        defaultValues: initialValues,
        resolver: zodResolver(taskFormSchema),
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
            toast.success(message);
            navigate(location.pathname, { replace: true });
            reset();
        },
    });

    const handleEditTask = (formData: TaskFormData) => {
        mutate({ projectId, taskId, formData });
    };

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => navigate(location.pathname, { replace: true })}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Edit Task
                                </DialogTitle>

                                <p className="text-xl font-bold">
                                    Update your task using this {""}
                                    <span className="text-fuchsia-600">
                                        form
                                    </span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleEditTask)}
                                >
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                        setFocus={setFocus}
                                    />
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-lg transition-colors"
                                        value="Save Changes"
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
