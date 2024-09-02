import React from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";

import { Link, useNavigate } from "react-router-dom";
import authservice from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { Menu, X } from "lucide-react";

const message =
    "Hello, I came from your webiste.";
const whatsappUrl =
    "https://wa.me/" + "+919621057682" + "?text=" + encodeURIComponent(message);

const menuItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Notes",
        href: "/notes",
    },
    {
        name: "Requests",
        href: "/requests",
    },
    {
        name: "LeaderBoard",
        href: "/leaderboard",
    },
    {
        name: "NotesByTeachers",
        href: "/notesByTeachers",
    },
    {
        name: "Reviews",
        href: "/reviews",
    },
    {
        name: "Whatsapp Us",
        href: `${whatsappUrl}`,
    },
];

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        dispatch(logout());
        await authservice.logoutAccount();
        navigate("/auth");
    };

    return (
        <nav className="sticky top-0">
        <div className="grid-flow-col px-[4rem] py-[1rem] grid-cols-2 items-center font-poppins hidden lg:grid shadow-lg bg-white">
            <Link to={"/"} className="text-[#fd366e] hover:text-black ease-in-out">
            <div className="font-bold text-3xl">ShareSphere</div>
            </Link>
            <div className="">
            {" "}
            <Menubar>
                <MenubarMenu>
                <Link to={"/"}>
                    <MenubarTrigger>Home</MenubarTrigger>
                </Link>
                </MenubarMenu>

                <MenubarMenu>
                <Link to={"/notes"}>
                    <MenubarTrigger>Notes</MenubarTrigger>
                </Link>
                </MenubarMenu>

                <MenubarMenu>
                <Link to={"/requests"}>
                    <MenubarTrigger>Requests</MenubarTrigger>
                </Link>
                </MenubarMenu>
                
                <MenubarMenu>
                <Link to={"/leaderboard"}>
                    <MenubarTrigger>LeaderBoard</MenubarTrigger>
                </Link>
                </MenubarMenu>
                
                <MenubarMenu>
                <Link to={"/notesByTeachers"}>
                    <MenubarTrigger>NotesByTeachers</MenubarTrigger>
                </Link>
                </MenubarMenu>

                <MenubarMenu>
                <MenubarTrigger>Review</MenubarTrigger>
                <MenubarContent className="font-poppins">
                    <Link to={"/reviews"}>
                    <MenubarItem>Reviews</MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <Link to={whatsappUrl}>
                    <MenubarItem>Whatsapp Us</MenubarItem>
                    </Link>
                </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                <MenubarTrigger onClick={handleLogout}>LogOut</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            </div>
        </div>

        <div className="relative font-poppins w-full pt-4 bg-transparent lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
                <Link to={"/"} className="text-[#fd366e] hover:text-black">
                <h1 className="font-bold text-xl">ShareSphere</h1>
                </Link>
            </div>
            <div className="lg:hidden">
                <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isMenuOpen && (
                <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center space-x-2">
                        <Link to={"/"} onClick={toggleMenu}>
                            <h1 className="font-extrabold text-lg hover:text-black text-[#fd366e]">
                            ShareSphere
                            </h1>
                        </Link>
                        </div>
                        <div className="-mr-2">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                            <Link
                            key={item.name}
                            to={item.href}
                            onClick={toggleMenu}
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                            >
                            <span className="ml-3 text-base font-medium hover:text-[#fd366e] text-gray-900">
                                {item.name}
                            </span>
                            </Link>
                        ))}
                        </nav>
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-[#fd366e] hover:text-white"
                        onClick={() => {
                        handleLogout();
                        toggleMenu();
                        }}
                    >
                        Logout
                    </button>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
        </nav>
    );
}

export default Navbar;