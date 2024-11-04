import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <h1 className="font-black text-4xl text-center text-white">
                Oops.. The page you are looking for does not exist
            </h1>
            <p className="text-center text-white mt-10">
                <Link
                    to="/"
                    className="text-fuchsia-500 font-bold hover:underline"
                >
                    Go back to home
                </Link>
            </p>
        </>
    );
}

export default NotFound;
