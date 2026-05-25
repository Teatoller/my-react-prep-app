import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("counter", "routes/counter.tsx"),
    route("todo", "routes/todo.tsx"),
    route("search", "routes/search.tsx"),
    route("debounce-search", "routes/debounce.tsx"),
    route("toggle-message", "routes/toggle.tsx"),
    route("toggle-pass", "routes/pass.tsx"),
    route("user-form", "routes/userForm.tsx"),
    route("user", "routes/formuser.tsx"),
    route("local-storage", "routes/storage.tsx"),
    route("filterable-product-list", "routes/filterableproductlist.tsx"),
    route("multistep-form", "routes/multistepform.tsx"),
    route("ecommerce-challenge", "routes/shoppingfiltercart.tsx"),
    route("tabs", "routes/tabs.tsx"),
    route("modal", "routes/modal.tsx"),
    route("simple-form", "routes/simpleform.tsx")
] satisfies RouteConfig;
