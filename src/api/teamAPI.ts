import api from "@/lib/axios";
import { teamMemberSchema, teamMembersSchema } from "@/schemas/teamSchemas";
import { Project } from "@/types/projectTypes";
import {
    ModifyProjectMember,
    FindMember,
    TeamMembers,
    TeamMember,
} from "@/types/teamTypes";
import { isAxiosError } from "axios";

export const findMemberByEmail = async ({
    projectId,
    formData,
}: FindMember): Promise<TeamMember> => {
    try {
        const { data } = await api.post<{ user: TeamMember }>(
            `/projects/${projectId}/team/find`,
            formData
        );
        const validation = teamMemberSchema.safeParse(data.user);

        if (!validation.success) throw new Error("Validation failed");
        return data.user;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const addMembertoProject = async ({
    projectId,
    memberId,
}: ModifyProjectMember) => {
    try {
        const { data } = await api.post<{ message: string }>(
            `/projects/${projectId}/team`,
            { memberId }
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const getProjectMembers = async (
    projectId: Project["_id"]
): Promise<TeamMembers> => {
    try {
        const { data } = await api<{ team: TeamMembers }>(
            `/projects/${projectId}/team`
        );
        const validation = teamMembersSchema.safeParse(data.team);

        if (!validation.success) throw new Error("Validation failed");
        console.log(data.team);
        return data.team;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const removeMemberFromProject = async ({
    projectId,
    memberId,
}: ModifyProjectMember) => {
    try {
        const { data } = await api.delete<{ message: string }>(
            `/projects/${projectId}/team/${memberId}`
        );
        console.log(data.message);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
