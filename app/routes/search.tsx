import { Search } from "~/search/search";

export function meta() {
  return [
    { title: "Search" },
    { name: "description", content: "A simple search page with debounce" },
  ];
}

export default function SearchRoute() {
  return <Search />;
}