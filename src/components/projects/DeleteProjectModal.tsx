import { Fragment, useEffect } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { DeleteProjectConfirmationForm } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteProjectConfirmationSchema } from "@/schemas/authSchemas";
import { checkPassword } from "@/api/authAPI";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/projectAPI";

export default function DeleteProjectModal() {
    const initialValues: DeleteProjectConfirmationForm = {
        password: "",
    };
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get("deleteProject")!;
    const show = deleteProjectId ? true : false;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setFocus,
    } = useForm<DeleteProjectConfirmationForm>({
        defaultValues: initialValues,
        resolver: zodResolver(deleteProjectConfirmationSchema),
    });

    const checkPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const queryClient = useQueryClient();
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            reset();
            navigate(location.pathname, { replace: true });
        },
    });

    const handleForm = async (formData: DeleteProjectConfirmationForm) => {
        await checkPasswordMutation.mutateAsync(formData);

        await deleteProjectMutation.mutateAsync(deleteProjectId);
    };

    useEffect(() => setFocus("password"), [setFocus]);

    return (
        <Transition appear show={show} as={Fragment}>
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
                                    Delete Project{" "}
                                </DialogTitle>

                                <p className="text-xl font-bold">
                                    Confirm this action by {""}
                                    <span className="text-fuchsia-600">
                                        entering your password
                                    </span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="login password"
                                            className="w-full p-3 border-gray-300 border rounded-lg"
                                            {...register("password", {
                                                required:
                                                    "password is required",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>
                                                {errors.password.message}
                                            </ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
                                        value="Delete Project"
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
