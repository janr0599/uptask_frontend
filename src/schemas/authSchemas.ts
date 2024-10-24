import { z } from "zod";

// Base schema
export const baseAuthSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(8, "Please confirm your password"),
    token: z.string(),
});

// Registration schema with refine
export const userRegistrationSchema = baseAuthSchema
    .pick({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const userLoginSchema = baseAuthSchema
    .pick({
        email: true,
        password: true,
    })
    .extend({
        password: z.string().trim().min(1, "Password is required"),
    });

export const tokenSchema = baseAuthSchema.pick({
    token: true,
});

export const requestConfirmationCodeSchema = baseAuthSchema.pick({
    email: true,
});