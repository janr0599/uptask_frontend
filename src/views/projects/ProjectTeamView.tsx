// import { Fragment } from "react";
import { getProjectMembers, removeMemberFromProject } from "@/api/teamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
// import {
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuItems,
//     Transition,
// } from "@headlessui/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TeamTable from "@/components/team/TeamTable";

function ProjectTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getProjectMembers(projectId),
        retry: false,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: removeMemberFromProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({
                queryKey: ["projectTeam", projectId],
            });
        },
    });

    if (isLoading) return "Loading...";
    if (isError) return <Navigate to={"/404"} />;

    if (data)
        return (
            <>
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-black">Team</h1>
                    <p className="text-xl font-light text-gray-500 mt-5">
                        Manage your team and add collaborators
                    </p>
                    <nav className=" my-5 flex gap-3">
                        <button
                            type="button"
                            className=" bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                            onClick={() =>
                                navigate(location.pathname + "?addMember=true")
                            }
                        >
                            Add new Collaborator
                        </button>
                        <Link
                            to={`/projects/${projectId}`}
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >
                            Back to project
                        </Link>
                    </nav>
                    <h2 className="text-3xl font-black my-10">
                        Project Members
                    </h2>

                    {data.length ? (
                        <TeamTable
                            data={data}
                            mutate={mutate}
                            projectId={projectId}
                        />
                    ) : (
                        <p className="text-center py-20">
                            No members on this team yet
                        </p>
                    )}
                    <AddMemberModal />
                </div>
            </>
        );
}

export default ProjectTeamView;
