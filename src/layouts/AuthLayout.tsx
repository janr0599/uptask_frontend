import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 mx-auto w-[450px]">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}

export default AuthLayout;
