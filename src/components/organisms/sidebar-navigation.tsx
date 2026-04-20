import React from "react";
import { NavLink } from "react-router";
import {
    Squares2X2Icon,
    MagnifyingGlassIcon,
    FireIcon,
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
    { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
    { name: "Readings", href: "/readings", icon: FireIcon },
];

export function SidebarNavigation({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="w-60 flex flex-col bg-sidebar border-r border-sidebar-border shrink-0">
                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
                    <span className="font-heading font-semibold text-lg text-sidebar-foreground tracking-tight">
                        MyApp
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                ].join(" ")
                            }
                        >
                            <item.icon className="h-4 w-4 shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-3 py-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
                            U
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">User</p>
                            <p className="text-xs text-sidebar-foreground/50 truncate">user@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
