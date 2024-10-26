import {
    baseAuthSchema,
    newPasswordSchema,
    requestConfirmationCodeSchema,
    forgotPasswordSchema,
    tokenSchema,
    userLoginSchema,
    userRegistrationSchema,
    authenticatedUserSchema,
} from "@/schemas/authSchemas";
import { z } from "zod";

export type Auth = z.infer<typeof baseAuthSchema>;

export type UserLoginForm = z.infer<typeof userLoginSchema>;
export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
export type ConfirmToken = z.infer<typeof tokenSchema>;
export type RequestConfirmationCodeForm = z.infer<
    typeof requestConfirmationCodeSchema
>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordForm = z.infer<typeof newPasswordSchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
