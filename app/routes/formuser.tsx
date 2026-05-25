import { User } from "~/userForm/formuser";

export function meta() {
  return [
    { title: "User form" },
    { name: "description", content: "A simple user form" },
  ];
}

export default function UserRoute() {
  return <User />;
}