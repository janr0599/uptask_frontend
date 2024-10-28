import {
    Navigate,
    useNavigate,
    useParams,
    useLocation,
    Link,
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
                    <h1 className="text-4xl font-black">{data.projectName}</h1>
                    <p className="text-xl font-light text-gray-500 mt-5">
                        {data.description}
                    </p>
                    <nav className=" my-5 flex gap-3">
                        <button
                            type="button"
                            className=" bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                            onClick={() =>
                                navigate(location.pathname + "?newTask=true")
                            }
                        >
                            Add new Task
                        </button>
                        <Link
                            to={"team"}
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >
                            Collaborators
                        </Link>
                    </nav>

                    <TaskList tasks={data.tasks} />
                    <AddTaskModal />
                    <EditTaskData />
                    <TaskModalDetails />
                </div>
            </>
        );
}

export default ProjectDetailsView;
