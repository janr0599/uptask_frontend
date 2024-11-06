import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/teamTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberFormSchema } from "@/schemas/teamSchemas";
import { findMemberByEmail } from "@/api/teamAPI";
import SearchResult from "./SearchResult";
import { useEffect } from "react";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: "",
    };
    const params = useParams();
    const projectId = params.projectId!;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus,
    } = useForm<TeamMemberForm>({
        defaultValues: initialValues,
        resolver: zodResolver(teamMemberFormSchema),
    });

    const mutation = useMutation({
        mutationFn: findMemberByEmail,
    });

    const handleSearchUser = async (formData: TeamMemberForm) => {
        mutation.mutate({ projectId, formData });
    };

    const resetData = () => {
        reset();
        mutation.reset();
    };

    useEffect(() => setFocus("email"), [setFocus]);

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="name">
                        User Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="email@email.com"
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
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer transition-colors rounded-lg"
                    value="Search user"
                />
            </form>

            {mutation.isPending && (
                <p className="text-center mt-10">Loading....</p>
            )}
            {mutation.error && (
                <p className="text-center mt-10 font-bold">
                    {mutation.error.message}
                </p>
            )}
            {mutation.data && (
                <SearchResult
                    user={mutation.data}
                    projectId={projectId}
                    resetData={resetData}
                />
            )}
        </>
    );
}
