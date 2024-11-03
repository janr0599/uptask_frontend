import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { AuthenticatedUser } from "@/types/authTypes";
import { UserProfileForm } from "@/types/profileTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/profileAPI";
import { toast } from "react-toastify";

type ProfileFormProps = {
    data: AuthenticatedUser;
};

export default function ProfileForm({ data }: ProfileFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileForm>({
        defaultValues: data,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    const handleEditProfile = (formData: UserProfileForm) => {
        mutate(formData);
    };

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Here you can update your information
                </p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200 rounded-lg"
                            {...register("name", {
                                required: "username is required",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            E-mail
                        </label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200 rounded-lg"
                            {...register("email", {
                                required: "email is required",
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
                        value="Save changes"
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    );
}
