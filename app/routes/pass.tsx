import { TogglePass } from "~/toggle/pass";

export function meta() {
  return [
    { title: "Password Toggle" },
    { name: "description", content: "A show/hide password toggle" },
  ];
}

export default function PassRoute() {
  return <TogglePass />;
}