import { Link } from "react-router-dom";

function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-black">My projects</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Manage your projects
            </p>

            <Link
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors inline-block my-3 rounded-lg"
                to="/projects/create"
            >
                New Project
            </Link>
        </>
    );
}

export default DashboardView;
