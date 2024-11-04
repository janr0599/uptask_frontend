import { useDroppable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";

type DropTaskProps = {
    status: string;
};

function DropTask({ status }: DropTaskProps) {
    const navigate = useNavigate();

    const { isOver, setNodeRef } = useDroppable({ id: status });
    const style = {
        opacity: isOver ? 0.4 : 1,
        transition: "opacity 0.3s ease, transform 0.2s ease",
        transform: isOver ? "scale(1.05)" : "scale(1)",
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-all rounded-md"
            onClick={() =>
                navigate(`${location.pathname}?newTask=true&status=${status}`)
            }
        >
            Drop or Create Task Here
        </div>
    );
}

export default DropTask;
