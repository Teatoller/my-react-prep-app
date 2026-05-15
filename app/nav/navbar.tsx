import { NavLink } from "react-router";

export function MyAppNav() {
    const navItems = [
        { path: "/", label: "Home", end: true },
        { path: "/counter", label: "Counter", end: true },
        { path: "/todo", label: "To Do" },
        { path: "/user-form", label: "User Form" },
        { path: "/user", label: "User" },
        { path: "/search", label: "Search" },
        { path: "/debounce-search", label: "Debounce Search" },
        { path: "/toggle-message", label: "Toggle Message" },
        { path: "/toggle-pass", label: "Toggle Password" },
        { path: "/local-storage", label: "Local Storage" },
        { path: "/multistep-form", label: "Multi-step Form" },
        { path: "/ecommerce-challenge", label: "Ecommerce Challenge" }
    ];

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap gap-1 py-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => `
                                px-4 py-2 rounded-lg text-sm font-medium
                                transition-all duration-200 ease-in-out
                                transform hover:scale-105
                                ${isActive 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                            `}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}