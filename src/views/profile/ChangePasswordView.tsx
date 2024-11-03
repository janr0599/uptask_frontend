import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { ChangePasswordForm } from "@/types/profileTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/profileSchemas";
import { changePassword } from "@/api/profileAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function ChangePasswordView() {
    const initialValues: ChangePasswordForm = {
        currentPassword: "",
        password: "",
        confirmPassword: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordForm>({
        defaultValues: initialValues,
        resolver: zodResolver(changePasswordSchema),
    });

    const password = watch("password");

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
        onSuccess: (message) => {
            toast.success(message);
            reset();
        },
    });

    const handleChangePassword = (formData: ChangePasswordForm) => {
        mutate(formData);
    };

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black ">Change Password</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Fill out this formt to change your password
                </p>

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="current_password"
                        >
                            Current Password
                        </label>
                        <input
                            id="current_password"
                            type="password"
                            placeholder="current password"
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            {...register("currentPassword", {
                                required: "current password is required",
                            })}
                        />
                        {errors.currentPassword && (
                            <ErrorMessage>
                                {errors.currentPassword.message}
                            </ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="new Password"
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            {...register("password", {
                                required: "New Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>
                                {errors.password.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm uppercase font-bold"
                        >
                            Repetir Password
                        </label>

                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="confirm password"
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            {...register("confirmPassword", {
                                required: "confirm password is required",
                                validate: (value) =>
                                    value === password ||
                                    "passwords do not match",
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
                        value="Change Password"
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    );
}
