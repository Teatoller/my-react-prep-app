
import { DebounceSearch } from "~/debounce/debounce";

export function meta() {
  return [
    { title: "Debounce Search" },
    { name: "description", content: "A simple search page with debounce" },
  ];
}

export default function SearchDebounceRoute() {
  return <DebounceSearch />;
}