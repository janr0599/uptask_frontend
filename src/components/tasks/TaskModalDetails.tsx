import { Fragment, useEffect } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/taskTypes";
import { getTaskById, updateTaskStatus } from "@/api/taskAPI";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/en";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const show = !!taskId;

    const params = useParams();
    const projectId = params.projectId!;

    const { data, isError, error } = useQuery<Task>({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
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
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as Task["status"];

        mutate({
            projectId,
            taskId,
            status,
        });
    };

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
            navigate(`/projects/${projectId}`);
        }
    }, [isError]);

    if (data)
        return (
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() =>
                        navigate(location.pathname, { replace: true })
                    }
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all py-8 px-12">
                                    <div className="md:flex justify-between items-center ">
                                        <div className="order-last mb-auto">
                                            <p className="text-sm text-slate-400">
                                                Created on:{" "}
                                                {formatDate(data.createdAt)}
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                Last update:{" "}
                                                {formatDate(data.updatedAt)}
                                            </p>
                                        </div>

                                        <div className="">
                                            <DialogTitle
                                                as="h3"
                                                className="font-black text-4xl text-slate-600 my-5"
                                            >
                                                {data.name}
                                            </DialogTitle>
                                            <p className="text-lg text-slate-500 mb-2 max-w-[550px]">
                                                Description: {data.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 mb-10 space-y-3">
                                        <label className="font-bold block">
                                            Status:
                                        </label>
                                        <select
                                            className="w-1/4 p-3 bg-white border border-gray-300 rounded-lg"
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(
                                                statusTranslations
                                            ).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className="font-bold text-2xl text-slate-600 mt-5 mb-2">
                                                Activity Log
                                            </p>
                                            <ul>
                                                {data.completedBy.map(
                                                    (entry) => (
                                                        <li
                                                            key={entry._id}
                                                            className="list-decimal ml-4"
                                                        >
                                                            <span className="font-bold text-slate-600">
                                                                {
                                                                    statusTranslations[
                                                                        entry
                                                                            .status
                                                                    ]
                                                                }
                                                                {""} by:
                                                            </span>{" "}
                                                            {
                                                                typeof entry.user ===
                                                                    "object" &&
                                                                    entry.user
                                                                        .name // If it's an object, display the user's name
                                                            }
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    ) : null}

                                    <NotesPanel notes={data.notes} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
}
