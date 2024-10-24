import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "@/types/authTypes";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/authAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordForm>({
        defaultValues: initialValues,
        resolver: zodResolver(forgotPasswordSchema),
    });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => [toast.success(message)],
    });

    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutate(formData);
        reset();
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Reset your Password
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your email and receive instructions to set {""}
                <span className=" text-fuchsia-500 font-bold">
                    {" "}
                    a new password
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Send Instructions"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black text-xl cursor-pointer transition-colors rounded-lg"
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
                    to={"/auth/registration"}
                    className="text-center text-gray-300 font-normal"
                >
                    Don't have an account? Create one
                </Link>
            </nav>
        </>
    );
}
