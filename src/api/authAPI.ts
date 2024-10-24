import api from "@/lib/axios";
import {
    UserRegistrationForm,
    UserLoginForm,
    ConfirmToken,
    RequestConfirmationCodeForm,
} from "@/types/authTypes";
import { isAxiosError } from "axios";

export const createAccount = async (formData: UserRegistrationForm) => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/auth/create-account",
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const confirmAccount = async (token: ConfirmToken) => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/auth/confirm-account",
            token
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const requestConfirmationCode = async (
    formData: RequestConfirmationCodeForm
) => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/auth/request-code",
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const login = async (formData: UserLoginForm) => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/auth/login",
            formData
        );
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
