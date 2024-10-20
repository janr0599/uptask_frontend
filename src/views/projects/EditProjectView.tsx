import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/projectTypes";
import { getProjectById } from "@/api/projectAPI";

function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, error } = useQuery<Project>({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    });

    console.log(isLoading);
    console.log(data);
    console.log(error);

    return <div>EditProjectView</div>;
}

export default EditProjectView;
