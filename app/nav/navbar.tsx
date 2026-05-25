import { NavLink } from "react-router";

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
    { path: "/ecommerce-challenge", label: "Ecommerce Challenge" },
    { path: "/tabs", label: "Tabs" },
    { path: "/modal", label: "Modal" }
];

export function MyAppNav() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="text-lg font-semibold text-white">App Navigation</h2>
                <p className="text-xs text-gray-300">Scroll to reveal all pages</p>
            </div>

            <nav className="sidebar-nav" aria-label="Primary navigation">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `sidebar-item ${isActive ? "active" : "inactive"}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
