import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/projectTypes";
import { getProjectById } from "@/api/projectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";

function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery<Project>({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    });

    if (isLoading) return "Loading...";
    if (isError) return <Navigate to="/404" />;

    if (data) return <EditProjectForm data={data} projectId={projectId} />;
}

export default EditProjectView;
