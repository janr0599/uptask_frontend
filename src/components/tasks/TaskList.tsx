import { Task } from "@/types/taskTypes";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";
import DropTask from "./DropTask";
import {
    closestCenter,
    // closestCenter,
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/taskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Project } from "@/types/projectTypes";

type TaskListProps = {
    tasks: Task[];
    canEdit: boolean;
};

type GroupedTasks = {
    [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
};

const statusStyles: { [key: string]: string } = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    inProgress: "border-t-blue-500",
    underReview: "border-t-amber-500",
    completed: "border-t-emerald-500",
};

function TaskList({ tasks, canEdit }: TaskListProps) {
    const params = useParams();
    const projectId = params.projectId!;

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

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
            toast.success(message);
        },
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;

        if (over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as Task["status"];

            const draggedTask = tasks.find((task) => task._id === taskId);

            if (draggedTask && status !== draggedTask.status) {
                mutate({
                    projectId,
                    taskId,
                    status,
                });

                queryClient.setQueryData(
                    ["project", projectId],
                    (prevData: Project) => {
                        const updatedTasks = prevData.tasks.map((task) => {
                            if (task._id === taskId) {
                                return {
                                    ...task,
                                    status,
                                };
                            }
                            return task;
                        });

                        return {
                            ...prevData,
                            tasks: updatedTasks,
                        };
                    }
                );
            }
        }
    };
    return (
        <>
            <h2 className="text-4xl font-black my-5">Tasks</h2>

            <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
                <DndContext
                    collisionDetection={closestCenter}
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div
                            key={status}
                            className="min-w-[280px] 2xl:min-w-0 2xl:w-1/5"
                        >
                            <h3
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 rounded-lg ${statusStyles[status]}`}
                            >
                                {statusTranslations[status]}
                            </h3>
                            <DropTask status={status} />
                            <ul className="mt-5 space-y-3">
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">
                                        No Tasks yet
                                    </li>
                                ) : (
                                    tasks.map((task) => (
                                        <TaskCard
                                            key={task._id}
                                            task={task}
                                            canEdit={canEdit}
                                        />
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    );
}

export default TaskList;
