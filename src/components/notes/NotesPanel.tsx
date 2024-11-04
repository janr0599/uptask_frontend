import AddNoteForm from "./AddNoteForm";
import { Task } from "@/types/taskTypes";
import NoteDetails from "./NoteDetails";

type NotesPanelProps = {
    notes: Task["notes"];
};

function NotesPanel({ notes }: NotesPanelProps) {
    return (
        <>
            <div className="divide-y divide-gray-300 my-10">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">
                            Notes
                        </p>
                        {/* // Checks whether notes is an array of objects and
                        renders the appropriate component */}
                        {notes.every((note) => typeof note === "object") &&
                            notes.map((note) => (
                                <NoteDetails note={note} key={note._id} />
                            ))}
                    </>
                ) : (
                    <p className="text-center text-gray-500 pt-3">
                        No notes yet
                    </p>
                )}
            </div>
            <AddNoteForm />
        </>
    );
}

export default NotesPanel;
