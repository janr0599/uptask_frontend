import {
    baseAuthSchema,
    requestConfirmationCodeSchema,
    tokenSchema,
    userLoginSchema,
    userRegistrationSchema,
} from "@/schemas/authSchemas";
import { z } from "zod";

export type Auth = z.infer<typeof baseAuthSchema>;

export type UserLoginForm = z.infer<typeof userLoginSchema>;
export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
export type ConfirmToken = z.infer<typeof tokenSchema>;
export type RequestConfirmationCodeForm = z.infer<
    typeof requestConfirmationCodeSchema
>;