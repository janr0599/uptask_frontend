import { addMembertoProject } from "@/api/teamAPI";
import { Project } from "@/types/projectTypes";
import { TeamMember } from "@/types/teamTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember;
    projectId: Project["_id"];
    resetData: () => void;
};

function SearchResult({ user, projectId, resetData }: SearchResultProps) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addMembertoProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            resetData();
            queryClient.invalidateQueries({
                queryKey: ["projectTeam", projectId],
            });
        },
    });

    const handleAddMembertoProject = () => {
        mutate({ projectId, memberId: user._id });
    };

    return (
        <>
            <p className="mt-10 text-center font-bold">Result:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:underline px-10 py-3 font-bold cursor-pointer rounded-lg transition-colors"
                    onClick={handleAddMembertoProject}
                >
                    Add to Project
                </button>
            </div>
        </>
    );
}

export default SearchResult;
