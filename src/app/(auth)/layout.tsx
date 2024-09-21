"use client";

import React, {useState} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useClerk, useUser} from "@clerk/nextjs";
import {
    LogOutIcon,
    MenuIcon,
    LayoutDashboardIcon,
    Share2Icon,
    UploadIcon,
    ImageIcon,
    LucideLogIn,
    BadgePlus, CircleFadingPlus, Home
} from "lucide-react";

const sideBarItems = [
    {
        href: "/home",
        icon: Home,
        label: "Home"
    },
    {
        href: "/sign-in",
        icon: LucideLogIn,
        label: "Sign In"
    },
    {
        href: "/sign-up",
        icon: CircleFadingPlus,
        label: "Sign Up"
    },

]

export default function AppLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const {signOut} = useClerk();
    const {user} = useUser();

    const handleLogoClick = () => {
        router.push("/")
    }

    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <div className={"drawer lg:drawer-open"}>
            <input
                id={"sidebar-drawer"}
                type={"checkbox"}
                className={"drawer-toggle"}
                checked={sideBarOpen}
                onChange={() => setSideBarOpen(!sideBarOpen)}
            />
            <div className={"drawer-content flex flex-col"}>
                {/*    Navbar  */}
                {/*    page Content    */}
                <main className={"flex-grow"}>
                    <div className={"max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8"}>
                        {children}
                    </div>
                </main>
            </div>
            <div className={"drawer-side"}>
                <label htmlFor="sidebar-drawer" className={"drawer-overlay"}></label>
                <aside className={"bg-base-200 w-64 h-full flex flex-col"}>
                    <div className={"flex items-center justify-center py-4"}>
                        <ImageIcon className={"w-10 h-10 text-primary"}/>
                    </div>
                    <ul className={"menu p-4 w-full text-base-content flex-grow"}>
                        {sideBarItems.map((item) => (
                            <li key={item.href} className={"mb-2"}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${pathname === item.href ? `bg-primary text-white` : `hover:bg-base-300`}`}
                                    onClick={() => setSideBarOpen(false)}
                                >
                                    <item.icon className={"w-6 h-6"}/>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user && (
                        <div className={"px-4"}>
                            <button
                                onClick={handleSignOut}
                                className={"btn btn-outline btn-error w-full"}
                            >
                                <LogOutIcon className={"mr-2 h-5 w-5"}/>
                                Sign Out
                            </button>
                        </div>

                    )}
                </aside>
            </div>
        </div>
    )

}