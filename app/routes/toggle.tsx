import { ToggleMessage } from "~/toggle/toggle";

export function meta() {
  return [
    { title: "Password Message" },
    { name: "description", content: "A show/hide message toggle" },
  ];
}

export default function MessageToggleRoute() {
  return <ToggleMessage />;
}