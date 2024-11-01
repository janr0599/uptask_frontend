import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Note } from "@/types/noteTypes";
import { formatDate } from "@/utils/utils";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/noteAPI";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddNoteForm from "./AddNoteForm";

type NoteDetailProps = {
    note: Note;
};

function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    const { mutate: mutateDeleteNote } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
        },
    });

    const handleDeleteNote = () => {
        if (confirm("Are you sure you want to delete this note?")) {
            mutateDeleteNote({
                projectId,
                taskId,
                noteId: note._id,
            });
        }
    };

    const handleEditNote = () => {
        setEditingNote(note);
    };

    if (isLoading) return "Loading...";

    if (data)
        return (
            <div key={note._id} className="">
                {!editingNote ? (
                    <div className="p-3 flex justify-between items-center">
                        <div>
                            <p>
                                {note.content}{" "}
                                <span className="text-slate-400 text-sm">
                                    ({note.createdBy.name})
                                </span>
                            </p>
                            <p className="text-sm text-slate-400">
                                {formatDate(note.createdAt)}
                            </p>
                        </div>
                        {canDelete && (
                            <div className="inline-flex gap-x-2">
                                <button onClick={handleEditNote}>
                                    <PencilIcon className="size-6 text-gray-600 hover:text-gray-900 transition-colors" />
                                </button>
                                <button onClick={handleDeleteNote}>
                                    <TrashIcon className="size-6 text-red-400 hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <AddNoteForm
                        note={editingNote}
                        onCancel={() => setEditingNote(null)}
                    />
                )}
            </div>
        );
}

export default NoteDetail;
