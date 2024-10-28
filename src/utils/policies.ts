import { Project } from "@/types/projectTypes";
import { TeamMember } from "@/types/teamTypes";

export const isManager = (
    managerId: Project["manager"],
    userId: TeamMember["_id"]
) => {
    return managerId === userId;
};
