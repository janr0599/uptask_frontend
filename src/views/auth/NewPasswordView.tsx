import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/authTypes";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Set a new Password
            </h1>
            {!isValidToken ? (
                <p className="text-2xl font-light text-white mt-5">
                    Enter the code you received {""}
                    <span className="text-fuchsia-500 font-bold">by email</span>
                </p>
            ) : (
                <p className="text-2xl font-light text-white mt-5">
                    Set and confirm a{" "}
                    <span className="text-fuchsia-500 font-bold">
                        new password
                    </span>
                </p>
            )}

            {!isValidToken ? (
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordForm token={token} />
            )}
        </>
    );
}
