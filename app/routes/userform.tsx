import { UserForm } from "~/userForm/userForm";

export function meta() {
  return [
    { title: "User form" },
    { name: "description", content: "A simple user form" },
  ];
}

export default function UserFormRoute() {
  return <UserForm />;
}