import type { ConfirmToken, NewPasswordForm } from "@/types/authTypes";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "@/schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/authAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();

    const initialValues: NewPasswordForm = {
        password: "",
        confirmPassword: "",
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<NewPasswordForm>({
        defaultValues: initialValues,
        resolver: zodResolver(newPasswordSchema),
    });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            reset();
            navigate("/auth/login");
        },
    });

    const handleNewPassword = (formData: NewPasswordForm) => {
        mutate({ formData, token });
    };

    const password = watch("password");

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 border-gray-300 border"
                        {...register("confirmPassword", {
                            required: "Password must be confirmed",
                            validate: (value) =>
                                value === password || "Passwords don't match",
                        })}
                    />

                    {errors.confirmPassword && (
                        <ErrorMessage>
                            {errors.confirmPassword.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Set New Password"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer transition-colors rounded-lg "
                />
            </form>
        </>
    );
}
