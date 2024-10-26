import {
    Navigate,
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/projectTypes";
import { getProjectById } from "@/api/projectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

function ProjectDetailsView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();

    const { data, isLoading, isError } = useQuery<Project>({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    });

    if (isLoading) return "Loading...";
    if (isError) return <Navigate to="/404" />;

    if (data)
        return (
            <>
                <div className="container mx-auto px-4">
                    <div className="flex">
                        <div className="">
                            <h1 className="text-4xl font-black">
                                {data.projectName}
                            </h1>
                            <p className="text-xl font-light text-gray-500 mt-5">
                                {data.description}
                            </p>
                            <nav className=" my-5 flex gap-3">
                                <button
                                    type="button"
                                    className=" bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                                    onClick={() =>
                                        navigate(
                                            location.pathname + "?newTask=true"
                                        )
                                    }
                                >
                                    Add new Task
                                </button>
                            </nav>
                        </div>
                        {/* <div className="mt-auto ml-auto">
                            <nav className=" my-5 flex gap-3">
                                <button
                                    type="button"
                                    className=" bg-purple-400 hover:bg-purple-500 w-48 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                                    onClick={() =>
                                        navigate("/", { replace: true })
                                    }
                                >
                                    Back to projects
                                </button>
                            </nav>
                        </div> */}
                    </div>
                    <TaskList tasks={data.tasks} />
                    <AddTaskModal />
                    <EditTaskData />
                    <TaskModalDetails />
                </div>
            </>
        );
}

export default ProjectDetailsView;
