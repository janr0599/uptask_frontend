import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/authAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const navigate = useNavigate();

    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    };

    const handleComplete = (token: ConfirmToken["token"]) => {
        mutate({ token });
    };

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            navigate("/auth/login");
        },
    });

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Confirm your Account
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Entre the code you received {""}
                <span className=" text-fuchsia-500 font-bold"> by e-mail</span>
            </p>
            <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
                <label className="font-normal text-2xl text-center block">
                    6-digit code
                </label>
                <div className="flex justify-center gap-6">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border-gray-600 border placeholder-white" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/request-code"
                    className="text-center text-gray-300 font-normal"
                >
                    Request a new Code
                </Link>
            </nav>
        </>
    );
}
