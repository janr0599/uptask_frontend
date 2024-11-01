import { noteFormSchema } from "@/schemas/noteSchemas";
import { Note, NoteFormData } from "@/types/noteTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, updateNote } from "@/api/noteAPI"; // Update this line
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type AddNoteFormProps = {
    note?: Note; // Optional for editing
    onCancel?: () => void; // Optional cancel function
};

function AddNoteForm({ note, onCancel }: AddNoteFormProps) {
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;
    const initialValues: NoteFormData = {
        content: note ? note.content : "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NoteFormData>({
        defaultValues: initialValues,
        resolver: zodResolver(noteFormSchema),
    });
    const queryClient = useQueryClient();

    const { mutate: mutateCreateNote } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
            reset();
            onCancel && onCancel();
        },
    });

    const { mutate: mutateUpdateNote } = useMutation({
        mutationFn: updateNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
            reset();
            onCancel && onCancel();
        },
    });

    const handleAddOrUpdateNote = (formData: NoteFormData) => {
        if (note) {
            mutateUpdateNote({
                projectId,
                taskId,
                noteId: note._id,
                formData,
            });
        } else {
            mutateCreateNote({
                projectId,
                taskId,
                formData,
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleAddOrUpdateNote)}
            className="space-y-3 pb-3"
            noValidate
        >
            <label htmlFor="content" className="font-bold">
                {note ? "" : "Create Note:"}
            </label>
            <div>
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
                <div className="flex flex-col gap-3 md:flex-row justify-between">
                    <input
                        id="content"
                        type="text"
                        placeholder="Enter your note here"
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg "
                        {...register("content")}
                    />
                    <input
                        type="submit"
                        value={note ? "Update" : "Add Note"}
                        className="w-full p-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-black cursor-pointer transition-colors md:w-1/4"
                    />
                    {note && (
                        <button
                            onClick={onCancel}
                            className="text-red-500 w-full p-2 rounded-lg font-black bg-transparent hover:bg-slate-100 transition-colors md:w-1/4"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default AddNoteForm;
