import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/authTypes";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@/schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function LoginView() {
    const initialValues: UserLoginForm = {
        email: "",
        password: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginForm>({
        defaultValues: initialValues,
        resolver: zodResolver(userLoginSchema),
    });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
        },
    });

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
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
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Log in"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
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
