import {
    teamMemberFormSchema,
    teamMemberSchema,
    teamMembersSchema,
} from "@/schemas/teamSchemas";
import { z } from "zod";
import { Project } from "./projectTypes";

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = z.infer<typeof teamMemberFormSchema>;
export type FindMember = {
    projectId: Project["_id"];
    formData: TeamMemberForm;
};

// Works for both adding and removing a member from a project
export type ModifyProjectMember = {
    projectId: Project["_id"];
    memberId: TeamMember["_id"];
};

export type TeamMembers = z.infer<typeof teamMembersSchema>;
