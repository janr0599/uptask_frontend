import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectToEdit } from "@/api/projectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { ProjectFormData } from "@/types/projectTypes";

function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery<ProjectFormData>({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectToEdit(projectId),
        retry: false,
    });

    if (isLoading) return "Loading...";
    if (isError) return <Navigate to="/404" />;

    if (data) return <EditProjectForm data={data} projectId={projectId} />;
}

export default EditProjectView;
