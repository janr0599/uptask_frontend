import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/authTypes";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegistrationSchema } from "@/schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/authAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function RegistrationView() {
    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({
        defaultValues: initialValues,
        resolver: zodResolver(userRegistrationSchema),
    });

    const password = watch("password");

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            reset();
        },
    });

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">Create Account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form and {""}
                <span className=" text-fuchsia-500 font-bold">
                    {" "}
                    Create your account
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Name</label>
                    <input
                        type="name"
                        placeholder="Registration name"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("name", {
                            required: "name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email@email.com"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Not a valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        type="password"
                        placeholder="Registration password"
                        className="w-full p-3 border-gray-300 border rounded-lg"
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
                        placeholder="Confirm your password"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("confirmPassword", {
                            required: "Password must be confirmed",
                            validate: (value) =>
                                value === password || "Passwords do not match",
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
                    value="Register"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer transition-colors rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={"/auth/login"}
                    className="text-center text-gray-300 font-normal"
                >
                    Already have an account? Login
                </Link>
                <Link
                    to={"/auth/forgot-password"}
                    className="text-center text-gray-300 font-normal"
                >
                    Trouble logging in? Reset your password.
                </Link>
            </nav>
        </>
    );
}
