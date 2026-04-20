import React from "react";
import { Link } from "react-router";
import { Squares2X2Icon, MagnifyingGlassIcon, FireIcon, FlagIcon } from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
    { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
    { name: "Readings", href: "/readings", icon: FireIcon },
]

export function SidebarNavigation({ children }: { children?: React.ReactNode }) {
return (
    <div className="flex min-h-screen bg-accent">
        <aside className="w-64 bg-secondary">
            <nav className="mt-10">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
        <main className="flex-1 p-10">
            {children}
        </main>
        </div>
)
}
