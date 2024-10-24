import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "@/types/authTypes";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestConfirmationCodeSchema } from "@/schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/authAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RequestConfirmationCodeForm>({
        defaultValues: initialValues,
        resolver: zodResolver(requestConfirmationCodeSchema),
    });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            reset();
        },
    });

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData);
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Request Confirmation Code
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your email to receive {""}
                <span className=" text-fuchsia-500 font-bold"> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
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
                        placeholder="correo@correo.com"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Request Code"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer transition-colors rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/login"
                    className="text-center text-gray-300 font-normal"
                >
                    Already have an account? Login
                </Link>
                <Link
                    to="/auth/forgot-password"
                    className="text-center text-gray-300 font-normal"
                >
                    Trouble logging in? Reset your password.
                </Link>
            </nav>
        </>
    );
}
