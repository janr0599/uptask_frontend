import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/taskAPI";
import EditTaskModal from "./EditTaskModal";
import { Task } from "@/types/taskTypes";

function EditTaskData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("editTask")!;

    const params = useParams();
    const projectId = params.projectId!;

    const { data, isError } = useQuery<Task>({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId, // evaluates a value as true or false whether they have a value or not, in this case if taskId has a value it's because it's present in the url and we want the query to run
        retry: false,
    });

    if (isError) return <Navigate to={"/404"} />;

    if (data) return <EditTaskModal data={data} />;
}

export default EditTaskData;
