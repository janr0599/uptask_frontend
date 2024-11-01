import { Fragment } from "react";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedUser } from "@/types/authTypes";
import { useQueryClient } from "@tanstack/react-query";

type NavMenuProps = {
    name: AuthenticatedUser["name"];
};

export const NavMenu = ({ name }: NavMenuProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN_UPTASK");
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["projects"] });
        navigate("/auth/login");
    };

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400 mr-5">
                <Bars3Icon className="w-8 h-8 text-white " />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute w-48 -left-1/2 lg:left-1/2 z-10 mt-5 flex lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-white text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 py-2">
                        <p className="text-center pb-1">Hello: {name}</p>

                        <PopoverButton
                            as={Link}
                            to="/profile"
                            className="block p-2 hover:text-purple-950 hover:bg-slate-200 transition-colors"
                        >
                            My Profile
                        </PopoverButton>

                        <PopoverButton
                            as={Link}
                            to="/"
                            className="block p-2 hover:text-purple-950 hover:bg-slate-200 transition-colors"
                        >
                            My Projects
                        </PopoverButton>

                        <button
                            className="block p-2 hover:text-purple-950 hover:bg-slate-200 transition-colors w-full text-left"
                            type="button"
                            onClick={logout}
                        >
                            Log Out
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};
